# Section 3: Applying Multi-Agent Patterns — Full Script

**Duration:** 60 minutes
**Slides:** 54-76 (23 slides)
**Focus:** Synthesis, decision-making, choosing the right architecture

---

## Module 3.1: Introduction — The Architecture Spectrum (5 min)

### Slide 54: Section 3 Title
**Visual:** Title slide with "Section 3: Applying Multi-Agent Patterns"

**Script:**
"Welcome back. We've covered a lot of ground. Section 1 introduced six architectural patterns and showed you a sequential pipeline. Section 2 went deep on structured orchestration—hierarchical coordination, debate, committee, routing.

Now the question becomes: how do you choose? Given a real task, which pattern fits? That's what Section 3 is about. Less learning new tools, more making decisions."

---

### Slide 55: The Control Spectrum
**Visual:** Horizontal spectrum diagram

```
More Control ◄─────────────────────────────────────────► More Emergence

Sequential    Hierarchical    Dynamic      Committee    Debate    Swarm
Pipeline      (Manager)       Routing      (Parallel)   (Adversarial)  (Network)
    │              │             │             │           │          │
 Section 1     Section 2     Section 2    Section 2   Section 2   Section 3
```

**Script:**
"Here's a mental model that ties everything together. Think of multi-agent patterns on a spectrum from control to emergence.

On the left, maximum control. Sequential pipeline—you define every step, every handoff. Predictable, auditable, but rigid.

On the right, maximum emergence. Swarm—agents discover work, coordinate through shared memory, patterns emerge from local decisions. Adaptive, but unpredictable.

Most of what we covered in Section 2 sits in the middle. Hierarchical gives you structure with some flexibility. Committee and Debate give you multiple perspectives with coordination overhead.

Your job is to pick the right spot on this spectrum for your problem."

---

### Slide 56: Structured vs. Emergent
**Visual:** Two-column comparison

```
Structured (Section 2)          Emergent (Swarms)
────────────────────            ─────────────────────
Predefined workflow             No predefined workflow
Coordinator assigns work        Agents discover work
Explicit handoffs               Shared memory discovery
Predictable behavior            Adaptive behavior
```

**Script:**
"Let's make that contrast concrete.

In structured systems, you predefine the workflow. The coordinator assigns work. Handoffs are explicit—'Security reviewer, analyze this code.' Behavior is predictable.

In emergent systems, there's no predefined workflow. Agents discover work by querying shared memory. Nobody assigns tasks—agents see what's needed and act. Behavior is adaptive but less predictable.

Neither is better. They're different tools for different problems. Section 3 is about knowing when to use which."

---

### Slide 57: Section 3 Roadmap
**Visual:** Bullet list with icons

```
Section 3 Roadmap:
• Brief look at emergent coordination (claude-flow)
• Pre-recorded demo walkthrough
• Decision framework: choosing your architecture
• Best practices, cost, and safety
• Open Q&A
```

**Script:**
"Here's what we'll cover. First, a brief look at the emergent end of the spectrum—what swarm coordination actually looks like with claude-flow.

Then we'll walk through a pre-recorded demo. Unlike our previous demos, this one was captured ahead of time. Swarm behavior is inherently unpredictable, and in hour three, I'd rather show you a clean run than wait for live execution.

The centerpiece of this section is the decision framework—practical guidance for choosing which pattern to use. Then we'll cover cost, safety, and best practices. We'll finish with Q&A and, if time permits, a brief live demo."

---

## Module 3.2: Emergent Coordination — A Brief Look (5 min)

### Slide 58: The Agentics Foundation and claude-flow
**Visual:** Logo and key points

```
Agentics Foundation
• Community-driven, founded by Reuven Cohen
• Open source swarm orchestration

claude-flow
• Leading swarm platform for Claude
• Multiple agents coordinating via shared memory
• MCP integration for tool access
```

**Script:**
"The tool we'll look at is claude-flow, from the Agentics Foundation. This is a community-driven project focused on practical, production-ready agent orchestration.

Claude-flow enables multiple Claude Code agents to coordinate via shared memory. Each agent can store discoveries, query what others have learned, and build on previous work. There's no central coordinator directing traffic—coordination emerges from agents interacting with shared state.

