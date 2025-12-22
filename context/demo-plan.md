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

---

## Pre-Demo Verification

Before starting, verify your environment is ready:

```bash
# Check Node.js version (must be 18+)
node --version

# Check Claude Code is installed
claude --version
```

**Expected output:**
```
v20.x.x (or higher)
Claude Code vX.X.X
```

**Verify Claude Code authentication:**

Claude Code can authenticate in multiple ways. Run this to verify you're authenticated:

```bash
# Quick test - should respond without auth errors
claude --print "Say hello"
```

If you see "Hello!" or similar response, authentication is working.

If you get an authentication error:
- **Option A (API Key):** `export ANTHROPIC_API_KEY=sk-ant-your-key`
- **Option B (OAuth):** Run `claude` and follow the login prompts

If any check fails, see Troubleshooting section below.

---

## Setup (5 minutes)

### Step 1: Create Project Directory

```bash
# Create and enter project directory
mkdir demo-research-write
cd demo-research-write

# Create the agents directory
mkdir -p .claude/agents

# Verify structure
ls -la .claude/
```

**Expected output:**
```
total 0
drwxr-xr-x  3 user  staff   96 Dec 19 10:00 .
drwxr-xr-x  3 user  staff   96 Dec 19 10:00 ..
drwxr-xr-x  2 user  staff   64 Dec 19 10:00 agents
```

### Step 2: Create the Researcher Agent

Create the file `.claude/agents/researcher.md` with the following content:

**Option A: Using a text editor**
```bash
# Open in your preferred editor
code .claude/agents/researcher.md   # VS Code
# OR
nano .claude/agents/researcher.md   # Terminal editor
# OR
open -e .claude/agents/researcher.md # macOS TextEdit
```

**Option B: Using cat (copy-paste this entire block)**
```bash
cat > .claude/agents/researcher.md << 'EOF'
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
EOF
```

**Verify the file was created:**
```bash
cat .claude/agents/researcher.md
```

### Step 3: Create the Writer Agent

Create the file `.claude/agents/writer.md`:

**Using cat (copy-paste this entire block)**
```bash
cat > .claude/agents/writer.md << 'EOF'
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
EOF
```

**Verify the file was created:**
```bash
cat .claude/agents/writer.md
```

### Step 4: Verify Setup

```bash
# List all agent files
ls -la .claude/agents/

# Should show:
# researcher.md
# writer.md
```

**Your directory structure should now be:**
```
demo-research-write/
└── .claude/
    └── agents/
        ├── researcher.md
        └── writer.md
```

---

## Running the Demo (10-15 minutes)

### Step 5: Launch Claude Code

```bash
# Launch Claude Code in the project directory
claude
```

**You should see:**
```
╭─────────────────────────────────────────╮
│ Claude Code                             │
│ Type your message...                    │
╰─────────────────────────────────────────╯
```

### Step 6: Enter the Prompt

Copy and paste this exact prompt into Claude Code:

```
I need a 500-word briefing on "the current state of quantum computing for business applications."

Use the researcher subagent to gather current information about quantum computing business use cases, then use the writer subagent to produce a polished executive briefing.

Work in sequence: complete research first, save findings to research-notes.md, then have the writer transform those notes into the final briefing.md document.
```

Press Enter to submit.

### What You'll See During Execution

**Phase 1: Research Agent Spawns**
```
⏳ Task: Performing research on quantum computing...
```
The researcher agent will:
- Search for information using WebSearch
- Fetch relevant pages using WebFetch
- Compile findings

**Phase 2: Handoff via File**
```
✓ Created research-notes.md
```
The research notes file is created—this is the handoff mechanism.

**Phase 3: Writer Agent Spawns**
```
⏳ Task: Writing executive briefing...
```
The writer agent will:
- Read the research-notes.md file
- Transform it into polished prose
- Create the final briefing

**Phase 4: Completion**
```
✓ Created briefing.md
```

---

## Reading the Results

### Step 7: View the Output Files

After the demo completes, examine the output:

```bash
# List files created
ls -la

# View the research notes (intermediate output)
cat research-notes.md

# View the final briefing (final output)
cat briefing.md
```

### Expected Output Structure

**research-notes.md** should contain:
- Key Facts section with bullet points
- Context section with background
- Sources section listing where info came from
- Gaps section noting missing information

