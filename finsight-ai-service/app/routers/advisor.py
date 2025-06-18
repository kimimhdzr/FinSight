from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..services.ai_service import AIService

router = APIRouter(
    prefix="/api/investment-advisor",
    tags=["investment-advisor"],
)

# Initialize the AI service
# You might want to move this initialization to a central place or use dependency injection
ai_service = AIService(ai_model_url="http://localhost:5000/ai")


class InvestmentCriteria(BaseModel):
    risk_tolerance: str
    growth_goals: List[str]
    min_investment: int
    max_investment: int

    class Config:
        schema_extra = {
            "example": {
                "risk_tolerance": "moderate",
                "growth_goals": ["low-mid-income", "retirement"],
                "min_investment": 1000,
                "max_investment": 5000
            }
        }


class ChatMessage(BaseModel):
    message: str
    context: Optional[dict] = None


@router.post("/generate-strategy")
async def get_investment_strategy(criteria: InvestmentCriteria):
    try:
        strategy = ai_service.generate_investment_strategy(
            risk_tolerance=criteria.risk_tolerance,
            growth_goals=criteria.growth_goals,
            min_investment=criteria.min_investment,
            max_investment=criteria.max_investment
        )
        return strategy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat")
async def process_chat(chat_input: ChatMessage):
    try:
        response = ai_service.chat_response(
            message=chat_input.message,
            context=chat_input.context
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "healthy"}