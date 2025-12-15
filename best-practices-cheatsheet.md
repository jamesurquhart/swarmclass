# Multi-Agent Best Practices & Safety

**Cheat Sheet — Developing with AI Agent Swarms**

---

## Cost Awareness

### Cost Multipliers by Pattern

| Pattern | Typical Multiplier | Notes |
|---------|-------------------|-------|
| Pipeline | 2-5x single agent | Depends on stages |
| Hierarchical | 3-10x | Coordinator + workers |
| Committee | Nx | N = member count |
| Debate | 2-4x per round | Compounds with rounds |
| Swarm | 5-50x | Highly variable |

### Cost Controls

```
--max-agents 4          # Limit agent count
--agent-timeout 300     # Timeout per agent (seconds)
--task-timeout 1800     # Timeout per task (seconds)
```

- Monitor token usage in real-time
- Kill idle agents
- Start small, scale up only when needed
- Set maximum total token budgets

---

## Safety Rails

### For All Patterns

- [ ] Human approval for destructive actions
- [ ] Sandbox file system access when possible
- [ ] No production credentials in agent contexts
- [ ] Log all significant actions
- [ ] Set explicit timeout limits
- [ ] Define clear success/failure criteria

### For Swarms Specifically

- [ ] Circuit breakers (max iterations, max tokens)
- [ ] Memory size limits
- [ ] Conflict detection for parallel writes
- [ ] Regular state snapshots
- [ ] Runaway detection (agent count growing without progress)

---

## Monitoring Essentials

### What to Watch

| Metric | Why | Warning Sign |
|--------|-----|--------------|
| Agent count | Runaway spawning | Growing without progress |
| Memory growth | Context pollution | Unbounded increase |
| Token usage | Cost control | Exceeding budget |
| Idle time | Stuck agents | No activity > 60s |
| Error rate | System health | Increasing errors |

### Monitoring Commands (claude-flow)

```bash
# Watch agent status
npx claude-flow@alpha swarm status --watch

# Check memory growth
npx claude-flow@alpha memory stats

# Query recent activity
npx claude-flow@alpha memory query --recent --limit 20
```

---

## Common Failure Modes

| Failure | Symptoms | Prevention |
|---------|----------|------------|
| **Infinite loops** | Agent count grows, no progress | Max iterations, timeouts |
| **Context pollution** | Agents confused, wrong outputs | Clear handoff formats |
| **Coordinator bottleneck** | Workers idle, waiting | Increase parallelism or decompose |
| **Duplicate work** | Same output multiple times | Memory check before starting |
| **Conflicting decisions** | Inconsistent outputs | Conflict detection, arbitration |

---

## Debugging Multi-Agent Systems

### Step-by-Step Approach

1. **Test each agent in isolation first**
   - Verify individual agent behavior before combining

2. **Add agents incrementally**
   - Don't debug 5 agents at once; add one at a time

3. **Watch memory/handoffs between agents**
   - Most bugs occur at boundaries

4. **Log everything**
   - Every memory write, every decision

5. **Use deterministic inputs for reproduction**
   - Random inputs make debugging impossible

### When Something Goes Wrong

```
1. Check agent logs for errors
2. Review memory trail for unexpected patterns
3. Isolate the failing agent
4. Test with simplified input
5. Add logging at decision points
6. Replay from saved state
```

---

## Production Readiness Checklist

### Before Deploying

- [ ] All agents tested in isolation
- [ ] Integration tests for handoffs
- [ ] Cost limits configured
- [ ] Timeout limits configured
- [ ] Monitoring and alerting in place
- [ ] Fallback behavior defined
- [ ] Human escalation path clear
- [ ] Audit logging enabled

### Runtime Safeguards

- [ ] Circuit breakers active
- [ ] Token budget enforced
- [ ] Agent count limits enforced
- [ ] Memory cleanup scheduled
- [ ] Health checks running
- [ ] Alert thresholds set

---

## Quick Reference: When Things Go Wrong

| Problem | First Check | Quick Fix |
|---------|-------------|-----------|
| Agents stuck | Timeout settings | Kill and restart |
| Costs spiking | Agent count | Reduce max-agents |
| Wrong outputs | Handoff format | Add structure to prompts |
| Slow execution | Bottlenecks | Increase parallelism |
| Inconsistent results | Race conditions | Add memory locks |

---

## Key Principle

> "The more emergence you allow, the more guardrails you need."

**Structured patterns** (Pipeline, Hierarchical): Lighter guardrails, predictable behavior

**Emergent patterns** (Swarm): Heavy guardrails, expect the unexpected

---

**Resources**
- Claude Code: docs.anthropic.com/claude-code
- claude-flow: github.com/ruvnet/claude-flow/wiki
- MCP: modelcontextprotocol.io
