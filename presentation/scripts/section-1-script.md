# Section 1: Script and Slides

**Duration:** 60 minutes (55 min content + 5 min buffer)

---

## 1.1 Introduction and Course Overview (5 min)

### SLIDE 1: Title Slide
**Visual:** Course title, instructor name, O'Reilly branding
```
Developing with AI Agent Swarms
Agentic software development with claude-flow

James Urquhart
```

**Script:**
> Welcome to Developing with AI Agent Swarms. I'm James Urquhart, and over the next three hours we're going to explore one of the most exciting frontiers in AI-assisted software development: multi-agent systems.
>
> If you've used Claude, ChatGPT, or Copilot for coding, you've experienced what a single AI agent can do. Today we're going beyond that—into systems where multiple specialized agents work together, coordinate, and even form swarms to tackle complex problems.

---

### SLIDE 2: Course Structure
**Visual:** Three-section breakdown with timing
```
Section 1: Agentic AI and Swarm Basics (60 min)
  → Concepts, terminology, six architectures
  → Demo: Sequential Pipeline (Research & Write)

Section 2: Creating Advanced Multi-Agent Systems (60 min)
  → Deep dives: Hierarchical, Debate, Committee, Routing
  → Demo: Multi-Agent Code Review

Section 3: Applying Multi-Agent Patterns (60 min)
  → Decision framework, emergent coordination, best practices
  → Demo: Self-Organizing Swarm walkthrough
```

**Script:**
> Here's how we'll spend our time together.
>
> In Section 1—where we are now—I'll give you the conceptual foundation. We'll define what multi-agent AI actually means, walk through the key terminology, and survey six architectural patterns. We'll also build our first multi-agent system: a research-to-writing pipeline.
>
> Section 2 goes deep on structured orchestration. We'll implement hierarchical patterns, add debate and committee elements, and build a multi-agent code review system with three specialized reviewers.
>
> Section 3 brings it all together. We'll look at emergent coordination with swarms, walk through a pre-recorded demo, and most importantly—build a decision framework for knowing which pattern to use when. That's the skill that transfers across tools and platforms.

---

### SLIDE 3: Course Objectives
**Visual:** Three bullet points
```
By the end of this course, you will:

• Understand how swarms differ from structured
  multi-agent orchestration

• Know six architectural patterns and when to
  choose swarms over other approaches

• Build multi-agent systems and see swarm
  coordination in action with claude-flow
```

**Script:**
> Three objectives for today.
>
> First, you'll understand what makes swarms different—not just from single-agent workflows, but from the structured multi-agent patterns we'll build first. Swarms are about emergent coordination, and that distinction matters.
>
> Second, you'll have a mental map of six architectural patterns—pipeline, hierarchical, debate, committee, routing, and swarm—and a framework for knowing when swarms are the right choice versus when you need more structure.
>
> Third, you'll get hands-on experience. We'll build multi-agent systems using Claude Code, and you'll see swarm coordination in action with claude-flow.
>
> Quick logistics: use the Q&A widget for questions—I'll address them at natural break points. The GitHub repo link is in the resources panel if you want to follow along with code.

---

## 1.2 What is Multi-Agent AI? (10 min)

### SLIDE 4: The Shift
**Visual:** Simple visual showing single agent vs. multiple agents
```
Single Agent                    Multi-Agent

   [Claude]                  [Researcher] [Writer]
      |                           \       /
      |                            [Editor]
   [Output]                           |
                                  [Output]
```

**Script:**
> Let's start with the fundamental shift we're talking about.
>
> On the left, you have what most of us do today: one AI, one conversation, one context window. You ask Claude to research something, then write about it, then edit it. All in one thread.
>
> On the right, you have a multi-agent system. A researcher agent that specializes in gathering information. A writer agent that specializes in prose. An editor agent that catches errors. Each with their own context, their own tools, their own focus.
>
> This isn't just about running Claude three times. It's about specialization and coordination.

---

### SLIDE 5: Definition
**Visual:** Formal definition with key terms highlighted
```
Multi-agent AI is a computational paradigm where
two or more autonomous AI agents—each with distinct
roles, capabilities, or knowledge domains—coordinate,
collaborate, or compete to achieve individual or
collective goals through structured interaction protocols.
```

