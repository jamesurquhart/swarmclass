# Section 1: Agentic AI and Swarm Basics

**Duration:** 60 minutes
**Goal:** Establish foundational understanding of multi-agent AI systems before hands-on exploration

---

## 1.1 Introduction and Course Overview (5 min)

### Welcome and Logistics
- Instructor introduction
- Course structure: 3 sections, 3 hours total
- Tools we'll use: Chat, Q&A widget, screen sharing
- GitHub repo available for download

### What We'll Cover Today
- **Section 1** (this section): Concepts, terminology, six architectures, Demo 1 (Sequential Pipeline)
- **Section 2**: Deep dives on Hierarchical, Debate, Committee, Routing patterns; Demo 2 (Code Review)
- **Section 3**: Decision framework for choosing architectures, emergent coordination, best practices; Demo 3 walkthrough

### Course Objectives
- Understand how swarms differ from structured multi-agent orchestration
- Know six architectural patterns and when to choose swarms over other approaches
- Build multi-agent systems and see swarm coordination in action with claude-flow

---

## 1.2 What is Multi-Agent AI? (10 min)

### The Shift from Monolithic to Distributed Intelligence

**Definition:** Multi-agent AI is a computational paradigm where two or more autonomous AI agents—each with distinct roles, capabilities, or knowledge domains—coordinate, collaborate, or compete to achieve individual or collective goals through structured interaction protocols.

### Why This Matters Now
- Single agents face inherent limitations:
  - Context window constraints
  - Lack of specialized expertise
  - Sequential processing bottlenecks
- Multi-agent systems address these through:
  - **Specialization** - Each agent optimized for specific tasks
  - **Collaboration** - Cross-checking reduces errors
  - **Scale** - Complex tasks decomposed across agents

### The Human Analogy
- Organizations don't rely on one person doing everything
- Teams employ specialists who coordinate, debate, verify each other's work
- Multi-agent AI applies this principle to artificial intelligence

### Real-World Deployments (brief examples)
- Financial services: Multi-agent fraud detection (>95% accuracy)
- Insurance: 7-agent claims processing pipelines (80% faster)
- Amazon warehouses: Hundreds of Kiva robots as coordinating agents
- AI products: ChatGPT's combined agents, Claude Code's subagent spawning

---

## 1.3 Key Terminology (5 min)

| Term | Definition |
|------|------------|
| **Agent** | An autonomous AI component with a specific role, tools, and decision-making capability |
| **Orchestration** | Coordinating multiple agents to work toward a shared goal |
| **Context Window** | The amount of information an agent can process at once |
| **Handoff** | Passing work from one agent to another |
| **Subagent** | An agent spawned by another agent to handle a subtask |
| **Swarm** | Multiple agents working in parallel with emergent coordination |
| **Hive/Coordinator** | A pattern where a central agent manages distributed workers |
| **Shared Memory** | A common data store agents use to communicate state |
| **MCP (Model Context Protocol)** | Open standard for connecting agents to external tools/data |

### Context Isolation
- Each agent operates in its own context window
- Agents communicate through explicit interfaces (files, APIs, shared memory)
- This is a feature, not a bug: prevents context pollution, enables specialization

---

## 1.4 The Technology Landscape (5 min)

### Frameworks and Platforms

| Framework | Philosophy | Best For |
|-----------|------------|----------|
| **Claude Code** | Terminal-based agents with tool access | Development workflows |
| **Claude Agent SDK** | Programmatic agent building | Custom applications |
| **Claude Flow** | Swarm orchestration, shared memory | Parallel agent coordination |
| **LangGraph** | Graph-based stateful workflows | Complex orchestration |
| **AutoGen** | Enterprise multi-agent conversations | Microsoft ecosystem |
| **CrewAI** | Role-based team approach | Rapid prototyping |
| **OpenAI Agents SDK** | Lightweight, minimal abstractions | Simple agent systems |

### The Model Context Protocol (MCP)
- Open standard developed by Anthropic
- Universal protocol for agent-to-tool connections
- Adopted by both Anthropic and OpenAI
- Enables agents to access: databases, APIs, file systems, external services

### Today's Focus
- **Claude Code subagents** - Built-in agent spawning
- **claude-flow** - Swarm orchestration from the Agentics Foundation

---

## 1.5 Six Multi-Agent Architectures: Overview (15 min)

*Note: This is a high-level introduction. We'll explore patterns in depth in Section 2.*

### Architecture 1: Hierarchical (Manager-Worker)
```
        [Manager]
       /    |    \
  [Worker] [Worker] [Worker]
```
- **How it works:** Manager decomposes tasks, delegates to specialized workers
- **Best for:** Decomposable tasks with clear subtask boundaries
- **Trade-off:** Manager is single point of failure

### Architecture 2: Debate (Adversarial)
```
  [Proposer] <---> [Critic]
       \           /
        \         /
         [Judge]
```
- **How it works:** Agents argue positions, judge evaluates
- **Best for:** High-stakes decisions requiring scrutiny
- **Trade-off:** Higher computational cost

