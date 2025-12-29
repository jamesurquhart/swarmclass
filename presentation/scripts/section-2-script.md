# Section 2: Script and Slides

**Duration:** 60 minutes
**Focus:** Structured, orchestrated multi-agent systems using Anthropic's agent capabilities

---

## 2.1 Introduction and Demo 1 Results (5 min)

### SLIDE 28: Section 2 Title
**Visual:** Section title with key themes
```
Section 2: Creating Advanced Multi-Agent Systems

From sequential to parallel
From simple handoffs to structured coordination
From single patterns to hybrids
```

**Script:**
> Welcome back. In Section 1, we covered the conceptual foundation—six architectural patterns, terminology, and a simple sequential pipeline.
>
> Now we go deeper. This section is about structured, orchestrated multi-agent systems. We'll implement real patterns, understand the trade-offs, and build a system that combines multiple patterns together.

---

### SLIDE 29: Demo 1 Results
**Visual:** Two-column showing research-notes.md and briefing.md
```
Demo 1 Results: Sequential Pipeline

research-notes.md          briefing.md
─────────────────          ────────────
• Key Facts: ...           Executive Briefing:
• Context: ...             Quantum Computing for
• Sources: ...             Business Applications
• Gaps: ...                ...

Three agents • File-based handoff • Sequential execution
```

**Script:**
> Let's quickly look at what our Demo 1 pipeline produced.
>
> *[Show research-notes.md]* The researcher agent created structured notes—key facts, context, sources, and gaps. Exactly the format we specified.
>
> *[Show briefing.md]* The writer agent transformed those notes into polished prose. Different voice, different structure, but built entirely on the researcher's output.
>
> Three agents worked together: the main orchestrator, the researcher, and the writer. The handoff was a file. Execution was sequential—researcher finished, then writer started.
>
> This was effective, but limited. What if we want parallel execution? What if we want agents to disagree and resolve conflicts? That's where we're going now.

---

### SLIDE 30: Section 2 Overview
**Visual:** Key topics as bullet points
```
In this section, you will learn:

• How Claude Code's Task tool spawns and
  manages subagents

• Four structured orchestration patterns:
  Hierarchical, Debate, Committee, and Routing

• How to define agents with specific tools
  and focused responsibilities

• Hands-on: Build a multi-agent code review
  system combining multiple patterns
```

**Script:**
> Here's what we're covering in this section.
>
> First, we'll go deep on Anthropic's agent support—how the Task tool actually works, how to define custom agents, and how tool restrictions enforce specialization.
>
> Then we'll explore four orchestration patterns: Hierarchical for manager-worker relationships, Debate for adversarial review, Committee for parallel perspectives, and Routing for directing queries to specialists.
>
> And we'll build something real—a multi-agent code review system with security, performance, and maintainability reviewers working together.
>
> Let's get into it.

---

## 2.2 Anthropic's Agent Support in Depth (10-12 min)

### SLIDE 31: The Task Tool
**Visual:** Diagram showing Task tool spawning subagents
```
The Task Tool: Spawning Subagents

[Main Agent]
     │
     │ Task(prompt, agent)
     ▼
[Subagent]  ←── Isolated context
     │          Own tool access
     │          Focused execution
     │
     │ returns result
     ▼
[Main Agent]
```

**Script:**
> Let's start with the Task tool—Claude Code's built-in mechanism for spawning subagents.
>
> When the main agent calls Task, it spawns a subagent that runs in complete isolation. That subagent has its own context window—it doesn't see the main agent's conversation history. It has its own tool access, defined by the agent configuration.
>
> The subagent executes, does its work, and returns a result to the main agent. The main agent can then use that result, spawn another subagent, or continue working.
>
> This is what we used in Demo 1. The main agent spawned a researcher, got results, then spawned a writer.

---

### SLIDE 32: Agent Definitions
**Visual:** Agent file structure with annotations
```
Agent Definitions: .claude/agents/*.md

┌─────────────────────────────────────────┐
│ ---                                     │
│ name: researcher                        │ ← Identity
│ description: Use this agent to research │ ← When to invoke
│   topics and gather information...      │
│ tools: Read, Grep, Glob, WebSearch      │ ← Capabilities
│ ---                                     │
│                                         │
│ You are a Research Specialist.          │ ← System prompt
│ Your role is to:                        │
│ 1. Search for relevant information      │
│ 2. Identify key facts and statistics    │
│ ...                                     │
└─────────────────────────────────────────┘
```

