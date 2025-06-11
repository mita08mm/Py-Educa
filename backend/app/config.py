import os
from dotenv import load_dotenv

load_dotenv()

# app/config.py

class Config:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///:memory:")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JUDGE0_API_URL = os.getenv("JUDGE0_API_URL", "https://judge0-ce.p.rapidapi.com")
    JUDGE0_API_KEY = os.getenv("JUDGE0_API_KEY", "1d5f9bd543mshe2cf6c778f74c62p1489bejsn7cc0ed490f48")
    JUDGE0_HOST = os.getenv("JUDGE0_HOST", "judge0-ce.p.rapidapi.com")

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite:///:memory:')