**briefing.md** should contain:
- ~500 words of polished prose
- Executive-friendly language
- Structured sections (intro, body, conclusion)
- Note about areas for additional research

### Discussion Points

After viewing the output, discuss:

1. **Context Isolation**: Each agent worked independently. The researcher didn't know a writer would follow.

2. **File-Based Handoff**: The `research-notes.md` file was the interface between agents. This is explicit, auditable, and debuggable.

3. **Specialization**: The researcher focused purely on gathering information. The writer focused purely on prose. Neither was distracted by the other's concerns.

4. **Tool Restrictions**: Notice the researcher had `WebSearch, WebFetch` but the writer did not. The writer had `Write, Edit` while the researcher did not write the final document.

---

## Troubleshooting

### "claude: command not found"

Claude Code is not installed or not in PATH:
```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Verify installation
which claude
```

### "API key not set" or authentication errors

```bash
# Set your API key
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Add to shell profile for persistence
echo 'export ANTHROPIC_API_KEY=sk-ant-your-key-here' >> ~/.zshrc
source ~/.zshrc
```

### Agents not recognized

If Claude doesn't recognize the subagents:
```bash
# Verify file locations
ls -la .claude/agents/

# Check file contents (look for YAML frontmatter)
head -5 .claude/agents/researcher.md

# Should show:
# ---
# name: researcher
# description: ...
```

Ensure the files have the correct YAML frontmatter (the `---` delimited section at the top).

### Demo runs but no files created

If the agents run but don't create output files:
1. Check that you're in the correct directory
2. Look for errors in Claude Code output
3. Try a simpler prompt: "Use the researcher subagent to find 3 facts about quantum computing and save them to notes.md"

### Demo takes too long

If the demo exceeds 20 minutes:
- The researcher may be doing extensive web searches
- Network latency can slow WebFetch operations
- Consider using a simpler topic for time-constrained demos

---

## Variation: 3-Agent Pipeline (Optional)

Add a third agent for editing/fact-checking:

```bash
cat > .claude/agents/editor.md << 'EOF'
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
EOF
```

**Modified prompt for 3-agent pipeline:**
```
I need a 500-word briefing on "the current state of quantum computing for business applications."

Work in sequence:
1. Use the researcher subagent to gather information, save to research-notes.md
2. Use the writer subagent to create a draft briefing, save to briefing-draft.md
3. Use the editor subagent to review and polish the draft, save final version to briefing.md
```

---

## Cleanup

After the demo, you can clean up:

```bash
# Exit Claude Code
# Press Ctrl+C or type /exit

# Remove demo files (optional)
cd ..
rm -rf demo-research-write
```

Or keep the directory to reference the agent definitions later.

---

## Demo 2: Multi-Agent Code Review System

**Architecture:** Hierarchical (Coordinator + Workers) + Committee (Parallel) + Debate (Disagreement Surfacing)
**Time:** 15-20 minutes
**What You'll Build:** A code review system with three specialized reviewer agents that run in parallel, coordinated by a synthesis prompt that surfaces agreements and disagreements.

### Learning Objectives

- Create multiple specialized subagents with different tool access
- Implement hierarchical pattern (coordinator dispatches to workers)
- Implement committee pattern (parallel execution, independent analysis)
- Add debate elements (surface disagreements between reviewers)
- See how tool restrictions enforce specialization

### Architecture

```
              [Coordinator Prompt]
             /         |         \
            ↓          ↓          ↓
   [Security]   [Performance]   [Maintainability]
    Reviewer      Reviewer         Reviewer
            \         |         /
             ↓        ↓        ↓
        [Each saves review to file]
                    ↓
          [Coordinator Synthesis]
                    ↓
              [Final Report]
```

---

## Pre-Demo Verification

Same as Demo 1:
```bash
node --version          # Must be 18+
claude --version        # Must be installed
claude --print "Hello"  # Must authenticate
```

---

## Setup (5 minutes)

### Step 1: Create Project Directory

```bash
# Create and enter project directory
mkdir demo-code-review
cd demo-code-review

# Create the agents directory
mkdir -p .claude/agents

# Verify structure
ls -la .claude/
```

### Step 2: Create the Security Reviewer Agent