**Script:**
> Here's a more formal definition. Let me break it down.
>
> "Two or more autonomous agents"—these are separate AI instances, each making their own decisions.
>
> "Distinct roles, capabilities, or knowledge domains"—specialization. One agent might have access to web search, another to code execution, another to databases.
>
> "Coordinate, collaborate, or compete"—agents can work together, but they can also argue with each other. Debate architectures use competition to improve reasoning.
>
> "Structured interaction protocols"—this is the key engineering challenge. How do agents talk to each other? How do they hand off work? We'll spend real time on this.

---

### SLIDE 6: Why Multi-Agent Matters
**Visual:** Three limitations with corresponding solutions
```
Single Agent Limitations     Multi-Agent Solutions
─────────────────────────    ─────────────────────
Context window constraints → Decompose across agents
Lack of specialized depth  → Each agent optimized for one task
Sequential bottlenecks     → Parallel execution
```

**Script:**
> Why does this matter? Because single agents—no matter how capable—hit real limits.
>
> Context windows. Even with 200K tokens, complex projects exhaust available context. Multi-agent systems let you break the problem into pieces, each agent maintaining focused context for its piece.
>
> Specialization. A single model doing coding, legal analysis, and creative writing compromises on all of them. Dedicated agents can be optimized—through prompts, tools, or fine-tuning—for specific tasks.
>
> Parallelism. One agent processes sequentially. Multiple agents can work simultaneously. When your researcher is gathering data, your architect can be planning structure.

---

### SLIDE 7: The Human Analogy
**Visual:** Organizational chart or team diagram
```
How effective human teams work:

  [Principal Investigator]
         /    |    \
   [Stats] [Lab] [Analysis]

• Specialists coordinate
• They debate and verify each other
• Outcomes none could achieve alone
```

**Script:**
> This isn't a new idea. It's how effective human organizations work.
>
> A research lab doesn't have one person doing statistics, wet lab work, data analysis, and paper writing. They have specialists who coordinate.
>
> A software team doesn't have one developer doing frontend, backend, DevOps, and QA. They have people with different skills who review each other's work.
>
> Multi-agent AI applies this same principle. The insight is that intelligence often emerges not from a single system, but from the interplay between specialized components.

---

### SLIDE 8: Real-World Deployments
**Visual:** Five examples with metrics
```
In Production Today:

• Financial Services: Multi-agent fraud detection
  → 95%+ accuracy, reduced false positives

• Insurance: 7-agent claims processing
  → 80% faster processing time

• Warehouses: Amazon Kiva robot swarms
  → Hundreds of agents coordinating in real-time

• AI Products: ChatGPT (Operator + Deep Research + Code)
             Claude Code (subagent spawning)

• Edge/On-Prem: Local open source models (Llama, Mistral)
  → Privacy-sensitive, low-latency, air-gapped deployments
```

**Script:**
> This isn't theoretical. Multi-agent systems are in production today.
>
> Banks are using multi-agent fraud detection—one agent analyzes geographic patterns, another spending behavior, another merchant verification. Together they catch fraud that any single model would miss.
>
> Insurance companies process claims through seven-agent pipelines. A planner initiates, a coverage agent checks policies, a weather agent verifies events, a fraud agent looks for anomalies. Processing time down 80%.
>
> Amazon's warehouses run hundreds of Kiva robots as a coordinating swarm. Task allocation agents, traffic management agents, retrieval agents—all working in real-time.
>
> The AI tools you use are going this direction. ChatGPT combines Operator, Deep Research, and code execution. Claude Code spawns specialized subagents. This is the architecture of modern AI products.
>
> And it's not just cloud services. Open source models like Llama and Mistral are enabling multi-agent systems at the edge and on-premises—for organizations that need privacy, low latency, or air-gapped environments. We'll touch on this more later.

---

## 1.3 Key Terminology (5 min)

### SLIDE 9: Core Terms
**Visual:** Term definitions in a clean list or grid
```
Agent         Autonomous AI with specific role, tools,
              and decision-making capability

Orchestration Coordinating multiple agents toward a
              shared goal

Context       The information an agent can process at
Window        once; each agent has its own

Handoff       Passing work from one agent to another

Subagent      An agent spawned by another agent to
              handle a subtask
```

