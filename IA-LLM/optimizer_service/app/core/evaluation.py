from typing import Any, Dict, List
from .models import Individual, Requirement, Option
from .utils import haversine_km

def get_unverified_multiplier(constraints: Dict[str, Any], default: float = 1.05) -> float:
    soft = constraints.get("soft", []) or []
    for s in soft:
        if s.get("name") == "prefer_verified_co2":
            pen = s.get("penalty", {}) or {}
            return float(pen.get("multiplier_on_total_co2", default))
    return default


def evaluate(
    ind: Individual,
    reqs: List[Requirement],
    options: List[List[Option]],
    site_lat: float,
    site_lng: float,
    unverified_mult: float = 1.05
) -> Individual:
    co2_total = 0.0
    cost_total = 0.0
    dist_total = 0.0
    violations = 0

    for i, gene in enumerate(ind.genes):
        r = reqs[i]
        opts = options[i]

        if gene < 0 or gene >= len(opts):
            violations += 1
            continue

        o = opts[gene]

        # Hard constraint: unit match
        if o.unidad != r.unidad:
            violations += 1

        co2 = r.cantidad * o.factor_emision
        if not o.co2_verified:
            co2 *= unverified_mult

        cost = r.cantidad * o.costo_unitario_mxn
        dist = haversine_km(site_lat, site_lng, o.sup_lat, o.sup_lng)

        co2_total += co2
        cost_total += cost
        dist_total += dist

    hard_penalty = 1e12 * violations
    ind.co2_total = co2_total
    ind.cost_total = cost_total
    ind.dist_total = dist_total
    ind.violations = violations
    ind.fitness = (co2_total + hard_penalty, cost_total + hard_penalty)
    return ind
