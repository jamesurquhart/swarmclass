# Section 3: Applying Multi-Agent Patterns

**Duration:** 60 minutes
**Focus:** Synthesis, decision-making, and practical guidance for choosing architectures
**Key Shift:** From "learning tools" to "making decisions"

---

## 3.1 Introduction: The Architecture Spectrum (5 min)

### Transition from Section 2
- Recap: Section 1 introduced six architectures, Section 2 went deep on structured orchestration
- Now: How do you choose? When does each pattern fit?

### The Control Spectrum
```
More Control ◄─────────────────────────────────────────► More Emergence

Sequential    Hierarchical    Dynamic      Committee    Debate    Swarm
Pipeline      (Manager)       Routing      (Parallel)   (Adversarial)  (Network)
    │              │             │             │           │          │
 Section 1     Section 2     Section 2    Section 2   Section 2   Section 3
```

### Section 3 Roadmap
- Brief look at emergent coordination (claude-flow)
- Pre-recorded demo walkthrough: what a swarm built
- Decision framework: choosing your architecture
- Best practices, safety, and cost considerations
- Open Q&A

---

## 3.2 Emergent Coordination: A Brief Look (5 min)

### What is Emergent Coordination?
```
Structured (Section 2)          Emergent (This Section)
────────────────────            ─────────────────────────
Predefined workflow             No predefined workflow
Coordinator assigns work        Agents discover work
Explicit handoffs               Shared memory discovery
Predictable behavior            Adaptive behavior
```

### The Agentics Foundation and claude-flow
- **Agentics Foundation**: Community-driven, founded by Reuven Cohen
- **claude-flow**: Open source swarm orchestration platform
- **Key insight**: Multiple Claude Code agents coordinating via shared memory

### Distinction: Agentics Foundation vs. AAIF
| Agentics Foundation | AAIF (Linux Foundation) |
|---------------------|------------------------|
| Community project | Standards body |
| Claude-flow, tools | MCP, goose, AGENTS.md |
| Implementation focus | Protocol/standard focus |

"They're complementary—claude-flow uses MCP, which AAIF now stewards."

### How Swarms Coordinate
1. Agents spawn with specialized capabilities
2. Shared memory stores discoveries, decisions, artifacts
3. Agents query memory to find work and context
4. No central assignment—coordination emerges from local decisions
5. Results accumulate through collective effort

---

## 3.3 Demo Walkthrough: What a Swarm Built (10 min)

### The Task
"Build a simple todo list web application with HTML, CSS, and JavaScript"

### The Agents
| Agent | Role | What It Did |
|-------|------|-------------|
| Architect | System Designer | Wrote initial architecture decisions to memory |
| Frontend | UI Developer | Discovered architecture, built HTML/CSS/JS |
| Backend | Logic Developer | Discovered architecture, built app logic |
| QA | Tester | Discovered new code, wrote tests |
| Documenter | Writer | Synthesized everything into README |

### Show: The Output
Walk through the files the swarm created:
- `index.html` — Application structure
- `styles.css` — Styling
- `app.js` — Todo functionality
- `tests/` — Test files
- `README.md` — Documentation

### Show: The Memory Trail
```
[12:01:15] architect → STORED: "architecture-decision"
           Value: "Single-page app, vanilla JS, localStorage for persistence"

[12:01:47] frontend → QUERIED: "architecture"
           Found: architect's decision

[12:02:03] frontend → STORED: "component-started"
           Value: "Building header and input form"

[12:02:15] backend → QUERIED: "architecture"
           Found: architect's decision

[12:02:31] backend → STORED: "component-started"
           Value: "Building todo CRUD operations"

[12:03:45] qa → QUERIED: "components"
           Found: frontend and backend work

[12:04:02] qa → STORED: "tests-written"
           Value: "Unit tests for add/delete/toggle"
```

### The Key Insight
"Nobody assigned Frontend to build the header. It queried memory, saw the architecture, and decided that was useful work. That's emergence—coordination from local decisions, not central control."