**Script:**
> Let's establish shared vocabulary. These terms will come up constantly.
>
> An **agent** is an autonomous AI component. It has a role, access to specific tools, and makes its own decisions within that scope. Not just a prompt—an agent can take actions.
>
> **Orchestration** is how you coordinate agents. Someone or something has to decide which agent does what, when.
>
> **Context window**—you know this from using Claude. What's important in multi-agent systems is that each agent has its *own* context window. They don't automatically share memory.
>
> A **handoff** is when one agent passes work to another. This is a critical design decision—how do agents communicate?
>
> A **subagent** is spawned by another agent. The main Claude Code agent can spawn researcher and writer subagents. They do focused work and return results.

---

### SLIDE 10: Advanced Terms
**Visual:** Continuation of terms
```
Swarm         Multiple agents working in parallel with
              emergent coordination (not centrally directed)

Shared        A common data store agents use to
Memory        communicate state

MCP           Model Context Protocol—open standard for
              connecting agents to external tools/data
```

**Script:**
> A few more terms we'll use heavily.
>
> A **swarm** is what this course is really about. It's not just multiple agents—it's multiple agents working in parallel where coordination *emerges* from their interactions. No single agent directing traffic.
>
> **Shared memory** is one way swarms coordinate. Instead of explicit handoffs, agents read and write to a common data store. They discover each other's work. We'll see this in claude-flow.
>
> **MCP**—Model Context Protocol—is an open standard Anthropic developed for connecting agents to external tools. Databases, APIs, file systems. Both Anthropic and OpenAI have adopted it. When you see an agent accessing Slack or GitHub, MCP is often how.

---

## 1.4 The Technology Landscape (4 min)

### SLIDE 11: Frameworks
**Visual:** Four frameworks with positioning, plus AAIF note
```
Framework     Philosophy              Best For
─────────────────────────────────────────────────────
Claude Code   Terminal-based agents   Development workflows
              with tool access

Claude Flow   Swarm orchestration,    Parallel agent
              shared memory           coordination

LangGraph     Graph-based stateful    Complex orchestration
              workflows               with precise control

CrewAI        Role-based teams        Rapid prototyping
              ("researcher", "writer")

─────────────────────────────────────────────────────
Emerging Standard: Agentic AI Foundation (Linux Foundation)
  → MCP, goose, AGENTS.md
  → Backed by Anthropic, OpenAI, Google, Microsoft, AWS
```

**Script:**
> The ecosystem is evolving fast. Let me orient you to four frameworks we'll reference.
>
> **Claude Code** is what many of you already use. It's a terminal-based AI that can spawn subagents, access files, run commands. We'll start our demos here.
>
> **Claude Flow** is from the Agentics Foundation—a community-driven project for swarm orchestration. It adds shared memory, parallel agent spawning, and coordination primitives that Claude Code doesn't have natively. This is our Section 2 focus.
>
> **LangGraph**, from the LangChain team, models agent workflows as graphs. Nodes are agents or tools, edges are transitions. Very powerful for complex, stateful workflows.
>
> **CrewAI** takes a role-based approach—you define agents like team members. "This is my researcher, this is my writer." Great for rapid prototyping, very intuitive.
>
> Now, something very recent: just last week, the Linux Foundation launched the Agentic AI Foundation—AAIF. This brings together MCP from Anthropic, goose from Block, and AGENTS.md from OpenAI under neutral governance. The platinum members read like a who's who: Anthropic, OpenAI, Google, Microsoft, AWS, Bloomberg, Cloudflare.
>
> The AAIF is arguably trying to be the OpenStack of agentic computing. Adoption remains to be seen. But it signals that the industry is converging on shared standards for how agents connect to tools and coordinate with each other.
>
> Today we focus on Claude Code and Claude Flow, but watch this space.

---

### SLIDE 12: MCP - The Connector
**Visual:** Simple diagram showing MCP connecting agents to tools
```
                    Model Context Protocol

[Claude Agent] ←→ [MCP] ←→ [GitHub]
                    ↕        [Slack]
                    ↕        [Databases]
                    ↕        [File Systems]

Originally Anthropic • Now AAIF/Linux Foundation
10,000+ published MCP servers
```

