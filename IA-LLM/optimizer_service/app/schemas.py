from typing import Any, Dict, List, Optional
from pydantic import BaseModel

class OptimizeRequest(BaseModel):
    # aceptamos el payload completo sin forzar estructura (rápido para hackathon)
    payload: Dict[str, Any]

class OptimizeResponse(BaseModel):
    request_id: Optional[str] = None
    optimized_req_ids: List[str]
    missing_req_ids: List[str]
    top3: List[Dict[str, Any]]