### Contrast with Section 2
| Section 2 (Code Review) | Section 3 (Swarm) |
|------------------------|-------------------|
| Coordinator explicitly assigned reviewers | No assignment—agents claimed work |
| Predefined: Security, Performance, Maintainability | Roles discovered organically |
| Coordinator synthesized at the end | Synthesis emerged from accumulated work |
| Predictable, auditable | Adaptive, exploratory |

---

## 3.4 Choosing Your Architecture: Decision Framework (15 min)

### The Central Question
"Given a task, how do I choose which multi-agent architecture to use?"

### Decision Tree

```
                    ┌─────────────────────┐
                    │  What's the task?   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │ Well-    │    │ Multiple │    │ Ill-     │
        │ defined  │    │ perspec- │    │ defined  │
        │ stages   │    │ tives    │    │ or       │
        │          │    │ needed   │    │ explora- │
        │          │    │          │    │ tory     │
        └────┬─────┘    └────┬─────┘    └────┬─────┘
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐    ┌──────────┐    ┌─────────┐
        │Pipeline │    │Committee │    │ Swarm   │
        │   or    │    │    or    │    │         │
        │Hierarch.│    │ Debate   │    │         │
        └─────────┘    └──────────┘    └─────────┘
```

### Pattern Selection Guide

| Pattern | Best For | Avoid When |
|---------|----------|------------|
| **Sequential Pipeline** | Clear stages, transformation chains | Stages need to iterate |
| **Hierarchical** | Decomposable tasks, need oversight | Workers need to collaborate |
| **Dynamic Routing** | Heterogeneous queries, clear specialists | Query types overlap heavily |
| **Committee** | Need diverse perspectives, reduce bias | Single expert is sufficient |
| **Debate** | High-stakes decisions, need challenge | Time-critical, clear-cut |
| **Swarm** | Exploratory, ill-defined, adaptive | Need predictability, tight budget |

### Detailed Decision Criteria

**1. Problem Clarity**
| Clarity Level | Recommended Pattern |
|---------------|---------------------|
| Crystal clear workflow | Pipeline |
| Decomposable but complex | Hierarchical |
| Clear specialists needed | Dynamic Routing |
| Unclear, exploratory | Swarm |

**2. Predictability Requirements**
| Need | Pattern | Why |
|------|---------|-----|
| Audit trail required | Hierarchical, Pipeline | Central control, clear trace |
| Reproducibility critical | Pipeline, Hierarchical | Deterministic execution |
| Results may vary (acceptable) | Swarm, Debate | Exploration benefits |

**3. Time and Cost Constraints**
| Constraint | Pattern | Why |
|------------|---------|-----|
| Minimize latency | Pipeline (sequential), Routing | Single path execution |
| Minimize cost | Single agent, Pipeline | Fewer API calls |
| Maximize thoroughness | Committee, Swarm | Multiple perspectives |

**4. Quality Requirements**
| Quality Need | Pattern | Why |
|--------------|---------|-----|
| Catch all issues | Committee | Multiple reviewers |
| Challenge assumptions | Debate | Adversarial testing |
| Comprehensive coverage | Swarm | Parallel exploration |
| Speed over perfection | Pipeline, Routing | Direct execution |

### Real-World Mapping

| Task | Recommended Pattern | Why |
|------|---------------------|-----|
| Content pipeline (research → write → edit) | Sequential Pipeline | Clear stages |
| Code review | Committee + Debate | Multiple perspectives, challenge |
| Customer support routing | Dynamic Routing | Query classification |
| Feature implementation | Hierarchical | Decomposition, oversight |
| Architecture exploration | Swarm | Ill-defined, exploratory |
| Investment analysis | Debate | High stakes, challenge bias |
| Bug investigation | Swarm or Hierarchical | Unknown scope vs known decomposition |

### Hybrid Approaches