**Script:**
> Agents are defined as markdown files in `.claude/agents/`.
>
> The YAML frontmatter has three key fields. Name identifies the agent. Description tells Claude when to use this agent—Claude reads these descriptions to decide which agent fits a task. Tools defines what this agent can do.
>
> The body is the system prompt. This shapes the agent's behavior, output format, and focus areas.
>
> The description field is important. Claude uses it for routing. If you say "research this topic," Claude looks at agent descriptions and picks the one that mentions research.

---

### SLIDE 33: Common Agent Types
**Visual:** Table of agent types
```
Common Agent Types

Type        Purpose                  Typical Tools
──────────────────────────────────────────────────────
Researcher  Gather information       WebSearch, WebFetch,
                                     Read, Grep, Glob

Writer      Produce content          Read, Write, Edit

Reviewer    Analyze and critique     Read, Grep, Glob

Planner     Decompose tasks          Read, Glob (minimal)

Executor    Take actions             Bash, Write, Edit
```

**Script:**
> Here are the most common agent types you'll create.
>
> **Researchers** gather information. They get web tools and file reading, but typically no write access—they report what they find, they don't modify things.
>
> **Writers** produce content. They can read inputs and write outputs, but often no web access—you don't want them wandering off to research when they should be writing.
>
> **Reviewers** analyze and critique. Read-only access. They examine, they don't change.
>
> **Planners** decompose tasks. Minimal tools—they think and structure, they don't execute.
>
> **Executors** take actions. They get powerful tools like Bash, but you use them carefully.
>
> You'll also create domain-specific agents: Security Analysts, Data Analysts, Test Writers. Same principles apply.

---

### SLIDE 34: Tool Access Patterns
**Visual:** Tool restriction patterns with rationale
```
Tool Access Patterns

Pattern       Tools                    Use Case
─────────────────────────────────────────────────────
Read-Only     Read, Grep, Glob         Analysis, review

Read + Web    Read, Grep, Glob,        Research
              WebSearch, WebFetch

Read + Write  Read, Write, Edit        Content creation

Full Access   All tools                Trusted executors

No Bash       Everything except Bash   Sandboxed agents
```

**Script:**
> Tool restrictions enforce specialization and safety.
>
> **Read-Only** for agents that analyze but shouldn't modify. Your reviewers, your analyzers.
>
> **Read plus Web** for researchers who need to gather external information.
>
> **Read plus Write** for content creators who transform inputs into outputs.
>
> **Full Access** only for trusted executors—and even then, be careful.
>
> **No Bash** is common for agents that need most capabilities but shouldn't run arbitrary commands.
>
> The principle: start minimal, add tools only when needed. Ask yourself: "What's the worst this agent could do with this tool?"

---

### SLIDE 35: Enterprise Data Access
**Visual:** Two-column showing tool-based and non-tool methods
```
Enterprise Data Access

Tool-Based                    Non-Tool Methods
────────────────────────      ────────────────────────
MCP Servers                   Context Injection
→ Databases, Slack,           → Data loaded into prompt
  GitHub, Salesforce            before agent runs

Bash + CLI                    File Staging
→ AWS CLI, kubectl,           → ETL prepares files
  internal scripts              agents will read

WebFetch                      RAG Retrieval
→ Internal REST APIs          → Orchestrator retrieves,
                                passes to agent
```

**Script:**
> In enterprise settings, agents need access to databases, internal APIs, and document stores.
>
> **Tool-based approaches**: MCP servers are the cleanest—there are servers for Postgres, MySQL, Slack, GitHub, Salesforce, and dozens more. For internal systems, Bash can run CLI tools. WebFetch can hit REST endpoints.
>
> **Non-tool approaches**: For small datasets, inject data directly into the prompt. For large datasets, have an ETL process stage files that agents read. For knowledge bases, use RAG at the orchestrator level and pass relevant context to agents.
>
> **Security matters here**. Credentials should come from environment variables or secrets managers. Define which agents can access which systems. Log what data agents accessed for audit trails.

---

### SLIDE 36: Real-World Applications
**Visual:** Two example pipelines
```
Real-World: Content Pipeline
[Input] → [Researcher] → [Drafter] → [Editor] → [Output]
              │              │           │
          Web tools     Read/Write   Read/Edit

Real-World: Customer Analysis Pipeline
[Query] → [Data Agent] → [Analyzer] → [Reporter] → [Output]
               │              │            │
           MCP:Postgres    Read-only   Read/Write
           (read-only)

Key principles:
• Each agent gets only the tools it needs
• Database access via MCP with minimal permissions
• Failures isolated to single stage
```

