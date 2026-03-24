import pytest


async def test_health_returns_200(client):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "version" in data
    assert "uptime_seconds" in data
    assert "timestamp" in data
    assert data["status"] == "healthy"


async def test_health_has_version(client):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["version"] == "1.0.0"