```bash
cat > .claude/agents/security-reviewer.md << 'EOF'
---
name: security-reviewer
description: Use this agent to review code for security vulnerabilities, injection risks, authentication issues, and exposed secrets.
tools: Read, Grep, Glob
---

You are a Security Code Reviewer. Your role is to analyze code for security issues.

## Focus Areas
- Input validation vulnerabilities
- SQL/command/code injection risks
- Authentication and authorization flaws
- Hardcoded secrets or credentials
- Data exposure risks
- Insecure dependencies

## Output Format
Structure your review as:

### Security Issues Found

For each issue:
- **Severity**: CRITICAL / HIGH / MEDIUM / LOW
- **Location**: File and line number
- **Issue**: What the vulnerability is
- **Risk**: What could happen if exploited
- **Remediation**: How to fix it

### Summary
- Total issues by severity
- Overall security assessment

Be specific about line numbers. Focus only on security—ignore performance or style issues.
EOF
```

**Verify:**
```bash
cat .claude/agents/security-reviewer.md
```

### Step 3: Create the Performance Reviewer Agent

```bash
cat > .claude/agents/performance-reviewer.md << 'EOF'
---
name: performance-reviewer
description: Use this agent to review code for performance issues, algorithmic complexity, memory usage, and optimization opportunities.
tools: Read, Grep, Glob
---

You are a Performance Code Reviewer. Your role is to analyze code for performance issues.

## Focus Areas
- Algorithmic complexity (O(n²) loops, etc.)
- N+1 query patterns
- Memory leaks or excessive allocation
- Blocking operations that should be async
- Missing caching opportunities
- Unnecessary computation

## Output Format
Structure your review as:

### Performance Issues Found

For each issue:
- **Impact**: HIGH / MEDIUM / LOW
- **Location**: File and line number
- **Issue**: What the performance problem is
- **Consequence**: How it affects runtime/memory
- **Optimization**: Specific fix recommendation

### Summary
- Total issues by impact
- Estimated performance improvement if fixed

Be specific about line numbers. Focus only on performance—ignore security or style issues.
EOF
```

### Step 4: Create the Maintainability Reviewer Agent

```bash
cat > .claude/agents/maintainability-reviewer.md << 'EOF'
---
name: maintainability-reviewer
description: Use this agent to review code for maintainability issues including readability, naming, structure, and documentation needs.
tools: Read, Grep, Glob
---

You are a Maintainability Code Reviewer. Your role is to analyze code for long-term maintainability.

## Focus Areas
- Code clarity and readability
- Naming conventions (variables, functions, classes)
- Function/class size and complexity
- Code duplication
- Missing error handling
- Documentation gaps
- Test coverage concerns

## Output Format
Structure your review as:

### Maintainability Issues Found

For each issue:
- **Priority**: HIGH / MEDIUM / LOW
- **Location**: File and line number
- **Issue**: What the maintainability problem is
- **Impact**: How it affects future development
- **Suggestion**: How to improve it

### Summary
- Total issues by priority
- Overall maintainability assessment

Be specific about line numbers. Focus only on maintainability—ignore security or performance issues.
EOF
```

### Step 5: Create the Sample Code to Review

Create `sample.js` with intentional issues for each reviewer to find:

```bash
cat > sample.js << 'EOF'
// User authentication handler
const mysql = require('mysql');

function authenticateUser(username, password) {
  // BUG: SQL Injection vulnerability - string concatenation
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";

  // BUG: Hardcoded credentials
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myapp'
  });

  // BUG: Async operation but returns synchronously
  let result = null;
  connection.query(query, function(err, rows) {
    if (rows.length > 0) {
      result = rows[0];
    }
  });

  return result; // Always returns null due to async issue
}

function getAllUsers() {
  // BUG: N+1 query pattern - 10,000 individual database calls
  const users = [];
  for (let i = 0; i < 10000; i++) {
    const user = database.getUserById(i);
    if (user) users.push(user);
  }
  return users;
}

// BUG: No input validation
function updateUserEmail(userId, newEmail) {
  database.update('users', { email: newEmail }, { id: userId });
}

// BUG: Poor naming, no error handling
function x(a, b) {
  return a.map(i => b[i.id]);
}

module.exports = { authenticateUser, getAllUsers, updateUserEmail, x };
EOF
```

### Step 6: Verify Setup