Quick clarification: The Agentics Foundation is different from the AAIF—the Agentic AI Foundation under the Linux Foundation. Agentics builds tools like claude-flow. AAIF defines standards like MCP. They're complementary—claude-flow uses MCP, which AAIF now stewards."

---

### Slide 59: How Swarms Coordinate
**Visual:** Numbered flow with shared memory at center

```
How Swarm Coordination Works:

1. Agents spawn with specialized capabilities
           ↓
2. Shared memory stores discoveries, decisions, artifacts
           ↓
3. Agents query memory to find work and context
           ↓
4. No central assignment—coordination emerges
           ↓
5. Results accumulate through collective effort

        [Agent A]    [Agent B]    [Agent C]
             \           |           /
              \          |          /
               [  Shared Memory  ]
```

**Script:**
"Here's how it works conceptually.

Agents spawn with specialized capabilities—an architect, a frontend developer, a tester. They all have access to shared memory.

The architect writes a decision to memory: 'We're building a single-page app with vanilla JavaScript.' The frontend developer queries memory, discovers this decision, and starts building the UI. The backend developer does the same independently—parallel work without explicit coordination.

The tester queries memory, discovers new code has been written, and starts writing tests. Nobody assigned these tasks. Each agent discovered useful work and acted.

Results accumulate. The documenter eventually queries memory, sees all the components, and writes the README. The final output emerges from collective effort, not central direction."

---

## Module 3.3: Demo Walkthrough — What a Swarm Built (10 min)

### Slide 60: Demo 3 — The Task
**Visual:** Task description and agent list

```
The Task:
"Build a simple todo list web application
 with HTML, CSS, and JavaScript"

Agents Spawned:
┌─────────────┬──────────────────┐
│ Agent       │ Role             │
├─────────────┼──────────────────┤
│ Architect   │ System Designer  │
│ Frontend    │ UI Developer     │
│ Backend     │ Logic Developer  │
│ QA          │ Tester           │
│ Documenter  │ Writer           │
└─────────────┴──────────────────┘
```

**Script:**
"Let's walk through what a swarm actually produced. The task was simple: build a todo list web application with HTML, CSS, and JavaScript.

We spawned five agents. An architect for system design. Frontend and backend developers. A QA engineer. A documenter.

No workflow was predefined. We just said 'build a todo app' and let the agents figure it out."

---

### Slide 61: The Output — Files Created
**Visual:** File tree with descriptions

```
Files Created by the Swarm:

demo-swarm/
├── index.html      ← Application structure
├── styles.css      ← Styling
├── app.js          ← Todo functionality
├── tests/
│   └── app.test.js ← Unit tests
└── README.md       ← Documentation
```

**Script:**
"Here's what the swarm produced. A complete, working todo application.

index.html with the application structure. styles.css for styling. app.js with the todo functionality—add, delete, toggle complete. A tests directory with unit tests. And a README documenting everything.

Let me show you each file briefly."

[Show actual files if available, or describe representative content]

"The HTML has a clean structure—header, input form, todo list container. The CSS is minimal but functional. The JavaScript implements localStorage persistence so todos survive page refresh. The tests cover the core operations.

This actually works. You can open it in a browser and use it."

---

### Slide 62: The Memory Trail
**Visual:** Timeline of memory operations

```
Memory Trail — How Coordination Happened:

[12:01:15] architect → STORED: "architecture-decision"
           "Single-page app, vanilla JS, localStorage"

[12:01:47] frontend → QUERIED: "architecture"
           Found: architect's decision

[12:02:03] frontend → STORED: "component-started"
           "Building header and input form"

[12:02:15] backend → QUERIED: "architecture"
           Found: architect's decision

[12:02:31] backend → STORED: "component-started"
           "Building todo CRUD operations"

[12:03:45] qa → QUERIED: "components"
           Found: frontend and backend work

[12:04:02] qa → STORED: "tests-written"
           "Unit tests for add/delete/toggle"
```

**Script:**
"This is the key teaching moment. Let's look at the memory trail—the log of how agents coordinated.

At 12:01:15, the architect stored an architecture decision. 'Single-page app, vanilla JavaScript, localStorage for persistence.' This is the seed.

Thirty seconds later, the frontend developer queried memory for architecture decisions. It found what the architect wrote and decided to act on it. It stored 'Building header and input form' so other agents know what it's working on.

