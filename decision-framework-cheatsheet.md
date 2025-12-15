# Multi-Agent Architecture Decision Framework

**Cheat Sheet — Developing with AI Agent Swarms**

---

## The Control Spectrum

```
More Control ◄─────────────────────────────────────────► More Emergence

Sequential    Hierarchical    Dynamic      Committee    Debate    Swarm
Pipeline      (Manager)       Routing      (Parallel)   (Adversarial)  (Network)
```

**Left side**: Predictable, auditable, rigid
**Right side**: Adaptive, exploratory, variable results

---

## Pattern Selection Guide

| Pattern | Best For | Avoid When |
|---------|----------|------------|
| **Sequential Pipeline** | Clear stages, transformation chains | Stages need to iterate |
| **Hierarchical** | Decomposable tasks, need oversight | Workers need to collaborate |
| **Dynamic Routing** | Heterogeneous queries, clear specialists | Query types overlap heavily |
| **Committee** | Diverse perspectives, reduce bias | Single expert is sufficient |
| **Debate** | High-stakes decisions, need challenge | Time-critical, clear-cut |
| **Swarm** | Exploratory, ill-defined, adaptive | Need predictability, tight budget |

---

## Decision Criteria

### 1. Problem Clarity
| Clarity Level | Pattern |
|---------------|---------|
| Crystal clear workflow | Pipeline |
| Decomposable but complex | Hierarchical |
| Clear specialists needed | Dynamic Routing |
| Unclear, exploratory | Swarm |

### 2. Predictability Requirements
| Need | Pattern |
|------|---------|
| Audit trail required | Hierarchical, Pipeline |
| Reproducibility critical | Pipeline, Hierarchical |
| Results may vary (acceptable) | Swarm, Debate |

### 3. Time and Cost
| Constraint | Pattern |
|------------|---------|
| Minimize latency | Pipeline, Routing |
| Minimize cost | Single agent, Pipeline |
| Maximize thoroughness | Committee, Swarm |

### 4. Quality Requirements
| Need | Pattern |
|------|---------|
| Catch all issues | Committee |
| Challenge assumptions | Debate |
| Comprehensive coverage | Swarm |
| Speed over perfection | Pipeline, Routing |

---

## Real-World Task Mapping

| Task | Recommended Pattern | Why |
|------|---------------------|-----|
| Content pipeline (research → write → edit) | Sequential Pipeline | Clear stages |
| Code review | Committee + Debate | Multiple perspectives, challenge |
| Customer support routing | Dynamic Routing | Query classification |
| Feature implementation | Hierarchical | Decomposition, oversight |
| Architecture exploration | Swarm | Ill-defined, exploratory |
| Investment analysis | Debate | High stakes, challenge bias |
| Bug investigation | Swarm or Hierarchical | Depends on scope clarity |

---

## Hybrid Approaches

**Hierarchical + Swarm**: Coordinator spawns mini-swarms for exploratory substeps

**Pipeline + Committee**: Add committee review stages between pipeline steps

**Routing + Mixed**: Route different query types to different architectures

---

## The Meta-Question

> "When in doubt, ask: What would happen if this went wrong?"

| Consequence | Recommendation |
|-------------|----------------|
| High | More structure (Hierarchical, Debate) |
| Low | More freedom (Swarm, Committee) |
| Unknown scope | Start Swarm → add structure as clarity emerges |

---

## Cost Multipliers

| Pattern | Typical Multiplier |
|---------|-------------------|
| Pipeline | 2-5x single agent |
| Hierarchical | 3-10x |
| Committee | Nx (N = members) |
| Debate | 2-4x per round |
| Swarm | 5-50x |

---

## Key Takeaway

> "The frameworks will evolve. The patterns endure."

Choose based on the problem, not the hype.

---

**Resources**
- Claude Code: docs.anthropic.com/claude-code
- claude-flow: github.com/ruvnet/claude-flow/wiki
- MCP: modelcontextprotocol.io
- Agentics Foundation: agentics.org
