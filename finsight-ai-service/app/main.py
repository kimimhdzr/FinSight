from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import strategy_routes

app = FastAPI(title="FinSight AI Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(strategy_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to FinSight AI Service"}