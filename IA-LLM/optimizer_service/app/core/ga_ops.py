import random
from typing import List, Tuple
from .models import Individual, Option
from .utils import hamming

def random_individual(options: List[List[Option]]) -> Individual:
    genes = [random.randrange(len(opts)) for opts in options]
    return Individual(genes=genes)

def tournament_select(pop: List[Individual], k: int = 2) -> Individual:
    cand = random.sample(pop, k)
    cand.sort(key=lambda x: x.fitness)
    return cand[0]

def uniform_crossover(a: Individual, b: Individual, swap_p: float = 0.5) -> Tuple[Individual, Individual]:
    g1 = a.genes[:]
    g2 = b.genes[:]
    for i in range(len(g1)):
        if random.random() < swap_p:
            g1[i], g2[i] = g2[i], g1[i]
    return Individual(g1), Individual(g2)

def mutate(ind: Individual, options: List[List[Option]], pm: float = 0.08) -> Individual:
    g = ind.genes[:]
    for i in range(len(g)):
        if random.random() < pm:
            # mutation "real": ensure different value when possible
            if len(options[i]) > 1:
                old = g[i]
                choices = [j for j in range(len(options[i])) if j != old]
                g[i] = random.choice(choices)
            else:
                g[i] = 0
    return Individual(g)

def dedupe(pop: List[Individual]) -> List[Individual]:
    seen = set()
    out = []
    for ind in pop:
        sig = tuple(ind.genes)
        if sig not in seen:
            seen.add(sig)
            out.append(ind)
    return out

def pick_top3_diverse(pop_sorted: List[Individual]) -> List[Individual]:
    if not pop_sorted:
        return []
    picks = [pop_sorted[0]]

    for ind in pop_sorted[1:]:
        if len(picks) == 3:
            break
        if all(hamming(ind.genes, p.genes) >= 1 for p in picks):
            picks.append(ind)

    i = 1
    while len(picks) < 3 and i < len(pop_sorted):
        if pop_sorted[i] not in picks:
            picks.append(pop_sorted[i])
        i += 1
    return picks
