from fastapi import APIRouter
from datetime import datetime, timezone
import time

router = APIRouter()
SERVER_START_TIME = time.time()


@router.get("")
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "uptime_seconds": round(time.time() - SERVER_START_TIME, 2),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