**Script:**
> Two real-world examples showing how tool restrictions work in practice.
>
> First, a content pipeline. Researcher has web tools but can't modify files. Drafter can read and write. Editor can refine but not research. Each stage is isolated.
>
> Second, a customer analysis pipeline. The Data Agent connects to Postgres via MCP—but with read-only access. It can't modify production data. The Analyzer processes the data but can't access the database directly. The Reporter writes the final output.
>
> Notice the pattern: database access happens through MCP with minimal permissions. The agent that queries data isn't the same agent that writes reports. Separation of concerns, enforced by tool restrictions.

---

## 2.3 Deep Dive: Hierarchical Pattern (8 min)

### SLIDE 37: Hierarchical Pattern
**Visual:** Tree diagram with detailed annotations
```
Hierarchical Pattern: Manager-Worker

              [Coordinator]
             ↙      ↓      ↘
      [Worker A] [Worker B] [Worker C]
          ↓          ↓          ↓
       result     result     result
             ↘      ↓      ↙
              [Coordinator]
                   ↓
               [Output]

• Top-down task assignment
• Bottom-up results
• No lateral communication
• Coordinator synthesizes
```

**Script:**
> The Hierarchical pattern—also called Manager-Worker.
>
> A coordinator agent receives a complex task. It decomposes that task into subtasks and delegates to specialized workers. Each worker executes independently and returns results. The coordinator synthesizes everything into a unified output.
>
> Communication flows two directions: top-down for task assignment, bottom-up for results. Workers never talk to each other directly—all coordination goes through the manager.
>
> Think of a tech lead breaking a feature into tickets for different developers, then integrating their pull requests.

---

### SLIDE 38: Hierarchical Implementation
**Visual:** Prompt patterns for coordinator and worker
```
Coordinator Prompt Pattern:
┌─────────────────────────────────────────────────┐
│ You are a [Domain] Coordinator. Your role is:   │
│ 1. Analyze the incoming task                    │
│ 2. Break it into subtasks for specialists       │
│ 3. Delegate to: [Worker A], [Worker B], [C]     │
│ 4. Synthesize outputs into unified result       │
│ 5. Resolve any conflicts between workers        │
└─────────────────────────────────────────────────┘

Worker Prompt Pattern:
┌─────────────────────────────────────────────────┐
│ You are a [Specialty] specialist. Your role is: │
│ 1. Focus ONLY on [specific aspect]              │
│ 2. Analyze the provided [input type]            │
│ 3. Produce a [structured output format]         │
│                                                 │
│ Do not address concerns outside your specialty. │
│ Flag items needing other specialists.           │
└─────────────────────────────────────────────────┘
```

**Script:**
> Here's how to implement it.
>
> The **coordinator prompt** needs five elements: analyze the task, decompose it, delegate to specific workers, synthesize results, and resolve conflicts. That last part is crucial—workers will sometimes disagree or produce incompatible outputs.
>
> The **worker prompt** enforces focus. "Focus ONLY on this aspect." "Do not address concerns outside your specialty." Workers should flag things for other specialists rather than trying to handle everything.
>
> The structured output format matters. If workers produce inconsistent formats, the coordinator can't synthesize effectively.

---

### SLIDE 39: Hierarchical Use Cases
**Visual:** Three real-world examples
```
Hierarchical Use Cases

Software Development          Document Processing
────────────────────          ───────────────────
Tech Lead Coordinator         Intake Coordinator
    ↓                             ↓
Frontend │ Backend │ DB       Classify │ Extract │ Validate
    ↓                             ↓
Integrated Feature            Structured Data


Customer Support
────────────────
Triage Coordinator
    ↓
Billing │ Technical │ Account
    ↓
Resolution + Follow-up
```

**Script:**
> Three real-world applications.
>
> **Software development**: A tech lead agent receives a feature request, breaks it into frontend, backend, and database tasks, assigns to specialist workers, then integrates their outputs.
>
> **Document processing**: An intake coordinator receives documents, dispatches to classifiers, extractors, and validators, then assembles structured data.
>
> **Customer support**: A triage coordinator receives tickets, routes to billing, technical, or account specialists, then ensures resolution and follow-up.
>
> The pattern works whenever tasks can be cleanly decomposed and workers don't need to coordinate with each other directly.

---