Meanwhile, the backend developer independently queried the same memory, found the same architecture decision, and started building the todo CRUD operations. Parallel work—no explicit coordination.

A minute later, QA queried for components, found that frontend and backend had been working, and started writing tests. Nobody told QA to do this. It discovered the work and acted.

This is emergence. Coordination from local decisions, not central control."

---

### Slide 63: The Key Insight
**Visual:** Comparison quote

```
The Key Insight:

Section 2 (Code Review):
  "Coordinator, assign Security reviewer to analyze this code"
  → Explicit assignment

Section 3 (Swarm):
  "Frontend queries memory, sees architecture, decides to build UI"
  → Discovery, not assignment
```

**Script:**
"Here's the fundamental difference.

In Section 2, our coordinator explicitly assigned reviewers. 'Security reviewer, analyze this code. Performance reviewer, check for bottlenecks.' The coordinator was in charge.

In this swarm, nobody told Frontend to build the header. It queried memory, saw what was needed, and acted. That's discovery versus assignment.

Both approaches produce working results. The question is which fits your problem."

---

### Slide 64: Section 2 vs. Section 3 Comparison
**Visual:** Comparison table

```
┌────────────────────────┬─────────────────────────┐
│ Section 2 (Code Review)│ Section 3 (Swarm)       │
├────────────────────────┼─────────────────────────┤
│ Coordinator assigned   │ Agents claimed work     │
│ reviewers              │                         │
├────────────────────────┼─────────────────────────┤
│ Predefined roles       │ Roles discovered        │
│                        │ organically             │
├────────────────────────┼─────────────────────────┤
│ Coordinator synthesized│ Synthesis emerged from  │
│ at the end             │ accumulated work        │
├────────────────────────┼─────────────────────────┤
│ Predictable, auditable │ Adaptive, exploratory   │
└────────────────────────┴─────────────────────────┘
```

**Script:**
"Let's make this concrete with a side-by-side comparison.

In our code review system, the coordinator assigned specific reviewers. Roles were predefined—Security, Performance, Maintainability. The coordinator synthesized the final report. The process was predictable and auditable.

In the swarm, agents claimed work by discovering it. Roles emerged organically based on what agents found in memory. The final output—the working app plus documentation—emerged from accumulated work. The process was adaptive but less predictable.

Again, neither is better. They solve different problems. Now let's talk about how to choose."

---

## Module 3.4: Decision Framework — Choosing Your Architecture (15 min)

### Slide 65: The Central Question
**Visual:** Large question with context

```
The Central Question:

"Given a task, which multi-agent
 architecture should I use?"

Consider:
• Problem clarity
• Predictability needs
• Time and cost constraints
• Quality requirements
```

**Script:**
"This is the central question of Section 3. Given a task, which architecture should you use?

The answer depends on four factors. How clear is the problem? How predictable does the behavior need to be? What are your time and cost constraints? What quality bar are you trying to hit?

Let's build a decision framework around these."

---

### Slide 66: Decision Tree
**Visual:** Flowchart

```
                    ┌─────────────────────┐
                    │  What's the task?   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │ Well-    │    │ Multiple │    │ Ill-     │
        │ defined  │    │ perspec- │    │ defined/ │
        │ stages   │    │ tives    │    │ explora- │
        │          │    │ needed   │    │ tory     │
        └────┬─────┘    └────┬─────┘    └────┬─────┘
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐    ┌──────────┐    ┌─────────┐
        │Pipeline │    │Committee │    │ Swarm   │
        │   or    │    │    or    │    │         │
        │Hierarch.│    │ Debate   │    │         │
        └─────────┘    └──────────┘    └─────────┘
```

**Script:**
"Here's a simple decision tree to start with.

If your task has well-defined stages—research, then write, then edit—use a pipeline or hierarchical pattern. You know the workflow upfront.

If you need multiple perspectives on the same input—code review, document analysis, risk assessment—use committee or debate. Parallel analysis with synthesis.

If the task is ill-defined or exploratory—you don't know what you'll find or how to decompose it—consider a swarm. Let agents discover the structure.

This is simplified. Let's go deeper."

---

### Slide 67: Pattern Selection Guide
**Visual:** Detailed table

