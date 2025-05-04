from fastapi import FastAPI
from iteratum_ia.routers import signal

app = FastAPI(
    title="Iteratum IA",
    description="Signal-powered automation bridge for ClickUp",
    version="1.0.0"
)

# Register Signal endpoint
app.include_router(signal.router)
