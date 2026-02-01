from typing import Any, Dict, List, Tuple
from .models import Requirement, Option

def parse_problem(problem: Dict[str, Any]) -> Tuple[Dict[str, Requirement], Dict[str, List[Option]], Tuple[float, float], Dict[str, Any], Dict[str, Any]]:
    # requirements
    req_map: Dict[str, Requirement] = {}
    for r in problem.get("requirements", []):
        req_map[r["req_id"]] = Requirement(
            req_id=r["req_id"],
            material_nombre=r.get("material_nombre", ""),
            categoria=r.get("categoria", ""),
            unidad=r.get("unidad", ""),
            cantidad=float(r.get("cantidad", 0.0)),
        )

    # optionsByRequirement
    options_map: Dict[str, List[Option]] = {}
    for blk in problem.get("optionsByRequirement", []):
        req_id = blk["req_id"]
        opts: List[Option] = []
        for o in blk.get("options", []):
            supplier = o.get("supplier", {}) or {}
            delivery = supplier.get("delivery", {}) or {}
            offer = o.get("offer", {}) or {}

            opts.append(
                Option(
                    option_id=o.get("option_id", ""),
                    id_material=o.get("id_material", ""),
                    provedoor_id=o.get("provedoor_id", ""),
                    nombre_provedor=o.get("nombre_provedor", ""),
                    sup_lat=float(supplier.get("latitud", 0.0)),
                    sup_lng=float(supplier.get("longitud", 0.0)),
                    delivery_min=int(delivery.get("minDays", 0) or 0),
                    delivery_max=int(delivery.get("maxDays", 0) or 0),
                    rating=float(supplier.get("rating", 0.0) or 0.0),
                    unidad=offer.get("unidad", ""),
                    costo_unitario_mxn=float(offer.get("costo_unitario_mxn", 0.0)),
                    factor_emision=float(offer.get("factor_emision_kgco2e_por_unidad", 0.0)),
                    co2_verified=bool(offer.get("co2_verified", False)),
                    variant=offer.get("variant"),
                )
            )
        options_map[req_id] = opts

    site = problem.get("site", {}) or {}
    site_lat = float(site.get("latitud", 0.0))
    site_lng = float(site.get("longitud", 0.0))

    constraints = problem.get("constraints", {}) or {}
    nsga2 = problem.get("nsga2", {}) or {}

    return req_map, options_map, (site_lat, site_lng), constraints, nsga2


def build_ordered(req_map: Dict[str, Requirement], options_map: Dict[str, List[Option]]):
    reqs: List[Requirement] = []
    opts_list: List[List[Option]] = []

    for req_id in sorted(req_map.keys()):
        if req_id in options_map and len(options_map[req_id]) > 0:
            reqs.append(req_map[req_id])
            opts_list.append(options_map[req_id])

    if not reqs:
        raise ValueError("No requirements with options. Add optionsByRequirement with options.")

    missing = [rid for rid in sorted(req_map.keys()) if rid not in options_map or len(options_map[rid]) == 0]
    return reqs, opts_list, missing
