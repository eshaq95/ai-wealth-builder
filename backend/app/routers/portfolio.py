from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..database import get_session
from ..models import User, Portfolio, PortfolioCreate
from ..services.auth import get_current_user

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.get("/")
async def get_portfolio(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    try:
        # For now, return test data
        return {
            "total_value": 100000.0,
            "assets": [
                {"name": "Stocks", "value": 50000.0},
                {"name": "Bonds", "value": 30000.0},
                {"name": "Cash", "value": 20000.0}
            ]
        }
    except Exception as e:
        print(f"Portfolio error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch portfolio data"
        )

@router.post("/", response_model=Portfolio)
async def create_portfolio_item(
    item: PortfolioCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    try:
        db_item = Portfolio(**item.dict(), user_id=current_user.id)
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item
    except Exception as e:
        print(f"Create portfolio error: {str(e)}")
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to create portfolio item"
        )