```
Pattern Selection Guide:

┌─────────────────────┬────────────────────────┬─────────────────────┐
│ Pattern             │ Best For               │ Avoid When          │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Sequential Pipeline │ Clear stages,          │ Stages need to      │
│                     │ transformation chains  │ iterate             │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Hierarchical        │ Decomposable tasks,    │ Workers need to     │
│                     │ need oversight         │ collaborate         │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Dynamic Routing     │ Heterogeneous queries, │ Query types         │
│                     │ clear specialists      │ overlap heavily     │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Committee           │ Diverse perspectives,  │ Single expert is    │
│                     │ reduce bias            │ sufficient          │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Debate              │ High-stakes decisions, │ Time-critical,      │
│                     │ need challenge         │ clear-cut           │
├─────────────────────┼────────────────────────┼─────────────────────┤
│ Swarm               │ Exploratory,           │ Need predictability,│
│                     │ ill-defined, adaptive  │ tight budget        │
└─────────────────────┴────────────────────────┴─────────────────────┘
```

**Script:**
"Here's a more detailed guide.

Sequential Pipeline: best for clear stages and transformation chains. Avoid when stages need to iterate or loop back.

Hierarchical: best when tasks decompose cleanly and you need oversight. Avoid when workers need to collaborate with each other—that creates bottlenecks through the manager.

Dynamic Routing: best for heterogeneous queries with clear specialist boundaries. Avoid when query types overlap heavily—the router will struggle to classify.

Committee: best when you need diverse perspectives or want to reduce bias. Avoid when a single expert is sufficient—you're just wasting compute.

Debate: best for high-stakes decisions that benefit from challenge. Avoid for time-critical or clear-cut decisions—the adversarial process adds latency.

Swarm: best for exploratory, ill-defined tasks. Avoid when you need predictability or have tight budget constraints—swarms use more compute and produce variable results."

---

### Slide 68: Decision Criteria Deep Dive
**Visual:** Four criteria tables

```
1. Problem Clarity
┌───────────────────────┬─────────────────────┐
│ Clarity Level         │ Pattern             │
├───────────────────────┼─────────────────────┤
│ Crystal clear workflow│ Pipeline            │
│ Decomposable, complex │ Hierarchical        │
│ Clear specialists     │ Dynamic Routing     │
│ Unclear, exploratory  │ Swarm               │
└───────────────────────┴─────────────────────┘

2. Predictability Requirements
┌───────────────────────┬─────────────────────┐
│ Need                  │ Pattern             │
├───────────────────────┼─────────────────────┤
│ Audit trail required  │ Hierarchical, Pipe  │
│ Reproducibility       │ Pipeline, Hierarch. │
│ Results may vary (ok) │ Swarm, Debate       │
└───────────────────────┴─────────────────────┘
```

**Script:**
"Let's drill into the decision criteria.

Problem clarity: If you have a crystal-clear workflow, use a pipeline. If it's decomposable but complex, hierarchical. If you need routing to specialists, dynamic routing. If it's unclear or exploratory, swarm.

Predictability: If you need an audit trail or reproducibility—regulatory contexts, compliance—stick with hierarchical or pipeline. Central control gives you clear traces. If results may vary and that's acceptable—creative tasks, exploration—swarm and debate are fine.

Time and cost: If you need to minimize latency, pipeline or routing—single execution path. If you need to minimize cost, single agent or simple pipeline. If thoroughness matters more than efficiency, committee or swarm.

Quality: If you need to catch all issues, committee—multiple reviewers. If you need to challenge assumptions, debate. If you need comprehensive coverage of an unknown space, swarm."

---

### Slide 69: Real-World Mapping
**Visual:** Task-to-pattern mapping table

```
Real-World Task Mapping:

┌──────────────────────────────┬─────────────────────┬─────────────────┐
│ Task                         │ Recommended Pattern │ Why             │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Content pipeline             │ Sequential Pipeline │ Clear stages    │
│ (research → write → edit)    │                     │                 │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Code review                  │ Committee + Debate  │ Multiple views, │
│                              │                     │ challenge       │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Customer support routing     │ Dynamic Routing     │ Classification  │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Feature implementation       │ Hierarchical        │ Decomposition   │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Architecture exploration     │ Swarm               │ Ill-defined     │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Investment analysis          │ Debate              │ High stakes     │
├──────────────────────────────┼─────────────────────┼─────────────────┤
│ Bug investigation            │ Swarm or Hierarch.  │ Depends on scope│
└──────────────────────────────┴─────────────────────┴─────────────────┘
```