**Script:**
> One more piece: MCP, the Model Context Protocol.
>
> The problem it solves: every agent needs to connect to external tools and data. Before MCP, everyone built custom integrations. MCP provides a universal protocol.
>
> Think of it like USB for AI agents. A standard way to plug into GitHub, Slack, databases, file systems—anything.
>
> Anthropic originally developed MCP, and it's grown to over 10,000 published servers—everything from developer tools to Fortune 500 deployments. It's now been donated to the AAIF under Linux Foundation stewardship, which means it's governed as neutral, open infrastructure.
>
> When we set up claude-flow later, we'll add it as an MCP server. That's how Claude Code will talk to the swarm.

---

## 1.5 Six Multi-Agent Architectures (15 min)

### SLIDE 13: Architecture Overview
**Visual:** Six patterns listed with one-line descriptions
```
Six Patterns for Multi-Agent Systems

1. Hierarchical    Manager delegates to workers
2. Debate          Agents argue, judge decides
3. Committee       Parallel processing, aggregated results
4. Pipeline        Sequential handoffs
5. Routing         Dynamic dispatch to specialists
6. Network/Swarm   Emergent coordination
```

**Script:**
> Now let's map the terrain. There are six fundamental patterns for organizing multi-agent systems.
>
> Each makes different trade-offs between control and flexibility, cost and reliability, predictability and emergence.
>
> I'll give you a high-level view of each. We'll go deeper on specific patterns when we implement them.

---

### SLIDE 14: Hierarchical (Manager-Worker)
**Visual:** Tree diagram with manager at top
```
        [Manager]
       /    |    \
[Worker] [Worker] [Worker]
   ↑        ↑        ↑
   └────────┴────────┘
        results

Control: Centralized
Best for: Decomposable tasks
```

**Script:**
> First: **Hierarchical**, or Manager-Worker.
>
> A manager agent receives a complex task. It decomposes the task into subtasks and delegates to specialized workers. Workers execute and return results. The manager synthesizes.
>
> Think of a tech lead breaking down a feature into tickets and assigning them to developers.
>
> Strengths: clear command structure, easy to debug, scales well for parallelizable work.
>
> Weakness: the manager is a single point of failure. If it decomposes the problem poorly, the whole system fails.

---

### SLIDE 15: Debate (Adversarial)
**Visual:** Two agents pointing to a judge
```
[Proposer] ←——→ [Critic]
     \            /
      \          /
       [Judge]

Control: Structured conflict
Best for: High-stakes decisions
```

**Script:**
> **Debate** architecture embraces conflict.
>
> One agent proposes a solution. Another agent—the critic—actively tries to find flaws. Maybe a third agent judges the arguments.
>
> This mirrors adversarial processes humans use: courtroom trials, peer review, red team exercises. We've learned that truth often emerges from structured disagreement.
>
> Strengths: catches errors, reduces overconfidence, produces auditable reasoning.
>
> Weakness: expensive—you're running multiple inference passes. Can get stuck in unproductive loops.

---

### SLIDE 16: Committee (Mixture of Agents)
**Visual:** Parallel paths converging to aggregator
```
[Input]→ [Agent 1] →
      → [Agent 2] → [Aggregator] → [Output]
      → [Agent 3] →

Control: Parallel
Best for: Reliability-critical tasks
```

**Script:**
> **Committee**, or Mixture of Agents.
>
> Multiple agents process the same input independently. Then an aggregator combines their outputs—through voting, averaging, or synthesis.
>
> The philosophy: diverse approaches make different mistakes. Aggregation smooths out individual weaknesses.
>
> Think of consulting multiple doctors, or ensemble methods in machine learning.
>
> Strengths: robust against individual failures, inherently parallel.
>
> Weakness: multiplied cost, and naive voting can amplify shared biases rather than cancel them.

---

### SLIDE 17: Pipeline (Sequential)
**Visual:** Linear flow with labeled stages
```
[Input]→[Retrieve]→[Analyze]→[Synthesize]→[Verify]→[Output]

Control: Sequential
Best for: Staged transformations
★ Our first demo uses this pattern
```