### SLIDE 40: When to Use Hierarchical
**Visual:** Use/don't use comparison
```
When to Use Hierarchical

✓ USE WHEN                      ✗ AVOID WHEN
─────────────────────────       ─────────────────────────
Task decomposes cleanly         Workers need to collaborate
Workers are independent         Decomposition unclear upfront
Clear success criteria          Manager would bottleneck
Need centralized oversight      Need real-time adaptation
Want audit trail                Problem is too dynamic
```

**Script:**
> **Use Hierarchical when**: the task decomposes cleanly into independent pieces, you have clear success criteria for each piece, you need centralized oversight, you want an audit trail of who decided what.
>
> **Avoid Hierarchical when**: workers need to collaborate directly—the manager becomes a bottleneck. When decomposition isn't obvious upfront—you can't assign tasks you can't define. When the problem is too dynamic—rigid hierarchies can't adapt quickly.
>
> For problems that don't decompose cleanly, you'll want the emergent patterns we cover in Section 3.

---

## 2.4 Demo 2 Setup: Code Review System Part 1 (8 min)

### SLIDE 41: Demo 2 Architecture
**Visual:** Code review system architecture
```
Demo 2: Multi-Agent Code Review

              [Coordinator]
             ╱      │      ╲
    [Security]  [Performance]  [Maintainability]
         │          │              │
      review     review         review
         ╲          │          ╱
          ╲         │         ╱
           [Coordinator Synthesis]
                    │
            [Final Report]

Patterns: Hierarchical + Committee + Debate
```

**Script:**
> Now let's build something. We're creating a multi-agent code review system.
>
> Three specialized reviewers—Security, Performance, and Maintainability—run in parallel. Each analyzes the same code from their perspective. A coordinator synthesizes their reviews into a final report, surfacing agreements and conflicts.
>
> This combines three patterns. Hierarchical—the coordinator manages workers. Committee—parallel independent analysis. Debate—when reviewers disagree, we surface and resolve tensions.

---

*[Switch to screen share]*

### SCREEN: Project Setup
**Script:**
> Let me set up the project.

```bash
mkdir demo-code-review
cd demo-code-review
npm init -y
```

> We'll create a Node.js project that orchestrates our reviewers.

---

### SCREEN: Reviewer Configurations
**Script:**
> Here are our three reviewers.

*[Show Security Reviewer prompt]*

> The Security Reviewer looks for vulnerabilities: input validation, authentication issues, data exposure, injection attacks, hardcoded secrets. It rates severity and provides specific remediation.

*[Show Performance Reviewer prompt]*

> The Performance Reviewer focuses on efficiency: algorithmic complexity, memory usage, unnecessary queries, missing caching, blocking operations. It estimates impact and suggests optimizations.

*[Show Maintainability Reviewer prompt]*

> The Maintainability Reviewer examines code health: clarity, naming, complexity, test coverage, documentation. Long-term code quality.

> Each reviewer has a different lens. That's the point—a single reviewer would miss things.

---

### SCREEN: Sample Code
**Script:**
> Here's the code they'll review. I've included some intentional issues.

*[Show sample.js]*

```javascript
function authenticateUser(username, password) {
  const query = "SELECT * FROM users WHERE username='" +
    username + "' AND password='" + password + "'";
  // ... SQL injection vulnerability

  const connection = mysql.createConnection({
    password: 'admin123',  // Hardcoded credential
    // ...
  });
```

> SQL injection—string concatenation in a query. Hardcoded database password. There's also an N+1 query pattern and some synchronous blocking.
>
> Different reviewers should catch different issues. Security will flag the injection. Performance will catch the N+1. Let's see what happens.
>
> But first—before we run this—let's talk about what happens when reviewers disagree.

---

## 2.5 Deep Dive: Debate Pattern (7 min)

### SLIDE 42: Debate Pattern
**Visual:** Debate architecture with annotations
```
Debate Pattern: Structured Disagreement

[Proposer] ←─────→ [Critic]
     │     argue      │
     │                │
     ▼                ▼
      [Judge/Arbiter]
            │
            ▼
    [Final Decision]

• Proposer makes claims
• Critic challenges them
• Judge evaluates arguments
• Creates auditable reasoning
```

**Script:**
> The Debate pattern embraces conflict as a feature, not a bug.
>
> A Proposer agent generates a solution or analysis. A Critic agent actively seeks flaws—not just nitpicking, but substantive challenges. A Judge evaluates the arguments and synthesizes a final decision.
>
> Why do this? Single agents are overconfident. They make claims without sufficient scrutiny. Adversarial testing catches errors. And you get an audit trail—you can see why decisions were made.
>
> In our code review, reviewers might disagree. Security says "reject this code." Maintainability says "it's fine with minor fixes." The coordinator has to surface and resolve that tension.

