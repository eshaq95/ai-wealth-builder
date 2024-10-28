from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from ..database import get_session
from ..models import User, Portfolio, PortfolioCreate
from ..services.auth import get_current_user
from typing import List

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.get("/", response_model=dict)
async def get_portfolio(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    query = select(Portfolio).where(Portfolio.user_id == current_user.id)
    result = await session.execute(query)
    portfolio_items = result.scalars().all()
    
    total_value = sum(item.quantity * item.purchase_price for item in portfolio_items)
    assets = [
        {"name": item.asset_type, "value": item.quantity * item.purchase_price}
        for item in portfolio_items
    ]
    
    return {
        "total_value": total_value,
        "assets": assets
    }

@router.post("/", response_model=Portfolio)
async def create_portfolio_item(
    item: PortfolioCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    db_item = Portfolio(**item.dict(), user_id=current_user.id)
    session.add(db_item)
    await session.commit()
    await session.refresh(db_item)
    return db_item
