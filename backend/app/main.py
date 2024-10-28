from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from .database import get_session, init_db
from .models import UserCreate, UserRead, PortfolioCreate, Token, User
from .auth import get_current_user, create_access_token, get_password_hash, verify_password
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Wealth Builder API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Be specific about origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from .routers import auth, portfolio
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(portfolio.router, prefix="/api", tags=["portfolio"])

@app.on_event("startup")
def startup_event():
    init_db()  # Now synchronous

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Add this route
@app.get("/api/users", tags=["users"])
def list_users(session: Session = Depends(get_session)):
    statement = select(User)
    users = session.exec(statement).all()
    return [
        {
            "id": user.id,
            "email": user.email,
            "risk_tolerance": user.risk_tolerance,
            "created_at": user.created_at
        }
        for user in users
    ]

# Continue with other routes...