---

### SLIDE 43: Implementing Debate
**Visual:** Critic and disagreement handling prompts
```
Critic Prompt Pattern:
┌─────────────────────────────────────────────────┐
│ You are a Critical Reviewer. Your role is:      │
│ 1. Examine the provided [proposal/analysis]     │
│ 2. Identify weaknesses, gaps, potential errors  │
│ 3. Raise specific counterarguments with evidence│
│ 4. Challenge unjustified assumptions            │
│                                                 │
│ Be substantive, not contrarian.                 │
│ If something is solid, acknowledge it.          │
└─────────────────────────────────────────────────┘

Disagreement Resolution:
┌─────────────────────────────────────────────────┐
│ When reviewers disagree:                        │
│ 1. State both positions clearly                 │
│ 2. Identify root cause: factual? methodological?│
│    values-based?                                │
│ 3. Factual → gather more evidence               │
│ 4. Methodological → explain trade-offs          │
│ 5. Values-based → escalate to human             │
└─────────────────────────────────────────────────┘
```

**Script:**
> The Critic prompt needs careful design. "Be substantive, not contrarian"—you want real challenges, not just finding something to complain about. "If something is solid, acknowledge it"—the critic should agree when agreement is warranted.
>
> Disagreement resolution is the key skill for coordinators. First, state both positions clearly. Then classify the disagreement. Is it factual—we need more data? Methodological—different approaches with trade-offs? Or values-based—fundamentally different priorities?
>
> Factual disagreements can be resolved with evidence. Methodological disagreements need trade-off analysis. Values-based disagreements often need human judgment.

---

### SLIDE 44: Debate Use Cases
**Visual:** Three application areas
```
Debate Use Cases

High-Stakes Decisions         Code Review
─────────────────────         ───────────
Medical diagnosis             Security vs Performance
Legal contract review         Maintainability vs Speed
Investment analysis           Short-term vs Long-term
(bull vs bear case)           trade-offs


Content Moderation
──────────────────
Flagger vs Defender
Reduces false positives AND false negatives
```

**Script:**
> Where does Debate shine?
>
> **High-stakes decisions**. Medical diagnosis—one agent proposes, another challenges. Legal review—argue both sides. Investment analysis—bull case versus bear case agents force consideration of both perspectives.
>
> **Code review**—our demo. Security might conflict with performance. Maintainability might conflict with shipping speed. These tensions are real and valuable to surface.
>
> **Content moderation**. One agent flags content, another defends it. This reduces both false positives—content wrongly removed—and false negatives—harmful content that slips through.
>
> Use Debate when decisions have significant consequences and overconfidence is dangerous.

---

## 2.6 Demo 2: Complete and Run (10 min)

*[Return to screen share]*

### SCREEN: Coordinator Code
**Script:**
> Now let's add the coordinator that ties everything together.

*[Show coordinator synthesis code]*

```javascript
const synthesis = await query({
  prompt: `You are a Code Review Coordinator.
Synthesize these three specialized reviews:

SECURITY REVIEW:
${reviews.security}

PERFORMANCE REVIEW:
${reviews.performance}

MAINTAINABILITY REVIEW:
${reviews.maintainability}

Create a unified report that:
1. Highlights consensus issues (multiple reviewers)
2. Flags contradictions between reviewers
3. Prioritizes the top 5 issues to address
4. Provides overall code health score (A-F)`,
});
```

> The coordinator receives all three reviews and synthesizes them. It identifies consensus—issues multiple reviewers flagged. It surfaces contradictions—where reviewers disagree. It prioritizes—what should be fixed first? And it scores overall code health.

---

### SCREEN: Run the Demo
**Script:**
> Let's run it.

```bash
node review-system.js sample.js
```

> Watch the output. You'll see all three reviewers start simultaneously—that's the Committee pattern, parallel execution.

*[Point to terminal output as reviewers complete]*

> Security Reviewer starting... Performance Reviewer starting... Maintainability Reviewer starting...
>
> They're running in parallel. Each is analyzing the same code from their specialized perspective.
>
> Security Reviewer complete. There's the SQL injection finding.
>
> Performance Reviewer complete. It caught the N+1 query pattern.
>
> Now the coordinator is synthesizing...

---

