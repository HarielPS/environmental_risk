from dataclasses import dataclass
from typing import List, Tuple, Optional

@dataclass
class Requirement:
    req_id: str
    material_nombre: str
    categoria: str
    unidad: str
    cantidad: float

@dataclass
class Option:
    option_id: str
    id_material: str
    provedoor_id: str
    nombre_provedor: str

    sup_lat: float
    sup_lng: float
    delivery_min: int
    delivery_max: int
    rating: float

    unidad: str
    costo_unitario_mxn: float
    factor_emision: float
    co2_verified: bool
    variant: Optional[str] = None

@dataclass
class Individual:
    genes: List[int]
    co2_total: float = 0.0
    cost_total: float = 0.0
    dist_total: float = 0.0
    violations: int = 0
    fitness: Tuple[float, float] = (0.0, 0.0)  # lexicographic: (co2, cost)