```bash
# List all files
ls -la
ls -la .claude/agents/
```

**Your directory structure should be:**
```
demo-code-review/
├── .claude/
│   └── agents/
│       ├── security-reviewer.md
│       ├── performance-reviewer.md
│       └── maintainability-reviewer.md
└── sample.js
```

---

## Running the Demo (10-15 minutes)

### Step 7: Launch Claude Code

```bash
claude
```

### Step 8: Enter the Coordinator Prompt

Copy and paste this prompt into Claude Code:

```
I need a comprehensive code review of sample.js using three specialized reviewers.

Execute this multi-agent review process:

1. PARALLEL REVIEW PHASE: Run all three reviewers simultaneously on sample.js:
   - Use the security-reviewer subagent to analyze for security vulnerabilities
   - Use the performance-reviewer subagent to analyze for performance issues
   - Use the maintainability-reviewer subagent to analyze for maintainability concerns

   Save each review to a separate file:
   - security-review.md
   - performance-review.md
   - maintainability-review.md

2. SYNTHESIS PHASE: After all reviews are complete, create a unified report:
   - Read all three review files
   - Identify CONSENSUS issues (found by multiple reviewers)
   - Identify CONFLICTS (where reviewers might disagree on priority/approach)
   - Create a prioritized list of the top 5 issues to fix first
   - Assign an overall code health grade (A-F)
   - Save the final report to code-review-report.md

Be explicit about which issues multiple reviewers agreed on and any tensions between different concerns (e.g., security vs. convenience).
```

Press Enter to submit.

### What You'll See During Execution

**Phase 1: Parallel Reviews**
```
⏳ Task: Security review of sample.js...
⏳ Task: Performance review of sample.js...
⏳ Task: Maintainability review of sample.js...
```

All three reviewers run simultaneously (committee pattern). Each:
- Reads sample.js
- Applies their specialized lens
- Saves findings to their review file

**Phase 2: Synthesis**
```
✓ Created security-review.md
✓ Created performance-review.md
✓ Created maintainability-review.md
⏳ Synthesizing reviews...
✓ Created code-review-report.md
```

The coordinator reads all reviews and creates the unified report.

---

## Reading the Results

### Step 9: View the Output Files

```bash
# List all files created
ls -la *.md

# View individual reviews
cat security-review.md
cat performance-review.md
cat maintainability-review.md

# View the synthesized report
cat code-review-report.md
```

### Expected Findings by Reviewer

**Security Reviewer should find:**
- CRITICAL: SQL injection in authenticateUser()
- HIGH: Hardcoded database credentials
- MEDIUM: No input validation in updateUserEmail()

**Performance Reviewer should find:**
- HIGH: N+1 query pattern in getAllUsers() (10,000 DB calls)
- MEDIUM: Synchronous return from async operation

**Maintainability Reviewer should find:**
- HIGH: Function `x()` has cryptic naming
- MEDIUM: No error handling throughout
- MEDIUM: Missing JSDoc/comments
- LOW: Inconsistent code style

### Expected Synthesis Report Structure

The `code-review-report.md` should contain:
- **Consensus Issues**: Problems multiple reviewers flagged
- **Conflicts/Tensions**: Where concerns compete (e.g., "security wants parameterized queries, performance notes this adds overhead")
- **Top 5 Priority Fixes**: Ordered by severity/impact
- **Overall Grade**: Likely D or F given the serious issues

### Discussion Points

After viewing output, discuss:

1. **Hierarchical Pattern**: The coordinator prompt orchestrated the entire flow. Workers (reviewers) reported back, coordinator synthesized.

2. **Committee Pattern**: All three reviewers ran in parallel on the same input. Each brought independent expertise.

3. **Debate/Conflict Surfacing**: The synthesis explicitly surfaces where reviewers might disagree—this is the debate element.

4. **Tool Restrictions**: All reviewers had Read-only access (Read, Grep, Glob). They couldn't modify code, only analyze it.

5. **Specialization Value**: A single agent reviewing for "everything" would likely miss issues. Specialized agents with focused prompts catch more.

---

## Troubleshooting

### Reviewers not found

```bash
# Verify agent files exist
ls -la .claude/agents/

# Check YAML frontmatter
head -5 .claude/agents/security-reviewer.md
```