### SCREEN: Demo Running Discussion
**Script:**
> While the coordinator works, notice what's happening.
>
> Each reviewer stayed in their lane. Security didn't comment on code style. Maintainability didn't try to find vulnerabilities. Specialization working as intended.
>
> The parallel execution meant wall-clock time is roughly the time of the slowest reviewer, not the sum of all three. Committee pattern efficiency.
>
> Now we'll see if they disagreed on anything, and how the coordinator handles it.

---

## 2.7 Deep Dive: Committee Pattern (5 min)

### SLIDE 45: Committee Pattern
**Visual:** Committee architecture with annotations
```
Committee Pattern: Parallel Independence

[Input] ──→ [Agent 1] ──→
       ──→ [Agent 2] ──→ [Aggregator] ──→ [Output]
       ──→ [Agent 3] ──→

• Same input fans out to all agents
• Independent execution (agents don't see each other's work)
• Aggregator combines all results
• Diverse perspectives catch what individuals miss
```

**Script:**
> The Committee pattern—multiple agents processing the same input independently, then aggregating results.
>
> Four key features. First, the same input fans out to all agents—they're all looking at the same thing. Second, execution is independent—no agent sees what others are doing. Third, an aggregator combines results at the end. Fourth, diverse perspectives catch what any single agent would miss.
>
> Our code review demo is actually a hybrid. The parallel reviewers are a Committee. But we added Hierarchical control for the coordinator and Debate for surfacing disagreements.

---

### SLIDE 45a: Aggregation Strategies
**Visual:** Aggregation strategies table
```
How do you combine committee results?

Strategy            Use When
─────────────────────────────────────────────────
Majority Vote       Classification (spam or not?)
Average             Numeric outputs, scoring
Unanimous           Safety-critical decisions
Synthesis           Complex outputs (our demo)
Confidence-Weight   Agents have varying expertise
```

**Script:**
> How you aggregate matters as much as what you aggregate.
>
> **Majority vote** for classification—three agents say spam, two say not spam, it's spam. **Averaging** for numeric outputs like scores or ratings. **Unanimous agreement** for safety-critical decisions—all agents must agree before proceeding. **Synthesis** for complex outputs where you can't just vote—our code review uses this. **Confidence-weighted** when some agents have more expertise than others.
>
> The key principle: diversity must be genuine. Running the same prompt three times doesn't help. Different perspectives, different prompts, different focus areas.

---

### SLIDE 46: Committee Implementation
**Visual:** Committee prompt and use cases
```
Committee Prompt Pattern:
┌─────────────────────────────────────────────────┐
│ You are one of several independent reviewers.   │
│ Analyze the input and provide your assessment.  │
│                                                 │
│ Do NOT try to guess what others will say.       │
│ Your unique perspective is valuable precisely   │
│ because it's independent.                       │
└─────────────────────────────────────────────────┘

Use Cases:
• Reliability-critical: Multiple agents verify calculations
• Diverse expertise: Legal + Technical + Business review
• Reducing bias: Different prompts, different perspectives
```

**Script:**
> The Committee prompt emphasizes independence. "Do NOT try to guess what other reviewers will say." You want genuine diversity, not convergence.
>
> **Reliability-critical systems** use committees to verify calculations. Financial reconciliation, safety systems—multiple agents must agree.
>
> **Diverse expertise** combines different lenses. Legal, technical, and business reviewers each catch different issues.
>
> **Reducing bias** through variety. Different model configurations, different prompting strategies, different training data. The diversity is the value.

---

## 2.8 Brief: Dynamic Routing (5 min)

### SLIDE 47: Dynamic Routing
**Visual:** Router dispatching to specialists
```
Dynamic Routing: Smart Dispatch

              [Router]
           ╱     │     ╲
     [Code]   [Data]   [Writing]
     Agent    Agent     Agent

Router classifies → dispatches to specialist
Not every query hits every agent
Efficiency through intelligent matching
```

**Script:**
> Dynamic Routing is Hierarchical with smart dispatch.
>
> A router agent analyzes incoming requests and sends them to the appropriate specialist. Code questions go to the code agent. Data questions go to the data agent. Not every query hits every agent—that's the efficiency gain.
>
> Think hospital triage. Not everyone sees every specialist. The system routes based on need.

---

### SLIDE 48: Routing Implementation
**Visual:** Router prompt and strategies
```
Router Prompt Pattern:
┌─────────────────────────────────────────────────┐
│ You are a Query Router. Route requests to:      │
│ - CodeAgent: Programming, debugging, review     │
│ - DataAgent: Analysis, SQL, statistics          │
│ - WritingAgent: Documentation, emails, content  │
│                                                 │
│ Classify by primary intent.                     │
│ Output: {"route": "agent", "confidence": 0.0-1} │
└─────────────────────────────────────────────────┘

Routing Strategies:
─────────────────────────────────────────────────
Keyword-based    Fast but brittle
LLM Classification  Flexible but adds latency
Embedding Similarity  Good balance
Hybrid (rules → LLM)  Best of both
```