**Script:**
"Let's map this to real tasks.

Content pipeline—research, write, edit—that's a sequential pipeline. Clear stages, natural handoffs.

Code review: we built this in Section 2. Committee for multiple perspectives, debate elements for surfacing disagreements.

Customer support ticket routing: dynamic routing. Classify the query, send to the right specialist.

Feature implementation: hierarchical. Tech lead decomposes, workers implement, lead integrates.

Architecture exploration: swarm. You don't know what you'll find. Let agents explore and accumulate discoveries.

Investment analysis: debate. High stakes, need to challenge the bull case with a bear case.

Bug investigation is interesting—it depends. If you know where to look, hierarchical decomposition. If you have no idea, swarm exploration to find the root cause."

---

### Slide 70: Hybrid Approaches
**Visual:** Three hybrid pattern diagrams

```
Hybrid Approaches — "You don't have to choose just one"

1. Hierarchical with Swarm Substeps:
   [Coordinator]
        │
        ├── [Worker A] → runs mini-swarm for exploration
        ├── [Worker B] → runs pipeline for transformation
        └── [Worker C] → runs debate for decision

2. Pipeline with Committee Stages:
   [Research] → [Committee Review] → [Write] → [Committee Edit] → [Publish]

3. Routing to Swarms:
   [Router] → Code question → [Code Swarm]
           → Data question → [Analysis Pipeline]
           → Writing task  → [Content Pipeline]
```

**Script:**
"Here's the good news: you don't have to choose just one.

Hybrid approaches are common in production. A hierarchical coordinator might spawn a mini-swarm for an exploratory substep, a pipeline for a transformation, and a debate for a decision.

A content pipeline might include committee stages—multiple editors review the draft before it moves to the next stage.

A router might direct different query types to different architectures—code questions go to a code-focused swarm, data questions go to an analysis pipeline.

The patterns are composable. Use structure where you need predictability, emergence where you need exploration."

---

### Slide 71: The Meta-Question
**Visual:** Risk-based decision framework

```
The Meta-Question:

"When in doubt, ask: What would happen
 if this went wrong?"

┌─────────────────────┬─────────────────────────────┐
│ Consequence Level   │ Recommendation              │
├─────────────────────┼─────────────────────────────┤
│ High consequence    │ More structure              │
│                     │ (Hierarchical, Debate)      │
├─────────────────────┼─────────────────────────────┤
│ Low consequence     │ More freedom                │
│                     │ (Swarm, Committee)          │
├─────────────────────┼─────────────────────────────┤
│ Unknown scope       │ Start Swarm → add structure │
│                     │ as clarity emerges          │
└─────────────────────┴─────────────────────────────┘
```

**Script:**
"When you're stuck, ask this meta-question: What would happen if this went wrong?

High consequence—production deployment, customer-facing, regulatory—use more structure. Hierarchical gives you oversight. Debate catches errors through challenge.

Low consequence—internal tools, experiments, prototypes—give agents more freedom. Swarm exploration might find something you didn't expect.

Unknown scope is the trickiest. Start with swarm to explore, then add structure as clarity emerges. Let emergence find the shape of the problem, then lock it down with orchestration.

This is a skill that develops with practice. You'll get a feel for it."

---

## Module 3.5: Best Practices and Safety (7 min)

### Slide 72: Cost Awareness
**Visual:** Cost multiplier table and controls

```
Multi-Agent = More API Calls

┌─────────────────┬────────────────┬─────────────────────┐
│ Pattern         │ Cost Multiplier│ Notes               │
├─────────────────┼────────────────┼─────────────────────┤
│ Pipeline        │ 2-5x           │ Depends on stages   │
│ Hierarchical    │ 3-10x          │ Coordinator + workers│
│ Committee       │ Nx             │ N = member count    │
│ Debate          │ 2-4x per round │ Compounds with rounds│
│ Swarm           │ 5-50x          │ Highly variable     │
└─────────────────┴────────────────┴─────────────────────┘

Cost Controls:
• Set agent limits: --max-agents 4
• Set timeouts: --agent-timeout 300
• Monitor token usage
• Kill idle agents
• Start small, scale up
```

