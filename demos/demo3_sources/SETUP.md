# Demo 3: Self-Organizing Swarm Setup

Demo 3 uses `claude-flow` which auto-generates its own agent definitions during initialization. No pre-created agent files are needed.

## Quick Setup

```bash
# Create a fresh project directory
mkdir demo-swarm
cd demo-swarm

# Initialize claude-flow (creates agents and memory system)
npx claude-flow@alpha init --force

# Run the swarm
npx claude-flow@alpha swarm "Build a simple todo list web application with HTML, CSS, and JavaScript. Include add, delete, and toggle complete functionality. Use localStorage for persistence." --claude
```

## What `init` Creates

The `claude-flow init` command automatically creates:

- `.swarm/memory.db` - SQLite database for shared memory
- `.claude/agents/` - 64+ specialized agent definitions
- `.claude/settings.json` - Hooks and MCP configuration
- `CLAUDE.md` - Claude Flow configuration

## Pre-Recording Instructions

This demo should be **pre-recorded** before the live session due to alpha software unpredictability. See `context/demo-plan.md` for full recording instructions.

### Recording Checklist

1. Run the swarm command above
2. Wait for completion (3-10 minutes)
3. Capture output files: `index.html`, `styles.css`, `app.js`, `README.md`
4. Export memory trail: `npx claude-flow@alpha memory list > memory-trail.log`
5. Test the generated app in a browser
6. Save the recording

## Sample Task (Alternative)

For a faster/simpler demo:

```bash
npx claude-flow@alpha swarm "List the main files in this directory and describe what each does" --claude --max-agents 3
```
