from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# EcoWorth Models
class EcosystemValuationInput(BaseModel):
    land_area: float = Field(..., gt=0, description="Land area in hectares")
    ecosystem_type: str = Field(..., description="Type of ecosystem")
    land_use: str = Field(..., description="Current land use")
    region: str = Field(default="India", description="Geographic region")

class EcosystemService(BaseModel):
    service_name: str
    value_per_hectare_inr: float
    total_value_inr: float
    description: str

class EcosystemValuationResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    input_data: EcosystemValuationInput
    services: List[EcosystemService]
    total_annual_value_inr: float
    calculated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# EcoWorth Endpoints
def calculate_ecosystem_values(input_data: EcosystemValuationInput) -> EcosystemValuationResult:
    """
    Calculate ecosystem service values based on research-based multipliers for Indian ecosystems.
    Values are approximate and based on various ecological economics studies.
    """
    
    # Base values per hectare per year in INR (approximate, research-based)
    ecosystem_multipliers = {
        "forest": {
            "carbon_sequestration": 25000,  # Carbon storage and sequestration
            "water_purification": 15000,    # Watershed protection and water quality
            "soil_fertility": 8000,         # Soil formation and nutrient cycling
            "pollination": 5000,            # Pollination services
            "recreation": 12000             # Ecotourism and recreation
        },
        "wetland": {
            "carbon_sequestration": 35000,  # High carbon storage in wetlands
            "water_purification": 45000,    # Excellent water filtration
            "soil_fertility": 5000,         # Limited soil formation
            "pollination": 3000,            # Some pollination services
            "recreation": 8000              # Recreational and cultural value
        },
        "grassland": {
            "carbon_sequestration": 15000,  # Moderate carbon storage
            "water_purification": 8000,     # Some water regulation
            "soil_fertility": 12000,        # Good soil formation
            "pollination": 8000,            # Important pollination services
            "recreation": 5000              # Grazing and recreational value
        },
        "agricultural": {
            "carbon_sequestration": 8000,   # Lower carbon storage
            "water_purification": 3000,     # Limited water purification
            "soil_fertility": 15000,        # High soil productivity (when managed well)
            "pollination": 12000,           # Important for crop production
            "recreation": 2000              # Limited recreational value
        },
        "urban_green": {
            "carbon_sequestration": 18000,  # Urban trees store carbon
            "water_purification": 10000,    # Stormwater management
            "soil_fertility": 3000,         # Limited soil services
            "pollination": 6000,            # Urban pollination services
            "recreation": 20000             # High recreational and health value
        }
    }
    
    # Land use impact factors (multipliers)
    land_use_factors = {
        "pristine": 1.0,                   # Full ecosystem value
        "well_managed": 0.8,               # Some degradation but well maintained
        "moderately_degraded": 0.5,        # Significant degradation
        "heavily_degraded": 0.2,           # Severely compromised ecosystem
        "converted": 0.1                   # Almost no natural ecosystem services
    }
    
    ecosystem_type = input_data.ecosystem_type.lower()
    land_use = input_data.land_use.lower()
    
    if ecosystem_type not in ecosystem_multipliers:
        # Default to grassland values if unknown ecosystem
        ecosystem_type = "grassland"
    
    if land_use not in land_use_factors:
        # Default to moderately degraded if unknown land use
        land_use = "moderately_degraded"
    
    base_values = ecosystem_multipliers[ecosystem_type]
    land_use_factor = land_use_factors[land_use]
    
    services = []
    total_value = 0
    
    service_descriptions = {
        "carbon_sequestration": "Carbon storage and climate regulation services",
        "water_purification": "Water filtration, regulation, and quality improvement",
        "soil_fertility": "Soil formation, nutrient cycling, and erosion prevention",
        "pollination": "Pollination services supporting biodiversity and agriculture",
        "recreation": "Recreation, ecotourism, and cultural ecosystem services"
    }
    
    for service_name, base_value_per_hectare in base_values.items():
        adjusted_value_per_hectare = base_value_per_hectare * land_use_factor
        total_service_value = adjusted_value_per_hectare * input_data.land_area
        
        service = EcosystemService(
            service_name=service_name.replace("_", " ").title(),
            value_per_hectare_inr=round(adjusted_value_per_hectare, 2),
            total_value_inr=round(total_service_value, 2),
            description=service_descriptions[service_name]
        )
        services.append(service)
        total_value += total_service_value
    
    result = EcosystemValuationResult(
        input_data=input_data,
        services=services,
        total_annual_value_inr=round(total_value, 2)
    )
    
    return result

@api_router.post("/calculate-ecosystem-value", response_model=EcosystemValuationResult)
async def calculate_ecosystem_value(input_data: EcosystemValuationInput):
    """Calculate the economic value of ecosystem services for a given area."""
    try:
        result = calculate_ecosystem_values(input_data)
        # Store the calculation in the database for future reference
        await db.ecosystem_valuations.insert_one(result.dict())
        return result
    except Exception as e:
        logger.error(f"Error calculating ecosystem value: {str(e)}")
        raise HTTPException(status_code=500, detail="Error calculating ecosystem value")

@api_router.get("/ecosystem-types")
async def get_ecosystem_types():
    """Get available ecosystem types for the calculator."""
    return {
        "ecosystem_types": [
            {"value": "forest", "label": "Forest", "description": "Tropical, temperate, or boreal forests"},
            {"value": "wetland", "label": "Wetland", "description": "Marshes, swamps, rivers, and lakes"},
            {"value": "grassland", "label": "Grassland", "description": "Natural grasslands and savannas"},
            {"value": "agricultural", "label": "Agricultural Land", "description": "Farmland and crop areas"},
            {"value": "urban_green", "label": "Urban Green Space", "description": "Parks, gardens, and urban forests"}
        ],
        "land_use_types": [
            {"value": "pristine", "label": "Pristine/Natural", "description": "Undisturbed natural ecosystem"},
            {"value": "well_managed", "label": "Well Managed", "description": "Protected or sustainably managed"},
            {"value": "moderately_degraded", "label": "Moderately Degraded", "description": "Some human impact but recoverable"},
            {"value": "heavily_degraded", "label": "Heavily Degraded", "description": "Significant degradation requiring restoration"},
            {"value": "converted", "label": "Converted", "description": "Heavily modified or developed land"}
        ]
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
