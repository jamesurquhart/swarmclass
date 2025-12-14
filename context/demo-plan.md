# Multi-Agent AI Demonstrations: Hands-On Workshop Plan

This document provides three progressive demonstrations of multi-agent AI systems, designed to accompany the "Multi-Agent AI: Architectures for Collaborative Intelligence" presentation. Each demonstration increases in complexity while remaining achievable within a workshop setting.

---

## Overview

| Demo | Architecture | Tools | Time Estimate | Difficulty |
|------|--------------|-------|---------------|------------|
| 1: Research & Write | Sequential Pipeline | Claude Code + Subagents | 15-20 min | Beginner |
| 2: Code Review Pipeline | Hierarchical + Debate | Claude Agent SDK | 25-35 min | Intermediate |
| 3: Self-Organizing Swarm | Collaborative Network | Claude Flow | 20-30 min | Intermediate |

### Prerequisites (All Demos)

Before starting any demonstration, ensure you have:

- **Node.js 18+** installed (`node --version`)
- **Claude Code** installed globally (`npm install -g @anthropic-ai/claude-code`)
- **Anthropic API key** set in your environment (`export ANTHROPIC_API_KEY=sk-ant-...`)
- A **Claude Pro, Max, or API subscription** for optimal performance

---

## Demo 1: Research & Write Pipeline

**Architecture:** Sequential Pipeline (Relay)  
**Time:** 15-20 minutes  
**What You'll Build:** A two-agent system where a Researcher agent gathers information and a Writer agent synthesizes it into a document.

### Learning Objectives

- Understand how subagents operate with isolated context windows
- See how agents hand off work in a sequential pipeline
- Observe the efficiency gains from task specialization

### Setup

1. Create a new project directory:

```bash
mkdir demo-research-write
cd demo-research-write
```

2. Initialize Claude Code and create the subagent definitions:

```bash
mkdir -p .claude/agents
```

3. Create the Researcher subagent (`.claude/agents/researcher.md`):

```markdown
---
name: researcher
description: Use this agent to research topics, gather information, and compile findings. Invoke when you need comprehensive background research before writing or analysis.
tools: Read, Grep, Glob, WebFetch, WebSearch
---

You are a Research Specialist. Your role is to:

1. Search for relevant information on the given topic
2. Identify key facts, statistics, and expert opinions
3. Organize findings into a structured research brief
4. Note sources and their credibility

## Output Format
Always structure your findings as:
- **Key Facts**: Bullet points of essential information
- **Context**: Background needed to understand the topic
- **Sources**: Where information was found
- **Gaps**: What information is still missing

Be thorough but focused. Quality over quantity.
```

4. Create the Writer subagent (`.claude/agents/writer.md`):

```markdown
---
name: writer
description: Use this agent to transform research and notes into polished written content. Invoke after research is complete and you need to produce a final document.
tools: Read, Write, Edit
---

You are a Writing Specialist. Your role is to:

1. Review provided research and notes
2. Structure content for the target audience
3. Write clear, engaging prose
4. Ensure logical flow and coherence

## Writing Principles
- Lead with the most important information
- Use concrete examples to illustrate abstract concepts
- Vary sentence length for rhythm
- End sections with transitions or key takeaways

## Output
Produce publication-ready content. Include a brief note about any areas where additional research might strengthen the piece.
```

### Running the Demo

Launch Claude Code and use this prompt to trigger the pipeline:

```
I need a 500-word briefing on "the current state of quantum computing for business applications."

Use the researcher subagent to gather current information about quantum computing business use cases, then use the writer subagent to produce a polished executive briefing.

Work in sequence: complete research first, save findings to research-notes.md, then have the writer transform those notes into the final briefing.md document.
```

### What to Watch For

- **Context isolation**: Notice how each subagent works in its own context window
- **Handoff mechanism**: The research notes file acts as the interface between agents
- **Specialization**: Each agent focuses on its specific task without distraction
- **Output in Task()**: Look for `Task(Performing research...)` in the terminal output

### Variation (3-Agent Pipeline)

Add a third agent for editing/fact-checking:

Create `.claude/agents/editor.md`:

```markdown
---
name: editor
description: Use this agent for final review, fact-checking, and polish of written content before publication.
tools: Read, Write, Edit, WebSearch
---

You are an Editorial Specialist. Review content for:
- Factual accuracy (verify key claims)
- Clarity and readability
- Grammar and style consistency
- Logical flow and structure

Provide specific edits, not general suggestions.
```

Then modify your prompt to include the editing pass.

---

## Demo 2: Code Review Pipeline with Anthropic Tools

**Architecture:** Hierarchical (Manager-Worker) + Debate elements  
**Time:** 25-35 minutes  
**What You'll Build:** A code review system with a coordinator managing specialized reviewers who can flag disagreements.

### Learning Objectives