**Script:**
"Let's talk cost. Multi-agent means more API calls.

A simple pipeline might be 2-5x a single agent, depending on stages. Hierarchical with a coordinator and three workers is 3-10x. Committee multiplies by member count. Debate compounds with each round. Swarms are the most variable—5-50x depending on how agents behave.

Cost controls are essential. Set maximum agent counts. Set timeouts so agents don't run forever. Monitor token usage. Kill idle agents. Start small and scale up only when you need to.

For production, build in circuit breakers. Maximum iterations, maximum total tokens, automatic shutdown if costs exceed thresholds."

---

### Slide 73: Safety Rails
**Visual:** Safety checklist by pattern type

```
Safety Rails:

For All Patterns:
□ Human approval for destructive actions
□ Sandbox file system access
□ No production credentials in agent contexts
□ Log all significant actions

For Swarms Specifically:
□ Circuit breakers (max iterations, max tokens)
□ Memory size limits
□ Conflict detection for parallel writes
□ Regular state snapshots
```

**Script:**
"Safety rails matter more as you give agents more autonomy.

For all patterns: require human approval for destructive actions—don't let agents delete production databases. Sandbox file system access when possible. Never put production credentials in agent contexts. Log everything significant.

For swarms specifically: add circuit breakers—maximum iterations per agent, maximum total tokens. Set memory size limits so shared state doesn't grow unbounded. Implement conflict detection for parallel writes. Take regular state snapshots so you can recover.

The more emergence you allow, the more guardrails you need."

---

### Slide 74: Common Failure Modes
**Visual:** Failure table with prevention

```
Common Failure Modes:

┌────────────────────┬──────────────────────┬─────────────────────┐
│ Failure            │ Symptoms             │ Prevention          │
├────────────────────┼──────────────────────┼─────────────────────┤
│ Infinite loops     │ Agent count grows,   │ Max iterations,     │
│                    │ no progress          │ timeouts            │
├────────────────────┼──────────────────────┼─────────────────────┤
│ Context pollution  │ Agents confused,     │ Clear handoff       │
│                    │ wrong outputs        │ formats             │
├────────────────────┼──────────────────────┼─────────────────────┤
│ Coordinator        │ Workers idle,        │ Increase parallelism│
│ bottleneck         │ waiting              │ or decompose        │
├────────────────────┼──────────────────────┼─────────────────────┤
│ Duplicate work     │ Same output          │ Memory check before │
│                    │ multiple times       │ starting            │
├────────────────────┼──────────────────────┼─────────────────────┤
│ Conflicting        │ Inconsistent         │ Conflict detection, │
│ decisions          │ outputs              │ arbitration         │
└────────────────────┴──────────────────────┴─────────────────────┘
```

**Script:**
"Here are the failure modes to watch for.

Infinite loops: agent count grows but nothing gets done. Prevention: max iterations, timeouts.

Context pollution: agents get confused because handoff formats are unclear or memory is cluttered. Prevention: clear, structured handoff formats.

Coordinator bottleneck: workers finish but sit idle waiting for the coordinator. Prevention: increase parallelism or decompose the coordinator's job.

Duplicate work: multiple agents produce the same output because they didn't check what others were doing. Prevention: memory check before starting work.

Conflicting decisions: agents make incompatible choices because they worked in parallel without coordination. Prevention: conflict detection in memory writes, arbitration rules.

Debugging multi-agent systems is harder than single agents. Test each agent in isolation first. Add agents incrementally. Log everything. Use deterministic inputs for reproduction."

---

## Module 3.6: Q&A (13 min)

### Slide 75: Q&A Topics
**Visual:** Discussion prompts

```
Open Q&A

Architecture Selection:
• "What pattern would you use for [specific task]?"
• "How do you handle [edge case]?"

Implementation:
• "How do you test multi-agent systems?"
• "What's the learning curve?"

Production Readiness:
• "Is this ready for enterprise use?"
• "How do you handle failures in production?"
```

**Script:**
"Let's open it up for questions. I'll start with some common topics, then take questions from the chat.

Architecture selection—feel free to throw specific tasks at me and we can discuss which pattern fits.

Implementation—testing multi-agent systems, learning curves, practical challenges.

Production readiness—where are we in the maturity curve, what's ready for enterprise use, what's still experimental.

