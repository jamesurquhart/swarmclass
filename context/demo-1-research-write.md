# Demo 1: Research & Write Pipeline

**Architecture:** Sequential Pipeline (Relay)
**Time:** 15-20 minutes
**What You'll Build:** A two-agent system where a Researcher agent gathers information and a Writer agent synthesizes it into a document.

## Learning Objectives

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