"You don't have to choose just one."

**Pattern: Hierarchical with Swarm Substeps**
```
[Coordinator]
     │
     ├── [Worker A] → runs mini-swarm for exploration
     │
     ├── [Worker B] → runs pipeline for transformation
     │
     └── [Worker C] → runs debate for decision
```

**Pattern: Pipeline with Committee Stages**
```
[Research] → [Committee Review] → [Write] → [Committee Edit] → [Publish]
```

**Pattern: Routing to Swarms**
```
[Router] → Code question → [Code Swarm]
        → Data question → [Analysis Pipeline]
        → Writing request → [Content Pipeline]
```

### The Meta-Question
"When in doubt, ask: What would happen if this went wrong?"

- High consequence → More structure (Hierarchical, Debate)
- Low consequence → More freedom (Swarm, Committee)
- Unknown scope → Start with Swarm, move to structure as clarity emerges

---

## 3.5 Best Practices and Safety (7 min)

### Cost Awareness

**Multi-Agent = More API Calls**
| Pattern | Typical Multiplier | Notes |
|---------|-------------------|-------|
| Pipeline | 2-5x single agent | Depends on stages |
| Hierarchical | 3-10x | Coordinator + workers |
| Committee | Nx (N = members) | Parallel execution |
| Debate | 2-4x per round | Can compound with rounds |
| Swarm | 5-50x | Highly variable |

**Cost Controls**
- Set agent limits: `--max-agents 4`
- Set timeouts: `--agent-timeout 300`
- Monitor token usage
- Kill idle agents
- Start small, scale up

### Safety Rails

**For All Patterns:**
- Human approval for destructive actions
- Sandbox file system access when possible
- No production credentials in agent contexts
- Log all significant actions

**For Swarms Specifically:**
- Circuit breakers (max iterations, max tokens)
- Memory size limits
- Conflict detection for parallel writes
- Regular state snapshots

### Monitoring Essentials

**What to Watch:**
| Metric | Why |
|--------|-----|
| Agent count | Runaway spawning |
| Memory growth | Context pollution |
| Token usage | Cost control |
| Idle time | Stuck agents |
| Error rate | System health |

**Debugging Multi-Agent Systems:**
1. Test each agent in isolation first
2. Add agents incrementally
3. Watch memory/handoffs between agents
4. Log everything
5. Use deterministic inputs for reproduction

### Common Failure Modes

| Failure | Symptoms | Prevention |
|---------|----------|------------|
| Infinite loops | Agent count grows, no progress | Max iterations, timeouts |
| Context pollution | Agents confused, wrong outputs | Clear handoff formats |
| Coordinator bottleneck | Workers idle, waiting | Increase parallelism or decompose |
| Duplicate work | Same output multiple times | Memory check before starting |
| Conflicting decisions | Inconsistent outputs | Conflict detection, arbitration |

---

## 3.6 Open Q&A and Optional Live Demo (13 min)

### Structured Q&A Topics

**Architecture Selection:**
- "What pattern would you use for X?"
- "How do you handle Y edge case?"

**Implementation:**
- "How do you test multi-agent systems?"
- "What's the learning curve?"

**Production Readiness:**
- "Is this ready for enterprise use?"
- "How do you handle failures in production?"

### Optional: Live Demo (if time permits)

If time and interest allow, demonstrate swarm initialization:

```bash
# Quick swarm demo
npx claude-flow@alpha init --force
npx claude-flow@alpha swarm "Summarize the key files in this directory" --claude
```

"This is live, so results may vary. That's the nature of emergent systems."

### Audience Questions
- Address Q&A widget questions accumulated during Section 3
- Prioritize questions about practical application

---

## 3.7 Course Wrap-Up (5 min)

### Full Course Recap

**Section 1: Foundations**
- Multi-agent AI definition and why it matters
- Six architectural patterns introduced
- Handoff patterns: file, return value, shared memory, message passing
- Demo: Sequential Pipeline (research → write)