**Script:**
> **Pipeline**, or Sequential Relay.
>
> Agents arranged in a chain. Each performs one transformation and passes to the next. Like an assembly line—each station handles one operation.
>
> This is our first demo pattern. A researcher agent gathers information, hands off to a writer agent who synthesizes it.
>
> Strengths: extreme specialization, easy to reason about, each stage independently testable.
>
> Weakness: fragile. If any agent fails, the pipeline breaks. Errors compound as they propagate.

---

### SLIDE 18: Dynamic Routing
**Visual:** Router dispatching to different specialists
```
           [Router]
          /   |   \
    [Code] [Data] [Writing]

Control: Adaptive
Best for: Heterogeneous queries
```

**Script:**
> **Dynamic Routing**.
>
> A router agent analyzes each incoming request and dispatches to the most appropriate specialist. Not every query goes to every agent—intelligent matching.
>
> Think hospital triage. Not everyone sees every specialist. The system routes based on need.
>
> Strengths: efficient resource use, queries get the right expert.
>
> Weakness: the router is critical. Bad routing wastes resources or produces poor results.

---

### SLIDE 19: Network/Swarm
**Visual:** Mesh of interconnected agents
```
[Agent]←→[Agent]
   ↕    ╲╱    ↕
   ↕    ╱╲    ↕
[Agent]←→[Agent]

Control: Emergent
Best for: Novel problem-solving
★ Our Section 2 focus with claude-flow
```

**Script:**
> Finally: **Collaborative Network**, or **Swarm**.
>
> This is the most open-ended pattern. Agents exist in a shared environment. They communicate freely, discover each other's work, form ad-hoc collaborations. Coordination emerges rather than being directed.
>
> Think of open-source communities, or research fields where people build on each other's work organically.
>
> Strengths: highest potential for emergent intelligence, highly adaptable, resilient to individual failures.
>
> Weakness: unpredictable. Hard to debug. Can produce surprising results—breakthroughs or failures.
>
> This is what claude-flow enables, and it's our Section 2 focus.

---

### SLIDE 20: Architecture Summary
**Visual:** Summary table
```
Architecture   Control      Best For
────────────────────────────────────────
Hierarchical   Centralized  Decomposable tasks
Debate         Structured   High-stakes decisions
Committee      Parallel     Reliability-critical
Pipeline       Sequential   Staged transformations
Routing        Adaptive     Heterogeneous queries
Network/Swarm  Emergent     Novel problem-solving
```

**Script:**
> Here's your cheat sheet.
>
> The key insight: different problems benefit from different coordination patterns. And sophisticated systems often combine patterns—a hierarchical structure for routine tasks that spawns debate processes when confidence is low.
>
> Now let's see one of these patterns in action.

---

## 1.6 Demo Setup: Research & Write Pipeline (8 min)

*[Switch to screen share - no slides]*

### SCREEN: Terminal
**Script:**
> I'm going to set up a Sequential Pipeline with two specialized agents. This will take about five minutes to run, so we'll start it and I'll explain what's happening while it works.
>
> Let me create a project directory.

```bash
mkdir demo-research-write
cd demo-research-write
mkdir -p .claude/agents
```

> Claude Code looks for agent definitions in `.claude/agents`. Each agent is a markdown file with YAML frontmatter.

---

### SCREEN: researcher.md file
**Script:**
> Here's our Researcher agent.

*[Copy/paste pre-prepared researcher.md]*

> Let me walk through this structure.
>
> The frontmatter defines the agent: name, a description that tells Claude when to use it, and critically—the tools this agent has access to.
>
> This researcher can use WebSearch, WebFetch, Read, Grep, Glob. It can gather information. But notice what's missing—no Write or Edit tools. It cannot modify files. Gathering only.
>
> The body is the system prompt. It tells the agent its role and defines the output format. This format is important—it's the contract between this agent and the next one in the pipeline.

---

### SCREEN: writer.md file
**Script:**
> Now the Writer agent.

*[Copy/paste pre-prepared writer.md]*

> Different tool set: Read, Write, Edit. No web access. This agent can't go researching—it works with what it's given.
>
> The system prompt focuses on writing craft: structure, clarity, leading with important information.
>
> Notice the constraint design. The researcher can gather but not modify. The writer can synthesize but not wander off researching. Specialization enforced through tool restrictions.

---

### SCREEN: Launch Claude Code
**Script:**
> Now let's run it. I'll start Claude Code and give it a prompt that triggers the pipeline.

