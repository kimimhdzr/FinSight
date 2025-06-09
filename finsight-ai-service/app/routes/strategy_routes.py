from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from app.services.strategy_service import StrategyService
from app.auth.auth import get_current_user

router = APIRouter(prefix="/strategies", tags=["strategies"])
strategy_service = StrategyService()

@router.post("/")
async def save_strategy(
    strategy: Dict[str, Any],
    user: Dict = Depends(get_current_user)
):
    """Save an investment strategy for the current user"""
    try:
        user_id = user["id"]
        saved_strategy = strategy_service.save_strategy(user_id, strategy)
        return {
            "success": True,
            "strategy": saved_strategy
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save strategy: {str(e)}"
        )

@router.get("/")
async def get_strategies(user: Dict = Depends(get_current_user)):
    """Get all strategies for the current user"""
    try:
        user_id = user["id"]
        strategies = strategy_service.get_user_strategies(user_id)
        return {
            "success": True,
            "count": len(strategies),
            "strategies": strategies
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve strategies: {str(e)}"
        )

@router.delete("/{strategy_id}")
async def delete_strategy(
    strategy_id: str,
    user: Dict = Depends(get_current_user)
):
    """Delete a specific strategy"""
    try:
        user_id = user["id"]
        success = strategy_service.delete_strategy(user_id, strategy_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Strategy not found or you don't have permission to delete it"
            )
            
        return {
            "success": True,
            "message": "Strategy deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete strategy: {str(e)}"
        )