What questions do you have?"

[Pause for Q&A. Address questions from the audience. If Q&A is slow, use prepared questions from instructor notes to keep discussion flowing.]

---

## Module 3.7: Course Wrap-Up (5 min)

### Slide 76: Thank You & Key Takeaway
**Visual:** Combined closing slide

```
Thank You!

┌─────────────────────────────────────────────────────────┐
│  "The frameworks will evolve. The patterns endure."     │
│                                                         │
│  Choose based on the problem, not the hype.             │
└─────────────────────────────────────────────────────────┘

Next Steps:
1. Run the demos in your environment
2. Pick ONE pattern, apply it to a real task
3. Start simple, add complexity only when needed

Resources:
• docs.anthropic.com/claude-code
• github.com/ruvnet/claude-flow/wiki
• modelcontextprotocol.io
• agentics.org

Please complete the course evaluation.
```

**Script:**
"That brings us to the end. Thank you for spending these three hours with me.

If you take one thing away: the frameworks will evolve, but the patterns endure. Claude-flow might be replaced next year. The tools will change. But understanding when to use hierarchical versus swarm, when to predefine versus let emerge—that skill transfers.

Choose based on the problem, not the hype. Use structure when you need predictability. Use emergence when you need adaptability. Often, you'll use both.

Your next steps: run the demos yourself, pick one pattern and apply it to a real task, start simple. Resources are on screen and in the chat.

Please complete the course evaluation—your feedback shapes future sessions. Good luck building your multi-agent systems."

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Start Section 3 (Slide 54)
- 0:05 - Finish intro, begin emergent overview (Slide 58)
- 0:10 - Finish overview, begin demo walkthrough (Slide 60)
- 0:20 - Finish demo walkthrough, begin decision framework (Slide 65)
- 0:35 - Finish decision framework, begin best practices (Slide 72)
- 0:42 - Finish best practices, begin Q&A (Slide 75)
- 0:55 - Wrap-up and close (Slide 76)
- 1:00 - Course complete

### Materials Checklist
- [ ] Pre-recorded demo files available (index.html, styles.css, app.js, tests/, README.md)
- [ ] Memory trail log ready to show
- [ ] Backup slides for all content
- [ ] Resource links ready to paste in chat
- [ ] Prepared Q&A questions for slow periods

### Prepared Q&A Questions (If Audience is Quiet)

**"What pattern would you use for automated documentation generation?"**
> Pipeline if the input is known (code → analysis → docs). Hierarchical if you need to decompose a large codebase. Committee if you want multiple perspectives on completeness.

**"How do you test multi-agent systems?"**
> Unit test each agent in isolation. Integration test the handoffs. Use deterministic inputs for reproducibility. Mock external dependencies. Test failure modes explicitly.

**"What's the biggest mistake people make with swarms?"**
> Using them for well-defined problems. If you know the workflow, don't pay the emergence tax. Swarms shine for exploration, not execution.

**"How do you debug when something goes wrong?"**
> Comprehensive logging is essential. Log every memory write, every agent decision. Replay from logs. Test each agent in isolation to find the broken one.

### If Time Runs Short
- Cut Q&A to 5 minutes
- Skip optional live demo
- Keep wrap-up—closure matters for learning retention

### If Time Runs Long
- Extend Q&A
- Try live demo
- Discuss specific audience use cases in detail
- Deeper dive on hybrid approaches

### Common Questions and Answers

**"Is claude-flow production-ready?"**
> It's alpha software being used in real projects. Production use requires monitoring, cost controls, and understanding the risks. Start with non-critical workflows.

**"Can I use these patterns with other models?"**
> Yes. The patterns transfer to other frameworks and models. Hierarchical, debate, committee, swarm—these are architectural patterns, not Claude-specific features.

**"What's the cost of running a swarm?"**
> Highly variable. 5-50x a single agent depending on complexity and agent count. Always set limits and monitor.

**"Which pattern should I start with?"**
> Hierarchical. It's the most intuitive (manager + workers) and teaches coordination fundamentals. Then try Committee for parallel perspectives.

**"Where does human-in-the-loop fit?"**
> Anywhere you need it. Approval gates in pipelines, arbitration in debates, review stages in hierarchical systems. Design explicit checkpoints rather than hoping agents ask for help.