*[Start Claude Code, paste prompt]*

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

> This will take a few minutes. While it runs, let's discuss what's actually happening—how these agents communicate.

---

## 1.7 Agent Communication and Handoff Patterns (8 min)

### SLIDE 21: The Core Problem
**Visual:** Two isolated boxes with question mark between them
```
[Agent A]     ?     [Agent B]
   │                    │
   └── own context ─────┘

Each agent has its own context window.
How do they share information?
```

**Script:**
> While our demo runs, let's talk about one of the most important design decisions in multi-agent systems: how agents communicate.
>
> Here's the core problem. Each agent operates in its own context window. This is intentional—it prevents context pollution, enables focus, allows parallel execution.
>
> But it creates a challenge. Agent A learns something. How does Agent B find out?

---

### SLIDE 22: Four Handoff Patterns
**Visual:** Four patterns with simple diagrams
```
1. File-Based (our demo)
   [A] → file.md → [B]

2. Return Value
   [A] ── spawns ─→ [B]
       ←── result ──┘
   (A may be an orchestrator, another agent, or the main session)

3. Shared Memory
   [A] → [Memory] ← [B]
   [C] →    ↕    ← [D]

4. Message Passing
   [A] ←messages→ [B]
```

**Script:**
> There are four main patterns.
>
> **File-Based**—what our demo uses. Agent A writes to a file, Agent B reads it. Simple, debuggable, creates persistent artifacts.
>
> **Return Value**—a parent spawns a subagent and receives its result directly. The parent could be an orchestrator coordinating multiple agents, another agent in a chain, or just your main Claude session. Either way, it receives the result and decides what to do next.
>
> **Shared Memory**—all agents read and write to a common store. They discover each other's work asynchronously. This is what swarms use.
>
> **Message Passing**—direct communication between agents. Real-time, low latency, but complex routing.

---

### SLIDE 23: Pattern Trade-offs
**Visual:** Comparison table
```
Pattern         Coupling  Debug  Parallel  Use When
──────────────────────────────────────────────────────
File-Based      Loose     High   No        Clear phases
Return Value    Medium    High   No        Parent-child flow
Shared Memory   Loose     Med    Yes       Swarms
Message Passing Tight     Low    Yes       Real-time
```

**Script:**
> Quick comparison.
>
> File-based gives you loose coupling and high debuggability—just read the file to see what was passed. But it's sequential.
>
> Return value is similar but keeps the parent in control—it receives the result and decides what to do next.
>
> Shared memory enables parallelism—multiple agents working simultaneously, reading each other's outputs. But it's harder to debug because timing matters.
>
> Message passing is for real-time systems where agents need to react to each other immediately.

---

### SLIDE 24: Our Demo's Handoff
**Visual:** Flow diagram with handoff highlighted
```
[Main Agent]
     │
     │ spawns
     ▼
[Researcher] ──writes──→ research-notes.md
     │                        │
     │ returns                │
     ▼                        │
[Main Agent]                  │
     │                        │
     │ spawns                 │
     ▼                        │
[Writer] ◄────reads───────────┘
     │
     │ writes
     ▼
briefing.md
```

**Script:**
> Here's exactly what's happening in our demo.
>
> The main Claude Code agent receives our prompt. It spawns the Researcher subagent, which runs in its own context, does web searches, and writes research-notes.md.
>
> The researcher returns to main. Now the main agent spawns the Writer, which reads research-notes.md—that's the handoff—and produces briefing.md.
>
> The file is the interface. The structured format we defined—Key Facts, Context, Sources, Gaps—is the contract. The writer knows exactly what to expect.

---

### SLIDE 25: Preview - Shared Memory
**Visual:** Swarm with shared memory in center
```
Coming in Section 2: Shared Memory Swarms

[Architect] ───┐         ┌─── [Frontend]
               ▼         ▼
            [SQLite Memory]
               ▲         ▲
[Backend] ─────┘         └─── [QA]

Agents discover and build on each other's work
No explicit handoffs required
```

