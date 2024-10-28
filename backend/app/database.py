from sqlmodel import SQLModel, Session, create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# Use synchronous SQLite URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ai_wealth_builder.db")

# Create synchronous engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Make init_db synchronous since we're using synchronous SQLite
def init_db():
    SQLModel.metadata.create_all(engine)
    return True  # Return something to indicate success

# Session dependency
def get_session():
    with Session(engine) as session:
        yield session
