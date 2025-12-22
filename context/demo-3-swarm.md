# Demo 3: Self-Organizing Swarm with Claude Flow

**Architecture:** Collaborative Network (Society)
**Time:** 10 minutes (pre-recorded walkthrough)
**What You'll Show:** A pre-recorded swarm building a todo app, with walkthrough of the output and memory trail.

**Important:** This demo is pre-recorded due to alpha software unpredictability and student attention in hour 3. A live demo option is available if time permits.

## Learning Objectives

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
