# Demo 2: Multi-Agent Code Review System

**Architecture:** Hierarchical (Coordinator + Workers) + Committee (Parallel) + Debate (Disagreement Surfacing)
**Time:** 15-20 minutes
**What You'll Build:** A code review system with three specialized reviewer agents that run in parallel, coordinated by a synthesis prompt that surfaces agreements and disagreements.

## Learning Objectives

- Create multiple specialized subagents with different tool access
- Implement hierarchical pattern (coordinator dispatches to workers)
- Implement committee pattern (parallel execution, independent analysis)
- Add debate elements (surface disagreements between reviewers)
- See how tool restrictions enforce specialization

## Architecture

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