**Script:**
> The router prompt defines the specialist categories and outputs a routing decision with confidence.
>
> **Implementation strategies** range from simple to sophisticated. Keyword matching is fast but breaks on edge cases. LLM classification is flexible but adds latency. Embedding similarity—comparing the query to example queries—offers a good balance. Hybrid approaches use fast rules first, falling back to LLM for ambiguous cases.
>
> Use Dynamic Routing when you have heterogeneous query types, clear specialist boundaries, and want to minimize unnecessary computation.

---

## 2.9 Demo 2 Results and Discussion (5 min)

*[Return to screen share if needed]*

### SCREEN: Final Report
**Script:**
> Let's look at what the coordinator produced.

*[Walk through the final report]*

> **Consensus issues**—things multiple reviewers flagged. The SQL injection appeared in both Security and Maintainability reviews. That's high confidence—fix it first.
>
> **Conflicts surfaced**. Security said this code should not be deployed. Performance said the N+1 query is the critical issue. The coordinator noted the tension and prioritized security over performance—you can optimize a secure system, but you can't secure a compromised one.
>
> **Prioritized action items**. SQL injection fix first, credential removal second, N+1 query third. Clear ordering for the developer.
>
> **Code health score**: D. Multiple critical issues. The score gives a quick summary; the details explain why.

---

### SLIDE 49: Patterns in Action
**Visual:** Three patterns mapped to demo behavior
```
Demo 2: Patterns in Action

Hierarchical                  Debate
────────────                  ──────
Coordinator managed flow      Disagreements surfaced
Workers stayed in lanes       Trade-offs made explicit
Synthesis created unity       Audit trail preserved


Committee
─────────
Parallel execution (3x faster)
Independent perspectives
No single reviewer found everything
```

**Script:**
> Let's map what we saw to patterns.
>
> **Hierarchical in action**: The coordinator managed the entire flow. Workers stayed in their lanes—Security didn't comment on naming conventions. Synthesis created a unified output from three separate reviews.
>
> **Debate in action**: Disagreements were surfaced, not hidden. The coordinator made explicit trade-off decisions—security over performance. We have an audit trail showing the reasoning.
>
> **Committee in action**: Parallel execution made this three times faster than sequential. Independent perspectives caught different issues. No single reviewer found everything—Security missed the N+1, Performance missed the SQL injection.

---

### SLIDE 50: Applying These Patterns
**Visual:** Pattern applications beyond code review
```
Apply These Patterns To:

Architecture Review           Document Review
───────────────────          ───────────────
Security + Scalability       Legal + Compliance
+ Cost reviewers             + Business reviewers

Interview Evaluation         Risk Assessment
────────────────────         ───────────────
Technical + Culture          Financial + Operational
+ Role-fit reviewers         + Reputational reviewers

Any situation requiring:
• Multiple perspectives
• Structured synthesis
• Explicit trade-off decisions
```

**Script:**
> These patterns work beyond code review.
>
> **Architecture review**: Security, scalability, and cost reviewers evaluate designs. Different concerns, structured synthesis.
>
> **Document review**: Legal, compliance, and business perspectives on contracts or policies.
>
> **Interview evaluation**: Multiple interviewers with different focuses—technical skills, culture fit, role-specific knowledge.
>
> **Risk assessment**: Financial, operational, and reputational risk analysts providing independent evaluations.
>
> Anywhere you want multiple perspectives with structured synthesis and explicit trade-off decisions, these patterns apply.

---

## 2.10 Wrap-Up and Section 3 Preview (5 min)

### SLIDE 51: Section 2 Recap
**Visual:** Checklist of covered topics
```
Section 2: What We Covered

✓ Anthropic's agent support
  Task tool, definitions, tool patterns, enterprise data access

✓ Hierarchical Pattern
  Coordinator + Workers, top-down control, use cases

✓ Debate Pattern
  Structured disagreement, conflict resolution

✓ Committee Pattern
  Parallel independence, aggregation strategies

✓ Dynamic Routing
  Smart dispatch to specialists

✓ Demo: Multi-agent code review
  All patterns combined in one system
```