### Architecture 3: Mixture of Agents (Committee)
```
  [Input] --> [Agent 1] --\
          --> [Agent 2] ----> [Aggregator] --> [Output]
          --> [Agent 3] --/
```
- **How it works:** Multiple agents process same input, results aggregated
- **Best for:** Reliability-critical tasks
- **Trade-off:** Multiplied computational cost

### Architecture 4: Sequential Pipeline (Relay)
```
  [Input] --> [Retrieve] --> [Analyze] --> [Synthesize] --> [Output]
```
- **How it works:** Each agent performs one transformation, passes to next
- **Best for:** Staged transformations with clear phases
- **Trade-off:** Fragile—one failure breaks the chain
- **This is our first demo pattern**

### Architecture 5: Dynamic Routing
```
           [Router]
          /   |   \
    [Code] [Data] [Writing]
      Agent  Agent  Agent
```
- **How it works:** Router analyzes input, dispatches to appropriate specialist
- **Best for:** Heterogeneous queries requiring different expertise
- **Trade-off:** Routing accuracy is critical

### Architecture 6: Collaborative Network (Society/Swarm)
```
    [Agent] <--> [Agent]
       ^    \/     ^
       |    /\     |
    [Agent] <--> [Agent]
```
- **How it works:** Agents communicate freely, coordination emerges
- **Best for:** Novel problem-solving, complex tasks without clear decomposition
- **Trade-off:** Unpredictable emergent behavior
- **This is our Section 2 focus with claude-flow**

### Summary Table

| Architecture | Control | Best For |
|--------------|---------|----------|
| Hierarchical | Centralized | Decomposable tasks |
| Debate | Structured | High-stakes decisions |
| Committee | Parallel | Reliability-critical |
| Pipeline | Sequential | Staged transformations |
| Routing | Adaptive | Heterogeneous queries |
| Network/Swarm | Emergent | Novel problem-solving |

---

## 1.6 Demo 1 Setup: Research & Write Pipeline (10 min)

### Transition
"Now that we understand the basic architectures, let's see one in action. We'll set up a Sequential Pipeline with two specialized agents."

### What We're Building
A two-agent system:
1. **Researcher agent** - Gathers information on a topic
2. **Writer agent** - Synthesizes research into a polished document

The agents hand off work via a file (research-notes.md), demonstrating context isolation and specialization.

### Live Setup (screen share)

**Step 1: Create project directory**
```bash
mkdir demo-research-write
cd demo-research-write
```

**Step 2: Create agent definitions directory**
```bash
mkdir -p .claude/agents
```

**Step 3: Create Researcher agent** (`.claude/agents/researcher.md`)
- Show the YAML frontmatter: name, description, tools
- Explain tool restrictions: Read, Grep, Glob, WebFetch, WebSearch
- Walk through the system prompt and output format

**Step 4: Create Writer agent** (`.claude/agents/writer.md`)
- Different tools: Read, Write, Edit (no web access)
- Different focus: prose quality, structure, coherence

### Launch the Demo (start running in background)

**Step 5: Start Claude Code and issue the prompt**
```
I need a 500-word briefing on "the current state of quantum computing
for business applications."

Use the researcher subagent to gather current information about quantum
computing business use cases, then use the writer subagent to produce
a polished executive briefing.

Work in sequence: complete research first, save findings to
research-notes.md, then have the writer transform those notes into
the final briefing.md document.
```

"This will take a few minutes to run. While it works, let's discuss what's happening under the hood."

---

## 1.7 Agent Communication and Handoff Patterns (10 min)

*"While our demo runs, let's discuss how agents actually talk to each other. This is one of the most important design decisions in any multi-agent system."*

### The Core Problem: Context Isolation

Each agent operates in its own context window. This is intentional:
- Prevents context pollution between specialized tasks
- Allows agents to focus without distraction
- Enables parallel execution (agents don't block each other's context)

But it creates a challenge: **How do agents share information?**

### Four Handoff Patterns

#### Pattern 1: File-Based Handoff (Our Demo)
```
[Agent A] --writes--> [file.md] --reads--> [Agent B]
```
- Agent A writes structured output to a file
- Agent B reads that file as input
- **Pros:** Simple, debuggable, persistent artifact
- **Cons:** Requires agreed format, sequential only
- **Best for:** Pipeline architectures, document workflows

#### Pattern 2: Return Value Handoff
```
[Orchestrator] --spawns--> [Agent A] --returns--> [Orchestrator] --passes to--> [Agent B]
```
- Agent returns result to orchestrator
- Orchestrator passes relevant parts to next agent
- **Pros:** Orchestrator can filter/transform between agents
- **Cons:** Orchestrator becomes bottleneck
- **Best for:** Hierarchical architectures

