from pydantic import BaseModel
from typing import List, Optional

class InvestmentStrategy(BaseModel):
    name: str
    target_return: str
    risk_level: str
    time_horizon: str
    allocation: str

class InvestmentAdvisorRequest(BaseModel):
    risk_tolerance: str
    growth_options: List[str]
    min_investment: Optional[float] = 0
    max_investment: Optional[float] = None

class InvestmentAdvisorResponse(BaseModel):
    strategies: List[InvestmentStrategy]