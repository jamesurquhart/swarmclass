# Multi-Agent AI Demonstrations: Overview

This document provides three progressive demonstrations of multi-agent AI systems, designed to accompany the "Multi-Agent AI: Architectures for Collaborative Intelligence" presentation. Each demonstration increases in complexity while remaining achievable within a workshop setting.

---

## Demo Overview

| Demo | Architecture | Tools | Time Estimate | Difficulty |
|------|--------------|-------|---------------|------------|
| 1: Research & Write | Sequential Pipeline | Claude Code + Subagents | 15-20 min | Beginner |
| 2: Code Review Pipeline | Hierarchical + Debate | Claude Code + Subagents | 15-20 min | Intermediate |
| 3: Self-Organizing Swarm | Collaborative Network | Claude Flow | 10 min (pre-recorded) | Intermediate |

---

## Demo Summaries

### Demo 1: Research & Write Pipeline
**File:** [demo-1-research-write.md](demo-1-research-write.md)

A two-agent sequential pipeline where a Researcher agent gathers information and a Writer agent synthesizes it into a document. This demo introduces the fundamentals of subagent creation, context isolation, and file-based handoffs between agents.

**Key concepts:** Sequential pipeline architecture, task specialization, tool restrictions, explicit handoff via files.

### Demo 2: Multi-Agent Code Review System
**File:** [demo-2-code-review.md](demo-2-code-review.md)

A code review system with three specialized reviewer agents (Security, Performance, Maintainability) that run in parallel, coordinated by a synthesis prompt that surfaces agreements and disagreements. Demonstrates hierarchical coordination with committee-style parallel execution and debate elements.

**Key concepts:** Hierarchical pattern, committee pattern (parallel execution), debate pattern (conflict surfacing), specialized reviewers.

### Demo 3: Self-Organizing Swarm
**File:** [demo-3-swarm.md](demo-3-swarm.md)

A pre-recorded demonstration of a swarm building a todo app using Claude Flow. Five agents (Architect, Frontend, Backend, QA, Documenter) coordinate through shared memory without explicit orchestration. Includes recording instructions and live presentation script.

**Key concepts:** Emergent coordination, discovery vs assignment, shared memory, mesh topology.

---

## Prerequisites (All Demos)

Before starting any demonstration, ensure you have:

- **Node.js 18+** installed (`node --version`)
- **Claude Code** installed globally (`npm install -g @anthropic-ai/claude-code`)
- **Anthropic API key** set in your environment (`export ANTHROPIC_API_KEY=sk-ant-...`)
- A **Claude Pro, Max, or API subscription** for optimal performance

---

## Discussion Points

### After Demo 1 (Pipeline)
- How does context isolation help and hurt?
- What happens if the researcher misses key information?
- How would you add error correction to the pipeline?

### After Demo 2 (Code Review)
- Why run reviewers in parallel instead of sequence?
- How does the debate pattern improve output quality?
- What happens when reviewers fundamentally disagree?

### After Demo 3 (Swarm)
- How did agents coordinate without explicit instructions?
- What role does shared memory play?
- What are the risks of emergent behavior?

---

## Next Steps

After completing these demos, explore:

1. **Hybrid architectures**: Combine patterns (hierarchical swarm with debate)
2. **Custom agents**: Design agents for your specific domain
3. **Production deployment**: Add monitoring, cost controls, and safety rails
4. **MCP integrations**: Connect agents to your data sources (GitHub, Slack, databases)

### Resources

- [Claude Code Subagents Documentation](https://docs.claude.com/en/docs/claude-code/sub-agents)
- [Claude Agent SDK GitHub](https://github.com/anthropics/claude-agent-sdk-python)
- [Claude Flow Wiki](https://github.com/ruvnet/claude-flow/wiki)
- [Agentics Foundation](https://agentics.org)
- [Model Context Protocol](https://modelcontextprotocol.io)