#### Pattern 3: Shared Memory / Blackboard
```
[Agent A] --writes-->  [Shared Memory]  <--reads-- [Agent B]
[Agent C] --writes-->        ↑↓         <--reads-- [Agent D]
```
- All agents read/write to common data store
- Agents discover each other's work asynchronously
- **Pros:** Flexible, enables emergent coordination
- **Cons:** Race conditions, harder to debug
- **Best for:** Swarm/network architectures (Section 2 focus)

#### Pattern 4: Direct Message Passing
```
[Agent A] <--messages--> [Agent B]
```
- Agents send messages directly to each other
- Often via API calls or event streams
- **Pros:** Real-time, low latency
- **Cons:** Complex routing, tight coupling
- **Best for:** Debate architectures, real-time systems

### Summary: Choosing a Handoff Pattern

| Pattern | Coupling | Debuggability | Parallelism | Use When |
|---------|----------|---------------|-------------|----------|
| File-Based | Loose | High | Sequential | Clear phases, need artifacts |
| Return Value | Medium | High | Sequential | Central coordination needed |
| Shared Memory | Loose | Medium | High | Swarms, emergent behavior |
| Message Passing | Tight | Low | High | Real-time, conversational |

### Our Demo: File-Based Handoff in Action

```
[Your Prompt]
      |
      v
[Claude Code Main Agent]
      |
      | spawns
      v
[Researcher Subagent]
      |
      | writes research-notes.md    <-- THE HANDOFF ARTIFACT
      | returns to main
      v
[Claude Code Main Agent]
      |
      | spawns
      v
[Writer Subagent]
      |
      | reads research-notes.md     <-- RECEIVES THE HANDOFF
      | writes briefing.md
      | returns to main
      v
[Complete]
```

**Why file-based works here:**
- Clear sequential phases (research → write)
- We want the intermediate artifact (research notes are valuable)
- Easy to debug: just read the file to see what was passed
- No need for real-time coordination

**The structured output format matters:**
```markdown
## Output Format (from researcher.md)
- **Key Facts**: Bullet points of essential information
- **Context**: Background needed to understand the topic
- **Sources**: Where information was found
- **Gaps**: What information is still missing
```
This format is the "contract" between agents. The writer knows exactly what to expect.

### Tool Restrictions Enforce Boundaries

| Agent | Has Access | No Access | Why |
|-------|------------|-----------|-----|
| Researcher | WebSearch, WebFetch, Read, Grep, Glob | Write, Edit | Can gather but not modify |
| Writer | Read, Write, Edit | WebSearch, WebFetch | Can synthesize but not wander |

Constraints prevent agents from doing each other's jobs—specialization by design.

### Preview: Shared Memory in Section 2

In Section 2, we'll use claude-flow which implements **Pattern 3: Shared Memory**.

```
[Architect Agent] --writes-->  [SQLite Memory]  <--reads-- [Frontend Agent]
[Backend Agent]   --writes-->        ↑↓          <--reads-- [QA Agent]
```

This enables emergent coordination—agents discover and build on each other's work without explicit handoffs.

### Poll: Quick Check
"In our running demo, how many total agents are involved?"
- A) 1
- B) 2
- C) 3
- D) More than 3

*(Answer: C - Main orchestrator + Researcher + Writer)*

### What to Watch For (when demo completes)
- `Task(...)` output in terminal shows subagent invocation
- Two distinct files created: research-notes.md and briefing.md
- Different "voices" in each file reflecting agent specialization
- The research-notes.md file as the visible handoff artifact

---

## Section 1 Wrap-Up

### What We Covered
- Multi-agent AI definition and why it matters
- Key terminology: agents, orchestration, handoffs, context isolation
- Technology landscape: frameworks and MCP
- Six architectural patterns at a high level
- Hands-on: Sequential Pipeline with Claude Code subagents

### Preview: Section 2
- Deep dive into claude-flow and swarm patterns
- More complex multi-agent coordination
- Shared memory and emergent behavior

### Questions Before Break?
- Use Q&A widget for questions
- 5-minute break before Section 2

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Start Section 1
- 0:05 - Finish intro, begin "What is Multi-Agent AI"
- 0:15 - Finish definition, begin terminology
- 0:20 - Finish terminology, begin technology landscape
- 0:25 - Finish landscape, begin architectures overview
- 0:40 - Finish architectures, begin demo setup
- 0:50 - Demo running, discuss mechanics
- 0:60 - Section 1 complete

### Common Questions to Anticipate
- "How is this different from just prompting Claude to do multiple things?"
- "What about cost? Isn't running multiple agents expensive?"
- "Can agents call other agents recursively?"
- "How do you debug when something goes wrong?"

### If Demo Takes Too Long
- Continue with mechanics explanation
- Show expected output from pre-run example
- Actual demo results can be shown at start of Section 2

### Materials Needed
- Pre-created researcher.md and writer.md files (for copy/paste)
- Backup completed demo output in case of API issues
