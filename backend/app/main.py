from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel.ext.asyncio.session import AsyncSession
from .database import get_session, init_db
from .models import UserCreate, UserRead, PortfolioCreate, Token
from .auth import get_current_user, create_access_token, get_password_hash, verify_password
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Wealth Builder API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from .routers import auth, portfolio
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(portfolio.router, prefix="/api", tags=["portfolio"])

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Continue with other routes...