**Script:**
> Let's recap Section 2.
>
> We went deep on Anthropic's agent support—the Task tool, agent definitions, tool access patterns, enterprise data access options.
>
> We covered four patterns with implementation guidance. Hierarchical for top-down coordination. Debate for structured disagreement. Committee for parallel independence. Dynamic Routing for smart dispatch.
>
> And we built a real system—multi-agent code review combining all these patterns. Parallel reviewers, disagreement surfacing, coordinator synthesis.

---

### SLIDE 52: The Limitation
**Visual:** Structured vs. emergent comparison
```
The Limitation We Hit

Everything in Section 2 was STRUCTURED:

• We defined the agents
• We defined the workflow
• We defined the handoffs
• The coordinator was in charge

But what if...
• We can't predefine the workflow?
• The task is too complex to decompose upfront?
• We want agents to figure out coordination themselves?
```

**Script:**
> Everything we built today was **structured**. We defined the agents, the workflow, the handoffs. The coordinator was in charge. We knew in advance what would happen.
>
> But some problems don't work that way. What if you can't predefine the workflow? What if the task is too complex to decompose upfront? What if you want agents to discover how to work together rather than being told?
>
> That's the difference between orchestration and emergence. Section 2 was orchestration. Section 3 is emergence.

---

### SLIDE 53: Section 3 Preview
**Visual:** Section 3 topics with swarm visual
```
Section 3: Self-Organizing Systems with claude-flow

[Agent] ←→ [Agent]
   ↕    ╲╱    ↕
   ↕    ╱╲    ↕
[Agent] ←→ [Agent]
      ↕
[Shared Memory]

• Emergent coordination (no predefined workflow)
• Shared memory architecture (SQLite-based)
• Agents discover and build on each other's work
• True swarm behavior
• The Agentics Foundation stack
```

**Script:**
> Section 3: Self-Organizing Systems with claude-flow.
>
> We'll move from structured orchestration to emergent coordination. No predefined workflow. Agents discover how to work together.
>
> Claude-flow uses shared memory—a SQLite database where any agent can write and any agent can read. Agents discover each other's work by querying shared memory. Coordination emerges from these interactions.
>
> This is true swarm behavior. We'll build a self-organizing system and watch agents coordinate without being told how.
>
> We'll also cover the Agentics Foundation stack—the community project behind claude-flow.
>
> Questions before we break?

---

**Script:**
> *[Address Q&A widget questions]*
>
> Great. Five minutes—see you back here at [TIME].

---

## Instructor Notes

### Timing Checkpoints
- 0:00 - Slide 28 (Section 2 Title)
- 0:05 - Slide 31 (Task Tool)
- 0:17 - Slide 37 (Hierarchical Pattern)
- 0:25 - Screen share (Demo 2 Setup)
- 0:33 - Slide 42 (Debate Pattern)
- 0:40 - Screen share (Demo 2 Run)
- 0:50 - Slide 45 (Committee Pattern)
- 0:55 - Slide 47 (Dynamic Routing)
- 0:58 - Slide 51 (Recap)
- 1:00 - Break

### Materials Checklist
- [ ] Pre-prepared reviewer configuration code (3 reviewers)
- [ ] Pre-prepared sample.js with intentional issues
- [ ] Pre-prepared coordinator synthesis code
- [ ] Backup demo output in case of API issues
- [ ] Demo 1 output files (research-notes.md, briefing.md) for callback

### Common Questions

**"Why not just use one agent with a longer prompt?"**
> Context pollution. A single agent trying to be security expert, performance expert, and maintainability expert will be mediocre at all three. Specialized agents with focused context perform better.

**"Isn't running three reviewers expensive?"**
> Yes, but they run in parallel so wall-clock time is similar to one. And for code review, catching a security vulnerability before production is worth the API cost.

**"How do you test multi-agent systems?"**
> Test each agent in isolation first. Then test integration—does the coordinator correctly synthesize? Use deterministic inputs for reproducibility. Log everything for debugging.

**"What if agents get stuck in debate loops?"**
> Set maximum rounds. Have the coordinator decide after N rounds. Escalate to human if stakes are high enough. Build in circuit breakers.

**"How do I choose between Hierarchical and Committee?"**
> Hierarchical when you need centralized control and clear task decomposition. Committee when you want independent perspectives on the same input. Often you'll use both—our demo did.

### If Demo Is Slow
- Continue through Committee and Dynamic Routing slides
- Show pre-run output from backup
- Demo results can be reviewed at start of Section 3

### Slide Count
- Section 2: Slides 28-53 (26 slides)
- Running total: 53 slides