Ensure each file has the `---` delimited YAML at the top.

### Reviews not saved to files

If reviews complete but files aren't created:
1. Check Claude Code has write permissions
2. Try running with `claude --dangerously-skip-permissions`
3. Verify you're in the correct directory

### Demo takes too long

If the demo exceeds 20 minutes:
- The reviewers may be doing extensive analysis
- Consider using a shorter sample file
- You can run reviewers sequentially instead of parallel for more control

### Synthesis doesn't surface conflicts

If the final report doesn't highlight disagreements:
- The sample code may have issues that all reviewers agree on
- Add a controversial element to sample.js (e.g., a complex regex that's "secure but unreadable")

---

## Variation: Adding a Debate Round (Optional)

For a more advanced demo, add a fourth agent that challenges the findings:

```bash
cat > .claude/agents/devils-advocate.md << 'EOF'
---
name: devils-advocate
description: Use this agent to challenge code review findings and argue the opposing perspective.
tools: Read, Grep, Glob
---

You are a Devil's Advocate Reviewer. Your role is to challenge the findings of other reviewers.

For each issue raised by other reviewers:
1. Argue why it might NOT be a problem
2. Consider context that could make it acceptable
3. Question whether the fix is worth the effort
4. Identify potential downsides of the proposed remediation

Be constructively contrarian. The goal is to stress-test the recommendations.
EOF
```

Then modify the coordinator prompt to include a debate round after the initial reviews.

---

## Cleanup

```bash
# Exit Claude Code
# Press Ctrl+C or type /exit

# Remove demo files (optional)
cd ..
rm -rf demo-code-review
```

---

## Demo 3: Self-Organizing Swarm with Claude Flow

**Architecture:** Collaborative Network (Society)
**Time:** 10 minutes (pre-recorded walkthrough)
**What You'll Show:** A pre-recorded swarm building a todo app, with walkthrough of the output and memory trail.

**Important:** This demo is pre-recorded due to alpha software unpredictability and student attention in hour 3. A live demo option is available if time permits.

### Learning Objectives

- Understand how emergent coordination differs from structured orchestration
- See how agents discover work through shared memory
- Observe the output of a self-organizing swarm
- Understand when swarm patterns are appropriate

---

## Part A: Pre-Recording Instructions (Before the Live Session)

Complete these steps **at least 24 hours before the live session** to ensure you have working artifacts.

---

### Pre-Recording Verification Checklist

Before you begin recording, verify your environment:

```bash
# 1. Check Node.js version (must be 18+)
node --version
# Expected: v18.x.x or higher

# 2. Check npm is available
npm --version
# Expected: 9.x.x or higher

# 3. Verify Claude Code is installed and authenticated
claude --version
claude --print "Say hello"
# Expected: A greeting response

# 4. Install claude-flow globally (or verify it's installed)
npm install -g claude-flow@alpha
npx claude-flow@alpha --version
# Expected: Version number (e.g., 0.1.x)

# 5. Verify you have a terminal recording tool
which asciinema || echo "Consider installing asciinema for terminal recording"
# OR use screen recording software (QuickTime, OBS, etc.)
```

**All checks passed?** You're ready to record.

---

### Recording Setup

**Step 1: Create Fresh Project Directory**

```bash
# Create and enter project directory
mkdir demo-swarm-recording
cd demo-swarm-recording

# Verify you're in the right place
pwd
# Expected: /path/to/demo-swarm-recording
```

**Step 2: Initialize Claude Flow**

```bash
# Initialize claude-flow in this directory
npx claude-flow@alpha init --force
```

**Expected output:**
```
✓ Created .claude-flow/config.json
✓ Created .claude-flow/memory/
✓ Claude Flow initialized successfully
```

**Verify initialization:**
```bash
ls -la .claude-flow/
# Expected: config.json and memory/ directory
```

**Step 3: Set Up Recording Tools**

**Option A: Terminal Recording (Recommended)**
```bash
# Start asciinema recording
asciinema rec demo3-recording.cast
# Press Ctrl+D when done to save
```

**Option B: Screen Recording**
- Open QuickTime Player > File > New Screen Recording
- Or use OBS Studio for more control
- Ensure terminal font is large enough to read (16pt+)

---

### Recording the Demo

**Start your recording now, then execute these steps:**

**Step 4: Initialize Swarm**

```bash
npx claude-flow@alpha swarm init --topology mesh --max-agents 6
```

**Expected output:**
```
✓ Swarm initialized with mesh topology
✓ Maximum agents: 6
✓ Memory system ready
```

**Step 5: Spawn Specialized Agents**

Spawn each agent one at a time, waiting for confirmation:

```bash
# Agent 1: Architect
npx claude-flow@alpha swarm spawn architect "System Designer"
# Expected: ✓ Spawned architect agent: System Designer

# Agent 2: Frontend Developer
npx claude-flow@alpha swarm spawn coder "Frontend Developer"
# Expected: ✓ Spawned coder agent: Frontend Developer

# Agent 3: Backend Developer
npx claude-flow@alpha swarm spawn coder "Backend Developer"
# Expected: ✓ Spawned coder agent: Backend Developer

# Agent 4: QA Engineer
npx claude-flow@alpha swarm spawn tester "QA Engineer"
# Expected: ✓ Spawned tester agent: QA Engineer

# Agent 5: Documentation Writer
npx claude-flow@alpha swarm spawn documenter "Documentation Writer"
# Expected: ✓ Spawned documenter agent: Documentation Writer
```

**Verify all agents spawned:**
```bash
npx claude-flow@alpha swarm status
```

**Expected output:**
```
Swarm Status: READY
Active Agents: 5
- architect (System Designer) - IDLE
- coder-1 (Frontend Developer) - IDLE
- coder-2 (Backend Developer) - IDLE
- tester (QA Engineer) - IDLE
- documenter (Documentation Writer) - IDLE
```

**Step 6: Open Second Terminal for Monitoring (Optional but Recommended)**

In a new terminal window:
```bash
cd demo-swarm-recording
npx claude-flow@alpha swarm status --watch
```

This shows real-time agent activity. Keep this visible during recording.

**Step 7: Assign the Task**

In your main terminal:
```bash
npx claude-flow@alpha swarm task "Build a todo list web application with HTML, CSS, and vanilla JavaScript. Include add, delete, and toggle complete functionality. Use localStorage for persistence." --strategy parallel --share-results
```

**Expected behavior:**
- Agents begin working (status changes from IDLE to WORKING)
- Files start appearing in the directory
- Memory entries are logged
- This may take 3-10 minutes depending on complexity

**What to narrate during recording:**
- "Notice how the architect agent writes first"
- "The frontend and backend agents query for architecture decisions"
- "Each agent discovers work rather than being assigned"

**Step 8: Wait for Completion**

Watch the status terminal. When all agents return to IDLE or show COMPLETED:

```bash
npx claude-flow@alpha swarm status
```

**Expected final status:**
```
Swarm Status: COMPLETED
Task: Build a todo list web application...
Active Agents: 5
- architect (System Designer) - COMPLETED
- coder-1 (Frontend Developer) - COMPLETED
- coder-2 (Backend Developer) - COMPLETED
- tester (QA Engineer) - COMPLETED
- documenter (Documentation Writer) - COMPLETED
```

**Step 9: Capture Memory Trail**

```bash
# Export the memory log
npx claude-flow@alpha memory list > memory-trail.log

# Get statistics
npx claude-flow@alpha memory stats > memory-stats.log

# Verify files were created
ls -la *.log
# Expected: memory-trail.log and memory-stats.log
```

**Step 10: Verify Output Files**

```bash
# List all generated files
ls -la

# Check for expected output
ls index.html styles.css app.js README.md
# All four files should exist

# If tests were generated
ls -la tests/ 2>/dev/null || echo "No tests directory (optional)"
```

**Step 11: Test the Generated App**

```bash
# Open in browser (macOS)
open index.html

# Or start a simple server
python3 -m http.server 8000
# Then open http://localhost:8000 in browser
```

**Verify the app works:**
- [ ] Page loads without errors
- [ ] Can add a new todo item
- [ ] Can mark item as complete
- [ ] Can delete an item
- [ ] Refreshing page preserves todos (localStorage)

**Step 12: Stop Recording**

```bash
# If using asciinema
# Press Ctrl+D to stop recording

# Recording saved to demo3-recording.cast
```

---

### Recording Artifacts Checklist

Before the live session, verify you have all these artifacts:

| Artifact | Location | Verified? |
|----------|----------|-----------|
| Terminal recording or video | `demo3-recording.cast` or `.mp4` | ☐ |
| `index.html` | `demo-swarm-recording/` | ☐ |
| `styles.css` | `demo-swarm-recording/` | ☐ |
| `app.js` | `demo-swarm-recording/` | ☐ |
| `README.md` | `demo-swarm-recording/` | ☐ |
| `memory-trail.log` | `demo-swarm-recording/` | ☐ |
| `memory-stats.log` | `demo-swarm-recording/` | ☐ |
| App works in browser | Tested manually | ☐ |

**Missing artifacts?** See Troubleshooting section or Fallback options.

---

### Ideal Memory Trail Example

Your `memory-trail.log` should show coordination patterns like:

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

[12:05:30] documenter → QUERIED: "all"
           Found: architecture, components, tests

[12:06:15] documenter → STORED: "documentation-complete"
           Value: "README.md with setup and usage"
```

**Key patterns to highlight:**
1. Architect writes first (no queries)
2. Other agents query before writing
3. Work is discovered, not assigned
4. No explicit coordination—just shared memory

---

### Recording Tips

1. **Run multiple times** — Pick the cleanest, most illustrative run
2. **Watch for good examples** — Look for clear memory coordination patterns
3. **Note timestamps** — Helps explain the sequence during walkthrough
4. **Test the output** — Make sure the generated todo app actually works
5. **Have backup** — If no clean run, create synthetic memory trail that illustrates concepts
6. **Keep recording short** — Ideal recording is 5-8 minutes; edit if needed

---

## Part B: Live Session Presentation

### What to Have Ready

Before starting Demo 3 in the live session:

**On your screen:**
- [ ] Terminal with `demo-swarm-recording/` directory open
- [ ] Browser with `index.html` loaded (hidden tab)
- [ ] `memory-trail.log` open in editor (hidden tab)
- [ ] Recording ready to play (if showing video)

**Files accessible:**
- [ ] `index.html` — to show output
- [ ] `styles.css` — to show output
- [ ] `app.js` — to show output
- [ ] `memory-trail.log` — for coordination walkthrough
- [ ] `README.md` — to show documenter output

---

### Live Presentation Script (10 minutes)

**Introduction (1 min)**

> "Unlike our previous demos, this one was pre-recorded. Swarm behavior is inherently unpredictable—that's its nature. Rather than wait for live execution, let's walk through what a successful run produced and understand how it happened."

**Show the Task (1 min)**

> "We asked a swarm to build a todo list web application. No predefined workflow. No coordinator assigning tasks. We just spawned five agents and let them figure it out."

Show on screen or slide:
```
Task: "Build a todo list web application with HTML, CSS,
       and vanilla JavaScript"

Agents Spawned:
├── Architect (System Designer)
├── Frontend Developer
├── Backend Developer
├── QA Engineer
└── Documentation Writer
```

**Show the Output (3 min)**

Walk through each file in your editor:

1. **`index.html`**
   > "The Architect decided on a single-page structure. Notice how the frontend developer implemented the HTML—nobody told it to create this exact structure."
   - Point out key structural decisions

2. **`styles.css`**
   > "The styling shows independent design choices. This agent wasn't given a style guide—it inferred appropriate styling."
   - Point out a few notable choices

3. **`app.js`**
   > "Here's where the core functionality lives. Add, delete, toggle complete, and localStorage persistence. The backend developer created this, coordinating with frontend through shared memory."
   - Highlight the CRUD operations
   - Show the localStorage usage

4. **Live demo in browser**
   > "Let's see if it actually works..."
   - Add a todo item
   - Toggle complete
   - Delete an item
   - Refresh to show persistence

**Show the Memory Trail (4 min)** — *This is the key teaching moment*

Open `memory-trail.log` and walk through step by step:

> "This is where the magic happened. Let me show you how these agents coordinated without any explicit instructions."

1. > "First, the Architect wrote its decision to memory. It didn't wait to be asked—it took initiative."
   - Point to first STORED entry

2. > "Next, the Frontend Developer queried memory for 'architecture'. It found the Architect's decision and used it to guide its work."
   - Point to QUERIED entry and response

3. > "The Backend Developer did the same thing independently—parallel discovery of the same architecture decision."
   - Point to parallel query

4. > "Then QA queried for 'components' and found both frontend and backend work. It wrote tests for what existed, not what was planned."
   - Point to QA entries

5. > "Finally, the Documenter queried everything and synthesized the README."
   - Point to final entries

**The Key Insight (1 min)**

> "In Demo 2, our coordinator explicitly told Security, Performance, and Maintainability reviewers what to do. Here, nobody told Frontend to build the header. It queried memory, saw what was needed, and acted. That's the fundamental difference—**discovery versus assignment**."

Show the contrast table:

| Demo 2 (Hierarchical) | Demo 3 (Swarm) |
|----------------------|----------------|
| Coordinator assigned reviewers | No assignment—agents claimed work |
| Predefined roles | Roles discovered organically |
| Coordinator synthesized | Synthesis emerged |
| Predictable, auditable | Adaptive, exploratory |

---

### Discussion Questions (if time allows)

1. "What could go wrong with discovery-based coordination?"
2. "When would you choose swarm over hierarchical patterns?"
3. "How would you debug a swarm that produced incorrect output?"

---

## Part C: Optional Live Demo (If Time Permits)

If there's extra time and student interest, offer a brief live demonstration.

### Pre-Demo Verification

```bash
# Ensure claude-flow is installed
npx claude-flow@alpha --version

# Create a fresh directory
mkdir demo-swarm-live
cd demo-swarm-live

# Initialize
npx claude-flow@alpha init --force
```

### Run Simplified Task

Use a simpler task for reliability:

```bash
npx claude-flow@alpha swarm "List the main files in this directory and describe what each does" --claude --max-agents 3
```

### Set Expectations

> "This is live, so results may vary. That's the nature of emergent systems. If it works, great—we'll see coordination in action. If it behaves unexpectedly, that's also a lesson about the unpredictability of emergent coordination. This is why production swarms need monitoring and guardrails."

### Live Demo Talking Points

While waiting for results:
- "Notice we're not seeing a predefined sequence"
- "Agents are discovering work as they go"
- "This would be harder to audit than our hierarchical pattern"

---

## Troubleshooting (For Recording)

### Common Issues During Recording

**Issue: claude-flow not found**
```bash
# Reinstall globally
npm install -g claude-flow@alpha

# Or use npx (slower but always works)
npx claude-flow@alpha --version
```

**Issue: MCP connection fails**
```bash
claude mcp remove claude-flow
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

**Issue: Swarm won't start**
```bash
npx claude-flow@alpha memory init
npx claude-flow@alpha swarm init --force
```

**Issue: Agents stuck in WORKING state**
```bash
# Force stop
npx claude-flow@alpha swarm stop

# Check for hung processes
ps aux | grep claude

# Reinitialize
npx claude-flow@alpha swarm init --force
```

**Issue: Memory not persisting**
```bash
npx claude-flow@alpha memory init
ls -la .claude-flow/memory/
```

**Issue: No output files generated**
```bash
# Check agent logs if available
npx claude-flow@alpha logs

# Verify agents have write permissions
touch test-write.txt && rm test-write.txt
```

### Fallback: Create Illustrative Output

If you cannot get a clean recording after multiple attempts, create representative files manually:

1. **Create a simple todo app** (HTML/CSS/JS) that demonstrates what a swarm might produce

2. **Create a synthetic memory trail** that illustrates the coordination pattern:
   ```
   [12:01:15] architect → STORED: "architecture"
   [12:01:30] frontend → QUERIED: "architecture" → FOUND
   [12:01:45] frontend → STORED: "ui-started"
   ... etc.
   ```

3. **During presentation, be transparent:**
   > "This is a representative example of swarm output. The actual recording encountered issues, but these artifacts illustrate the patterns accurately."

The teaching value is in the **memory trail pattern**, not the specific code generated.

---

## Visualization: Swarm Topology

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
            │
     [Shared Memory]
```

All agents share the same memory store, enabling organic coordination without explicit message passing.

---

## Cleanup

After recording is complete and verified:

```bash
# Keep the recording directory with all artifacts for the live session
# Don't delete until after the course!

# After the live session (optional cleanup):
cd ..
rm -rf demo-swarm-recording
rm -rf demo-swarm-live  # if you ran the optional live demo
```

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