**Script:**
> In Section 2, we'll move from explicit file handoffs to shared memory.
>
> Claude-flow uses SQLite as a shared memory store. Any agent can write discoveries, decisions, or artifacts. Any other agent can read them.
>
> This enables emergent coordination. The architect doesn't explicitly hand off to the frontend developer. The frontend developer *discovers* what the architect decided by querying shared memory.
>
> It's a fundamentally different model, and it's what makes true swarms possible.

---

*[Check demo status - if complete, show results briefly; if still running, continue to wrap-up]*

### SCREEN: Demo Results (if ready)
**Script:**
> Let's check our demo...
>
> *[If complete]* Great, it's finished. Notice two files: research-notes.md and briefing.md.
>
> Look at research-notes—structured exactly as we specified. Key facts, context, sources, gaps. This is what the writer received.
>
> And briefing.md—polished prose, different voice, synthesized from those notes.
>
> The Task() calls in the terminal show you when subagents were invoked. Three agents total: main orchestrator, researcher, writer.
>
> *[If still running]* It's still working—these agents are thorough. We'll check the results at the start of Section 2. The key point: you've seen how to set up a pipeline, and you understand the handoff mechanism.

---

## Wrap-Up and Q&A (5 min)

### SLIDE 26: Section 1 Recap
**Visual:** Summary of what was covered
```
Section 1: What We Covered

✓ Multi-agent AI: definition and why it matters
✓ Key terminology: agents, handoffs, swarms, MCP
✓ Technology landscape: Claude Code, Claude Flow,
  LangGraph, CrewAI
✓ Six architectural patterns
✓ Hands-on: Sequential Pipeline with subagents
✓ Handoff patterns: file, return value, shared memory,
  message passing
```

**Script:**
> Let's recap Section 1.
>
> We defined multi-agent AI and why it matters—specialization, collaboration, scale beyond single-agent limits.
>
> We established vocabulary: agents, orchestration, handoffs, swarms, shared memory, MCP.
>
> We surveyed the technology landscape and mapped six architectural patterns: hierarchical, debate, committee, pipeline, routing, and swarm.
>
> And we built something: a two-agent pipeline with explicit file-based handoffs.

---

### SLIDE 27: Coming in Section 2
**Visual:** Preview of Section 2 content
```
Section 2: Swarm Instantiation and Exploration

• Deep dive into claude-flow
• Shared memory architecture
• Spawning agent swarms
• Watching emergent coordination
• Building a self-organizing system
```

**Script:**
> In Section 2, we go deeper and more parallel.
>
> We'll install claude-flow, understand its shared memory architecture, and spawn actual swarms—multiple agents working simultaneously, coordinating through shared state.
>
> You'll see emergent behavior: agents discovering each other's work, building on it, producing outcomes none of them planned individually.
>
> We'll take a five-minute break. When we come back, have your terminal ready.

---

**Script:**
> Questions before we break?
>
> *[Address 2-3 questions from Q&A widget]*
>
> Great. Five minutes—see you back here at [TIME].

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Slide 1 (Title)
- 0:05 - Slide 4 (The Shift)
- 0:15 - Slide 9 (Core Terms)
- 0:20 - Slide 11 (Frameworks)
- 0:24 - Slide 13 (Architecture Overview)
- 0:39 - Screen share (Demo Setup)
- 0:47 - Slide 21 (Handoff Patterns)
- 0:55 - Slide 26 (Recap)
- 0:60 - Break

### Materials Checklist
- [ ] Pre-prepared researcher.md content for copy/paste
- [ ] Pre-prepared writer.md content for copy/paste
- [ ] Backup demo output (research-notes.md, briefing.md) in case of API issues
- [ ] GitHub repo link in ON24 resources panel

### Common Questions
**"How is this different from just asking Claude to do multiple things?"**
> The key difference is context isolation. When you ask Claude to research then write in one conversation, it carries all the research context into writing. With subagents, the writer only sees the structured handoff—focused context, no pollution.

**"What about cost?"**
> Yes, more agents means more API calls. But specialized agents often finish faster because they're not carrying unnecessary context. And for complex tasks, the quality improvement justifies the cost.

**"Can agents spawn agents recursively?"**
> Yes, though you want to be careful. Unbounded recursion can be expensive. Claude-flow has controls for maximum agent depth.

### If Demo Is Slow
- Continue through handoff patterns slides
- Show the demo output at start of Section 2
- Pre-run a backup version to show expected results