**Section 2: Structured Orchestration**
- Anthropic's agent support in depth
- Deep dives: Hierarchical, Debate, Committee, Dynamic Routing
- Tool access patterns and restrictions
- Demo: Multi-agent Code Review

**Section 3: Synthesis and Decision-Making**
- Emergent coordination with claude-flow
- Decision framework for choosing architectures
- Best practices, cost awareness, safety
- When to use (and not use) each pattern

### The Key Takeaway

```
"The frameworks will evolve. The patterns endure."
```

Understanding when to use hierarchical versus swarm, when to predefine versus let emerge—that's the skill that transfers across tools and platforms.

### Where to Go From Here

**Immediate Next Steps:**
1. Run the demos in your own environment
2. Pick ONE pattern and apply it to a real task
3. Start simple, add complexity only when needed

**Resources:**
- Claude Code Documentation: docs.anthropic.com/claude-code
- claude-flow Wiki: github.com/ruvnet/claude-flow/wiki
- Model Context Protocol: modelcontextprotocol.io
- Agentics Foundation: agentics.org

**Community:**
- Agentics Foundation chapters (London, NA, EU)
- Claude Developers Discord
- GitHub discussions

### Final Thought

"If agentic AI is changing how we build software, agent swarms are reimagining it. But they're not magic—they're tools with trade-offs.

Structured orchestration when you need predictability. Emergent coordination when you need adaptability. Often, you'll use both.

Choose based on the problem, not the hype."

### Questions?
- Final Q&A
- Course evaluation reminder
- Thank you

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Start Section 3
- 0:05 - Finish intro, begin emergent coordination overview
- 0:10 - Finish overview, begin demo walkthrough
- 0:20 - Finish demo walkthrough, begin decision framework
- 0:35 - Finish decision framework, begin best practices
- 0:42 - Finish best practices, begin Q&A
- 0:55 - Begin wrap-up
- 1:00 - Course complete

### Materials Checklist
- [ ] Pre-recorded demo output files (index.html, styles.css, app.js, tests/, README.md)
- [ ] Pre-recorded memory trail log
- [ ] Decision framework handout (optional)
- [ ] Backup slides for all content
- [ ] Q&A questions prepared for slow periods

### Pre-Recorded Demo Preparation
See `context/demo-plan.md` for full instructions on recording Demo 3.

Key points:
- Record the demo before the live session
- Capture both terminal output and resulting files
- Save memory trail showing agent coordination
- Have backup screenshots if video fails

### Why Pre-Recorded?
1. Alpha software is unpredictable
2. Hour 3 students are tired—show, don't wait
3. Removes time pressure
4. Can cherry-pick a clean run
5. Still option for live demo if time permits

### Common Questions

**"Why not just show this live?"**
> Alpha software, unpredictable results, and student attention in hour 3. The walkthrough teaches the same concepts with less risk. Live demo available if time permits.

**"Is claude-flow production-ready?"**
> It's alpha software used in real projects. Production use requires monitoring, cost controls, and understanding the risks. Start with non-critical workflows.

**"Can I use these patterns with other frameworks?"**
> Yes. The patterns (Hierarchical, Debate, Committee, Swarm) transfer to AutoGen, CrewAI, LangGraph, etc. The implementation differs, but the concepts are universal.

**"What's the cost of running a swarm?"**
> Highly variable. A 5-agent swarm might use 10-50x the tokens of a single agent. Always monitor and set limits.

**"Which pattern should I start with?"**
> Hierarchical. It's the most intuitive (manager + workers) and teaches coordination fundamentals. Then try Committee for parallel perspectives.

### If Time Runs Short
- Cut Q&A time first (students can ask after)
- Abbreviate best practices to key points
- Skip optional live demo
- Keep wrap-up—closure matters

### If Time Runs Long
- Extend Q&A section
- Try live demo
- Deeper discussion on hybrid approaches
