# Section 2: Creating Advanced Multi-Agent Systems in Claude Code

**Duration:** 60 minutes
**Focus:** Structured, orchestrated multi-agent systems using Anthropic's agent capabilities
**Key Distinction:** Explicit coordination (vs. Section 3's emergent coordination)

---

## 2.1 Introduction and Demo 1 Results (5 min)

### Transition from Section 1
- Quick recap: We covered six architectures at a high level
- We built a Sequential Pipeline with file-based handoffs
- Now: deeper implementation patterns for structured coordination

### Demo 1 Results Check
- Show completed research-notes.md and briefing.md (if not shown at end of Section 1)
- Point out: three agents worked together, explicit handoff via file
- "This was sequential. Now let's go parallel and add some conflict."

### Section 2 Roadmap
- Anthropic's agent support in depth
- Three patterns with implementation guidance: Hierarchical, Debate, Committee
- Brief coverage of Dynamic Routing
- Demo: Multi-agent code review system

---

## 2.2 Anthropic's Agent Support in Depth (10 min)

### The Task Tool: Quick Recap
- Claude Code's built-in mechanism for spawning subagents
- Each subagent runs in isolated context
- Returns results to the calling agent
- What we used in Demo 1

### Agent Definitions in `.claude/agents/`

**Structure:**
```markdown
---
name: agent-name
description: When to invoke this agent (Claude uses this to decide)
tools: Tool1, Tool2, Tool3
---

System prompt defining the agent's role, behavior, and output format.
```

**Commonly Used Agent Types:**
| Type | Purpose | Typical Tools |
|------|---------|---------------|
| Researcher | Gather information | WebSearch, WebFetch, Read, Grep, Glob |
| Writer | Produce content | Read, Write, Edit |
| Reviewer | Analyze and critique | Read, Grep, Glob |
| Planner | Decompose tasks | Read, Glob (minimal tools) |
| Executor | Take actions | Bash, Write, Edit |

**Other Agent Types** (brief mention):
- Editor, Fact-checker, Summarizer, Translator
- Domain-specific: Security Analyst, Data Analyst, Test Writer

### Tool Access Patterns and Restrictions

**Why Restrict Tools?**
- Enforces specialization (researcher can't modify, writer can't wander)
- Reduces error surface (fewer tools = fewer ways to fail)
- Enables trust boundaries (some agents shouldn't have Bash)

**Common Patterns:**
| Pattern | Tools | Use Case |
|---------|-------|----------|
| Read-Only | Read, Grep, Glob | Analysis, review |
| Read + Web | Read, Grep, Glob, WebSearch, WebFetch | Research |
| Read + Write | Read, Write, Edit | Content creation |
| Full Access | All tools | Trusted executors |
| No Bash | Everything except Bash | Sandboxed agents |

**Tool Restriction Strategy:**
- Start minimal, add tools only when needed
- Separate "thinking" agents from "acting" agents
- Consider: "What's the worst this agent could do with this tool?"

### Enterprise Data Access Options

**Tool-Based Access:**
| Method | How It Works | Use Case |
|--------|--------------|----------|
| MCP Servers | Agents connect via Model Context Protocol | Databases, Slack, GitHub, Salesforce |
| Bash + CLI | Agents run command-line tools | AWS CLI, kubectl, internal scripts |
| WebFetch | Agents call REST APIs directly | Internal services with HTTP endpoints |

**Non-Tool Methods:**
| Method | How It Works | Use Case |
|--------|--------------|----------|
| Context Injection | Data loaded into prompt before agent runs | Small datasets, config, credentials |
| File Staging | ETL prepares files agents will read | Large datasets, pre-processed data |
| RAG Retrieval | Orchestrator retrieves, passes to agent | Knowledge bases, documentation |

**Security Considerations:**
- Credential management: environment variables, secrets managers
- Network boundaries: which agents can access which systems
- Audit logging: track what data agents accessed

### Real-World Application: Content Pipeline at Scale
- Publishing companies using agent pipelines
- Research → Draft → Edit → Fact-check → Format
- Each stage has different tool access
- Handoffs via structured documents

---

## 2.3 Deep Dive: Hierarchical Pattern (8 min)

### Pattern Recap
```
        [Coordinator]
       /      |      \
[Worker A] [Worker B] [Worker C]
      \       |       /
       \      |      /
        [Coordinator]
           ↓
        [Output]
```

### Implementation Components

**1. Coordinator Agent**
- Receives high-level task
- Decomposes into subtasks
- Dispatches to appropriate workers
- Synthesizes results
- Handles conflicts/failures

**2. Worker Agents**
- Specialized for specific subtask types
- Limited tool access (only what they need)
- Structured output format (coordinator must parse)
- No direct communication with other workers

**3. Communication Flow**
- Top-down: Coordinator → Workers (task assignment)
- Bottom-up: Workers → Coordinator (results)
- No lateral: Workers don't talk to each other

### Implementation Guidance

**Coordinator Prompt Pattern:**
```
You are a [Domain] Coordinator. Your role is to:
1. Analyze the incoming task
2. Break it into subtasks for specialists
3. Delegate to: [Worker A], [Worker B], [Worker C]
4. Synthesize their outputs into a unified result
5. Resolve any conflicts between worker outputs

When delegating, be specific about what each worker should focus on.
When synthesizing, note where workers agreed and disagreed.
```

**Worker Prompt Pattern:**
```
You are a [Specialty] specialist. Your role is to:
1. Focus ONLY on [specific aspect]
2. Analyze the provided [input type]
3. Produce a [structured output format]

Do not attempt to address concerns outside your specialty.
Flag items that need attention from other specialists.
```

### Real-World Use Cases

**Software Development:**
- Tech Lead agent decomposes feature request
- Frontend, Backend, Database workers implement
- Tech Lead integrates and resolves conflicts

**Document Processing:**
- Intake Coordinator receives documents
- Classifier, Extractor, Validator workers process
- Coordinator assembles final structured data

**Customer Support:**
- Triage Coordinator receives tickets
- Billing, Technical, Account workers handle specialties
- Coordinator ensures resolution and follow-up

### When to Use Hierarchical
- Task can be cleanly decomposed
- Workers don't need to coordinate with each other
- Clear success criteria for each subtask
- Need centralized oversight/audit trail

### When NOT to Use
- Problem requires worker-to-worker collaboration
- Decomposition isn't obvious upfront
- Manager bottleneck would slow things down

---

## 2.4 Demo 2 Setup: Code Review System - Part 1 (8 min)

### What We're Building
A multi-agent code review system that demonstrates:
- Hierarchical pattern (Coordinator + Workers)
- Parallel execution (all reviewers run simultaneously)
- Debate elements (disagreement surfacing)

### Architecture
```
              [Coordinator]
             /      |      \
    [Security]  [Performance]  [Maintainability]
         \          |          /
          \         |         /
           [Coordinator Synthesis]
                    ↓
            [Final Report]
```

### Live Setup (Screen Share)

**Step 1: Create project**
```bash
mkdir demo-code-review
cd demo-code-review
npm init -y
```

**Step 2: Create the reviewer configurations**

Show the three reviewer prompts:
- Security Reviewer: vulnerabilities, injection, secrets
- Performance Reviewer: complexity, memory, async
- Maintainability Reviewer: clarity, naming, tests

**Step 3: Create sample code to review**

Show `sample.js` with intentional issues:
- SQL injection vulnerability
- Hardcoded credentials
- N+1 query pattern
- Synchronous blocking in async context

"Let's pause here. Before we run this, let's talk about why we're running these reviewers in parallel and what happens when they disagree."

---

## 2.5 Deep Dive: Debate Pattern (7 min)

### Pattern Recap
```
[Proposer] ←―――→ [Critic]
     \             /
      \           /
       [Judge/Arbiter]
```

### Why Debate?
- Single agents are overconfident
- Errors slip through without challenge
- Adversarial testing improves robustness
- Creates auditable reasoning trail

### Implementation Components

**1. Proposer Agent**
- Generates initial solution/analysis
- Makes claims and recommendations
- Provides evidence and reasoning

**2. Critic Agent**
- Actively seeks flaws in proposer's output
- Raises counterarguments
- Identifies edge cases and risks
- NOT just "find something wrong" — substantive critique

**3. Judge Agent (optional)**
- Evaluates quality of arguments
- Determines which points are valid
- Synthesizes final conclusion
- Can request additional rounds

### Implementation Guidance

**Critic Prompt Pattern:**
```
You are a Critical Reviewer. Your role is to:
1. Carefully examine the provided [proposal/analysis]
2. Identify weaknesses, gaps, and potential errors
3. Raise specific counterarguments with evidence
4. Challenge assumptions that aren't justified

Be substantive, not contrarian. Only raise issues that matter.
If something is solid, acknowledge it and move on.
```

**Disagreement Surfacing Pattern:**
```
When reviewers disagree:
1. State both positions clearly
2. Identify the root cause of disagreement
3. Determine if it's: factual, methodological, or values-based
4. For factual: gather more evidence
5. For methodological: explain trade-offs
6. For values-based: escalate to human decision
```

### Real-World Use Cases

**High-Stakes Decisions:**
- Medical diagnosis: Proposer suggests diagnosis, Critic challenges
- Legal review: One agent argues position, another attacks it
- Investment analysis: Bull case vs. Bear case agents

**Code Review (Our Demo):**
- Security vs. Performance trade-offs
- Maintainability vs. Speed-to-ship tensions
- Coordinator must resolve or flag for human

**Content Moderation:**
- One agent flags content, another defends
- Reduces both false positives and false negatives

### When to Use Debate
- Decisions with significant consequences
- Situations prone to overconfidence
- Need for auditable reasoning
- Trade-offs that need explicit surfacing

### When NOT to Use
- Clear-cut decisions (wasted computation)
- Time-critical responses
- When "good enough" is acceptable

---

## 2.6 Demo 2: Complete and Run (10 min)

### Add Coordinator Synthesis Logic

Show the coordinator code that:
- Collects all three reviews
- Identifies consensus issues
- Flags contradictions
- Produces prioritized report

### The Debate Element in Our Demo

"Our reviewers might disagree. Security might say 'reject this code' while Maintainability says 'it's fine, just needs comments.' The coordinator has to surface these tensions."

### Run the Demo

```bash
node review-system.js sample.js
```

### What to Watch For
- Parallel execution (all three start simultaneously)
- Each reviewer's specialized focus
- Coordinator's synthesis handling disagreements
- Final prioritized report

### Discussion Points (while running)
- "Notice Security found the SQL injection immediately"
- "Performance caught the N+1 pattern"
- "Watch how the coordinator handles conflicts..."

---

## 2.7 Deep Dive: Committee Pattern (5 min)

### Pattern Recap
```
[Input] → [Agent 1] →
       → [Agent 2] → [Aggregator] → [Output]
       → [Agent 3] →
```

### Connection to Our Demo
"What we just ran is actually a hybrid. The parallel reviewers are a Committee—multiple agents processing the same input independently. The Coordinator synthesizes like an Aggregator. But we added Hierarchical control and Debate for disagreements."

### Pure Committee vs. Hybrid
| Aspect | Pure Committee | Our Demo (Hybrid) |
|--------|---------------|-------------------|
| Worker communication | None | None |
| Aggregation | Vote/average | Intelligent synthesis |
| Disagreement | Majority wins | Surfaced and resolved |
| Control | Minimal | Coordinator oversight |

### Implementation Guidance

**Aggregation Strategies:**
| Strategy | When to Use | Example |
|----------|-------------|---------|
| Majority Vote | Classification tasks | Spam detection |
| Average | Numeric outputs | Scoring |
| Unanimous | High-stakes decisions | Safety checks |
| Synthesis | Complex outputs | Our code review |
| Confidence-Weighted | Varying expertise | Domain-specific |

**Committee Prompt Pattern:**
```
You are one of several independent reviewers.
Analyze the input and provide your assessment.
Do NOT try to guess what other reviewers will say.
Your unique perspective is valuable precisely because it's independent.
```

### Real-World Use Cases

**Reliability-Critical Systems:**
- Multiple agents verify calculations
- Consensus required before action
- Financial reconciliation, safety systems

**Diverse Expertise:**
- Legal + Technical + Business review
- Each brings different lens
- Aggregator synthesizes perspectives

**Reducing Bias:**
- Different model configurations
- Different prompting strategies
- Diversity in the committee matters

---

## 2.8 Brief: Dynamic Routing (5 min)

### Pattern Recap
```
        [Router]
       /   |   \
[Code] [Data] [Writing]
Agent   Agent   Agent
```

### Relationship to Hierarchical
"Dynamic Routing is essentially Hierarchical with smart dispatch. The router doesn't decompose tasks—it classifies and routes to the right specialist."

### Implementation Guidance

**Router Prompt Pattern:**
```
You are a Query Router. Analyze incoming requests and route to:
- CodeAgent: Programming questions, debugging, code review
- DataAgent: Data analysis, SQL, statistics
- WritingAgent: Documentation, emails, content

Classify based on primary intent. If unclear, ask for clarification.
Output format: {"route": "agent_name", "confidence": 0.0-1.0}
```

**Routing Strategies:**
| Strategy | Implementation | Trade-off |
|----------|---------------|-----------|
| Keyword-based | Rules/regex | Fast but brittle |
| LLM Classification | Small model classifies | Flexible but adds latency |
| Embedding Similarity | Compare to examples | Good balance |
| Hybrid | Rules → LLM fallback | Best of both |

### Real-World Use Cases
- Customer support ticket routing
- IDE code assistance (explain vs. generate vs. debug)
- Multi-modal queries (text vs. image vs. code)

### When to Use
- Heterogeneous query types
- Clear specialist boundaries
- Want to minimize unnecessary computation

---

## 2.9 Demo 2 Results and Discussion (5 min)

### Review the Output

Walk through the final report:
- Consensus issues (all three reviewers agreed)
- Conflicts surfaced (Security vs. Performance trade-offs)
- Prioritized action items
- Overall code health score

### Key Observations

**Hierarchical in Action:**
- Coordinator managed the entire flow
- Workers stayed in their lanes
- Synthesis created unified output

**Debate in Action:**
- Disagreements were surfaced, not hidden
- Coordinator made explicit trade-off decisions
- Audit trail shows reasoning

**Committee in Action:**
- Parallel execution (3x faster than sequential)
- Independent perspectives caught different issues
- No single reviewer found everything

### Connecting Patterns to Real Work

"You can use these same patterns for:
- Architecture review (Security + Scalability + Cost reviewers)
- Document review (Legal + Compliance + Business reviewers)
- Interview evaluation (multiple interviewer agents)
- Any situation where you want multiple perspectives with structured synthesis"

---

## 2.10 Wrap-Up and Section 3 Preview (5 min)

### Section 2 Recap
```
✓ Anthropic's agent support: Task tool, definitions, tool patterns
✓ Hierarchical: Coordinator + Workers, top-down control
✓ Debate: Proposer + Critic, disagreement as feature
✓ Committee: Parallel processing, diverse perspectives
✓ Dynamic Routing: Smart dispatch to specialists
✓ Demo: Multi-agent code review combining all patterns
```

### The Limitation We Hit
"Everything we built today is **structured**. We defined the agents, the flow, the handoffs. The coordinator was in charge."

"But what if we want agents to figure out how to coordinate on their own? What if the task is too complex to pre-define the workflow?"

### Section 3 Preview: Self-Organizing Systems
```
Section 3: Self-Organizing Systems with claude-flow

• Emergent coordination (no predefined workflow)
• Shared memory architecture
• Agents discover and build on each other's work
• True swarm behavior
• The Agentics Foundation stack
```

### Questions Before Break?
- Address Q&A widget questions
- 5-minute break

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Start Section 2
- 0:05 - Finish intro, begin Anthropic agent support
- 0:15 - Finish agent support, begin Hierarchical deep dive
- 0:23 - Finish Hierarchical, begin Demo 2 setup Part 1
- 0:31 - Finish Demo setup, begin Debate deep dive
- 0:38 - Finish Debate, begin Demo 2 completion
- 0:48 - Demo running, begin Committee deep dive
- 0:53 - Finish Committee, begin Dynamic Routing
- 0:58 - Demo results + wrap-up
- 1:00 - Break

### Materials Checklist
- [ ] Pre-prepared reviewer configuration code
- [ ] Pre-prepared sample.js with intentional issues
- [ ] Pre-prepared coordinator synthesis code
- [ ] Backup demo output in case of API issues

### Common Questions

**"Why not just use one agent with a longer prompt?"**
> Context pollution. A single agent trying to be security expert, performance expert, and maintainability expert will be mediocre at all three. Specialized agents with focused context perform better.

**"Isn't running three reviewers expensive?"**
> Yes, but they run in parallel so wall-clock time is similar. And for code review, catching a security vulnerability before production is worth the API cost.

**"How do you test multi-agent systems?"**
> Test each agent in isolation first (unit tests). Then test the integration (does coordinator correctly synthesize?). Use deterministic inputs for reproducibility.

**"What if agents get stuck in debate loops?"**
> Set maximum rounds. Have the coordinator make a decision after N rounds. Or escalate to human if stakes are high enough.

### If Demo Is Slow
- Continue through Committee and Dynamic Routing slides
- Show pre-run output
- Demo results can be shown at start of Section 3