- Build a multi-agent system using the Claude Agent SDK
- Implement a hierarchical pattern with a coordinator agent
- Add debate elements through parallel review with disagreement surfacing
- See how agents can operate autonomously with tool access

### Setup

1. Create project and initialize:

```bash
mkdir demo-code-review
cd demo-code-review
npm init -y
npm install @anthropic-ai/claude-agent-sdk
```

2. Create the main orchestrator (`review-system.js`):

```javascript
import { query, ClaudeAgentOptions } from '@anthropic-ai/claude-agent-sdk';

// Configuration for different reviewer personas
const REVIEWERS = {
  security: {
    name: "Security Reviewer",
    prompt: `You are a security-focused code reviewer. Analyze code for:
- Input validation vulnerabilities
- Authentication/authorization issues
- Data exposure risks
- Injection vulnerabilities
- Secrets in code

Rate severity: CRITICAL, HIGH, MEDIUM, LOW
Be specific about line numbers and remediation.`
  },
  
  performance: {
    name: "Performance Reviewer", 
    prompt: `You are a performance-focused code reviewer. Analyze code for:
- Algorithmic complexity issues
- Memory leaks or excessive allocation
- Unnecessary database queries
- Missing caching opportunities
- Blocking operations that should be async

Estimate impact: HIGH, MEDIUM, LOW
Suggest specific optimizations.`
  },
  
  maintainability: {
    name: "Maintainability Reviewer",
    prompt: `You are a maintainability-focused code reviewer. Analyze code for:
- Code clarity and readability
- Appropriate naming conventions
- Function/class size and complexity
- Test coverage gaps
- Documentation needs

Focus on long-term code health.`
  }
};

async function runReview(codeFile) {
  console.log(`\n🔍 Starting multi-agent code review of: ${codeFile}\n`);
  
  const reviews = {};
  
  // Run all reviewers in parallel
  const reviewPromises = Object.entries(REVIEWERS).map(async ([type, config]) => {
    console.log(`  ▶ ${config.name} starting...`);
    
    const result = await query({
      prompt: `Review the following code file: ${codeFile}
      
Read the file and provide your specialized review.`,
      systemPrompt: config.prompt,
      options: {
        maxTurns: 5,
        tools: ['Read', 'Grep', 'Glob']
      }
    });
    
    console.log(`  ✓ ${config.name} complete`);
    return { type, review: result };
  });
  
  const results = await Promise.all(reviewPromises);
  results.forEach(r => reviews[r.type] = r.review);
  
  // Coordinator synthesizes reviews
  console.log(`\n📋 Coordinator synthesizing reviews...\n`);
  
  const synthesis = await query({
    prompt: `You are a Code Review Coordinator. Synthesize these three specialized reviews into a final report:

SECURITY REVIEW:
${reviews.security}

PERFORMANCE REVIEW:
${reviews.performance}

MAINTAINABILITY REVIEW:
${reviews.maintainability}

Create a unified report that:
1. Highlights consensus issues (mentioned by multiple reviewers)
2. Flags any contradictions between reviewers
3. Prioritizes the top 5 issues to address
4. Provides an overall code health score (A-F)

Be concise but actionable.`,
    options: { maxTurns: 1 }
  });
  
  console.log("═══════════════════════════════════════");
  console.log("        FINAL CODE REVIEW REPORT        ");
  console.log("═══════════════════════════════════════\n");
  console.log(synthesis);
  
  return synthesis;
}

// Run on a file passed as argument
const targetFile = process.argv[2] || 'sample.js';
runReview(targetFile).catch(console.error);
```

3. Create a sample file to review (`sample.js`):

```javascript
// User authentication handler
const mysql = require('mysql');

function authenticateUser(username, password) {
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myapp'
  });
  
  let result = null;
  connection.query(query, function(err, rows) {
    if (rows.length > 0) {
      result = rows[0];
    }
  });
  
  return result;
}

function getAllUsers() {
  const users = [];
  for (let i = 0; i < 10000; i++) {
    const user = database.getUserById(i);
    if (user) users.push(user);
  }
  return users;
}

module.exports = { authenticateUser, getAllUsers };
```

### Running the Demo

```bash
node review-system.js sample.js
```

### What to Watch For

- **Parallel execution**: All three reviewers run simultaneously
- **Specialization**: Each finds different issues (SQL injection vs N+1 query vs naming)
- **Synthesis**: The coordinator identifies consensus and contradictions
- **Debate element**: When reviewers disagree, the coordinator must resolve

### Interactive Variation

Add this to `review-system.js` to create an interactive debate when reviewers disagree:

```javascript
async function resolveDisagreement(issue, reviews) {
  // Have reviewers defend their positions
  const debate = await query({
    prompt: `Two reviewers disagree about: ${issue}

Reviewer A says: ${reviews.a}
Reviewer B says: ${reviews.b}

Act as a neutral arbiter. Ask each reviewer to defend their position with specific evidence from the code. Then make a final determination.`,
    options: { maxTurns: 3 }
  });
  
  return debate;
}
```

