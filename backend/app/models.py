from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List
from pydantic import EmailStr

class UserBase(SQLModel):
    email: EmailStr
    risk_tolerance: float

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    portfolios: List["Portfolio"] = Relationship(back_populates="user")
    transactions: List["Transaction"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime

class PortfolioBase(SQLModel):
    asset_type: str
    symbol: str
    quantity: float
    purchase_price: float
    purchase_date: datetime

class Portfolio(PortfolioBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="portfolios")
