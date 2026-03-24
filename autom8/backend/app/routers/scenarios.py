from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_scenarios():
    """List available scenarios. Returns [] until Phase 2 data layer is implemented."""
    return []