---

## Demo 3: Self-Organizing Swarm with Claude Flow

**Architecture:** Collaborative Network (Society)  
**Time:** 20-30 minutes  
**What You'll Build:** A self-organizing swarm of agents that coordinate to build a simple web application, with real-time visibility into their coordination.

### Learning Objectives

- Deploy a multi-agent swarm using Claude Flow
- Observe emergent coordination between specialized agents
- Use shared memory for agent communication
- Monitor swarm activity in real-time

### Setup

1. Install Claude Flow:

```bash
# Install globally
npm install -g claude-flow@alpha

# Or use npx (recommended)
npx claude-flow@alpha --version
```

2. Create project and initialize:

```bash
mkdir demo-swarm
cd demo-swarm

# Initialize Claude Flow with swarm configuration
npx claude-flow@alpha init --force
```

3. Add Claude Flow as an MCP server to Claude Code:

```bash
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

4. Verify the setup:

```bash
# Check MCP integration
claude mcp list

# Verify swarm tools are available
npx claude-flow@alpha mcp tools list
```

### Running the Demo

**Option A: Command Line Swarm**

Launch a swarm with a single command:

```bash
npx claude-flow@alpha swarm "Build a simple todo list web app with HTML, CSS, and vanilla JavaScript" --claude
```

This will automatically:
- Initialize a mesh topology swarm
- Spawn appropriate agents (architect, frontend developer, tester)
- Coordinate their work through shared memory
- Produce the final output

**Option B: Interactive Swarm with Monitoring**

For better visibility into the swarm's operation:

1. Initialize the swarm manually:

```bash
# Initialize with mesh topology (agents can communicate freely)
npx claude-flow@alpha swarm init --topology mesh --max-agents 6

# Spawn specialized agents
npx claude-flow@alpha swarm spawn architect "System Designer"
npx claude-flow@alpha swarm spawn coder "Frontend Developer"  
npx claude-flow@alpha swarm spawn coder "Backend Developer"
npx claude-flow@alpha swarm spawn tester "QA Engineer"
npx claude-flow@alpha swarm spawn documenter "Documentation Writer"
```

2. Monitor swarm status in a separate terminal:

```bash
# Watch swarm activity in real-time
npx claude-flow@alpha swarm status --watch
```

3. Assign the task:

```bash
npx claude-flow@alpha swarm task "Build a todo list web application" --strategy parallel --share-results
```

**Option C: Web UI Monitoring**

For the best visualization of swarm coordination:

```bash
# Launch with web interface
npx claude-flow@alpha init --force --webui
npx claude-flow@alpha start-ui

# Open http://localhost:3000 in your browser
```

Then run swarm commands through the web terminal.

### What to Watch For

- **Agent spawning**: Watch agents come online with specific roles
- **Shared memory**: Agents write to and read from common memory store
- **Self-organization**: The architect agent doesn't explicitly direct others—coordination emerges
- **Task distribution**: Observe how work gets divided organically
- **Memory queries**: Run `npx claude-flow@alpha memory list` to see what agents have stored

### Observing Agent Memory

The key to understanding swarm coordination is watching the shared memory:

```bash
# See all stored memories
npx claude-flow@alpha memory list

# Query for specific topics
npx claude-flow@alpha memory query "todo" --recent

# Check memory statistics
npx claude-flow@alpha memory stats
```

### Understanding the Output

Claude Flow swarms use SQLite for shared memory. Each agent can:
- **Store** discoveries and decisions for other agents
- **Query** what other agents have learned
- **Build on** previous agent work

This creates emergent coordination without explicit message passing.

### Visualization: Swarm Topology

The mesh topology allows any agent to communicate with any other:

```
     ┌──────────────┐
     │   Architect  │
     └──────┬───────┘
            │
    ┌───────┼───────┐
    │       │       │
    ▼       ▼       ▼
┌───────┐ ┌───────┐ ┌───────┐
│Frontend│◄─►│Backend│◄─►│ QA    │
└───────┘ └───────┘ └───────┘
    │       │       │
    └───────┼───────┘
            │
            ▼
     ┌──────────────┐
     │  Documenter  │
     └──────────────┘
```

All agents share the same memory store, enabling organic coordination.

---

## Troubleshooting

### Common Issues

**Claude Code not finding subagents:**
- Ensure `.claude/agents/` directory exists
- File extension must be `.md`
- Restart Claude Code after adding agents

**Claude Flow MCP connection fails:**
```bash
# Remove and re-add the MCP server
claude mcp remove claude-flow
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

**API rate limits:**
- Reduce parallel agent count
- Add delays between agent spawns
- Use `--max-agents 3` for smaller swarms

**Memory not persisting:**
```bash
# Initialize memory system
npx claude-flow@alpha memory init
```

---

## Discussion Points for Each Demo

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
