import random
from typing import Any, Dict
from .parser import parse_problem, build_ordered
from .evaluation import evaluate, get_unverified_multiplier
from .ga_ops import (
    random_individual, tournament_select, uniform_crossover, mutate, dedupe, pick_top3_diverse
)
from .models import Individual
from .utils import haversine_km

def solve_top3(problem: Dict[str, Any]) -> Dict[str, Any]:
    req_map, options_map, (site_lat, site_lng), constraints, nsga2 = parse_problem(problem)
    reqs, options, missing = build_ordered(req_map, options_map)

    unverified_mult = get_unverified_multiplier(constraints, default=1.05)

    pop_size = int(nsga2.get("population_size", 120))
    generations = int(nsga2.get("generations", 150))
    pc = float(nsga2.get("crossover_probability", 0.9))
    pm = float(nsga2.get("mutation_probability", 0.08))
    tournament_k = int(nsga2.get("tournament_k", 2)) if "tournament_k" in nsga2 else 2
    seed = int(nsga2.get("seed", 42)) if "seed" in nsga2 else 42

    random.seed(seed)

    pop = [random_individual(options) for _ in range(pop_size)]
    pop = [evaluate(ind, reqs, options, site_lat, site_lng, unverified_mult=unverified_mult) for ind in pop]

    elite_n = max(2, pop_size // 10)

    for _ in range(generations):
        pop.sort(key=lambda x: x.fitness)
        elites = pop[:elite_n]

        new_pop = elites[:]
        while len(new_pop) < pop_size:
            p1 = tournament_select(pop, k=tournament_k)
            p2 = tournament_select(pop, k=tournament_k)

            if random.random() < pc:
                c1, c2 = uniform_crossover(p1, p2)
            else:
                c1, c2 = Individual(p1.genes[:]), Individual(p2.genes[:])

            c1 = mutate(c1, options, pm=pm)
            c2 = mutate(c2, options, pm=pm)

            new_pop.append(evaluate(c1, reqs, options, site_lat, site_lng, unverified_mult=unverified_mult))
            if len(new_pop) < pop_size:
                new_pop.append(evaluate(c2, reqs, options, site_lat, site_lng, unverified_mult=unverified_mult))

        pop = new_pop

    pop = dedupe(pop)
    pop.sort(key=lambda x: x.fitness)
    top3 = pick_top3_diverse(pop)

    def decode(ind: Individual) -> Dict[str, Any]:
        selection = []
        for i, gene in enumerate(ind.genes):
            r = reqs[i]
            o = options[i][gene]
            selection.append({
                "req_id": r.req_id,
                "material_nombre": r.material_nombre,
                "cantidad": r.cantidad,
                "unidad": r.unidad,
                "picked": {
                    "option_id": o.option_id,
                    "id_material": o.id_material,
                    "provedoor_id": o.provedoor_id,
                    "nombre_provedor": o.nombre_provedor,
                    "variant": o.variant,
                    "costo_unitario_mxn": o.costo_unitario_mxn,
                    "factor_emision_kgco2e_por_unidad": o.factor_emision,
                    "co2_verified": o.co2_verified,
                    "distance_km": round(haversine_km(site_lat, site_lng, o.sup_lat, o.sup_lng), 3),
                    "delivery": {"minDays": o.delivery_min, "maxDays": o.delivery_max},
                    "rating": o.rating
                }
            })

        return {
            "genes": ind.genes,
            "fitness_lexico": {"co2": ind.fitness[0], "cost": ind.fitness[1]},
            "metrics": {
                "total_co2e_kg": ind.co2_total,
                "total_cost_mxn": ind.cost_total,
                "total_distance_km": ind.dist_total,
                "violations": ind.violations
            },
            "selection": selection
        }

    return {
        "request_id": problem.get("request_id"),
        "optimized_req_ids": [r.req_id for r in reqs],
        "missing_req_ids": missing,
        "top3": [decode(x) for x in top3]
    }
