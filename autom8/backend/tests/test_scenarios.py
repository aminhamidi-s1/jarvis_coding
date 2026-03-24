import pytest


async def test_scenarios_returns_empty_list(client):
    response = await client.get("/api/v1/scenarios")
    assert response.status_code == 200
    assert response.json() == []
