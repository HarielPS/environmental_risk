from fastapi import APIRouter, Body
from typing import Any, Dict
from app.core.solver import solve_top3

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok", "service": "optimizer"}

@router.post("/optimize")
def optimize(problem: Dict[str, Any] = Body(...)):
    return solve_top3(problem)
