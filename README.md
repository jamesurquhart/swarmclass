# Developing with AI Agent Swarms

**O'Reilly Live Course: Agentic software development with claude-flow**

A 3-hour intermediate-level workshop exploring multi-agent AI systems and swarm-based software development patterns.

## Course Overview

If agentic AI is changing the way we build software, then agent swarms are reimagining it. This course explores Agentic AI swarms and similar patterns, discusses how different architectures can be applied to development, and provides hands-on experience with claude-flow—an open source framework for parallel agent coordination.

**Target Audience:**
- Software developers
- Software architects
- Product managers

**Prerequisites:**
- Basic knowledge of Anthropic Claude, Claude Code, and using AI to build applications
- Node.js 18+ installed
- Anthropic API key

## Course Structure

| Section | Duration | Focus |
|---------|----------|-------|
| Section 1: Agentic AI and Swarm Basics | 60 min | Concepts, terminology, six architectures |
| Section 2: Swarm Instantiation and Exploration | 60 min | Hands-on with Claude Code and claude-flow |
| Section 3: Best Practices for Using Swarms | 60 min | When to use (and NOT use) swarms |

## Six Multi-Agent Architectures Covered

1. **Hierarchical (Manager-Worker)** — Centralized control with task decomposition
2. **Debate (Adversarial)** — Proposer/Critic/Judge for high-stakes decisions
3. **Mixture of Agents (Committee)** — Parallel agents with aggregated results
4. **Sequential Pipeline (Relay)** — Staged transformations
5. **Dynamic Routing** — Adaptive query-based agent selection
6. **Collaborative Network (Swarm)** — Emergent coordination via shared memory

## Repository Structure

```
swarmclass/
├── context/                    # Background materials
│   ├── proposal.pdf            # O'Reilly course proposal
│   ├── multi-agent-architectures.md
│   └── demo-plan.md
├── presentation/
│   ├── slides/                 # Slide decks
│   ├── images/                 # Diagrams and visuals
│   └── scripts/                # Speaker notes and lesson plans
│       ├── section-1-outline.md
│       └── section-1-script.md
└── README.md
```

## Technologies Used

- **Claude Code** — Terminal-based AI agents with tool access
- **claude-flow** — Swarm orchestration with shared memory
- **MCP (Model Context Protocol)** — Open standard for agent-to-tool connections (AAIF/Linux Foundation)

## Setup for Demos

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# For Section 2: Install claude-flow
npm install -g claude-flow@alpha
```

## Instructor

**James Urquhart** — Principal at Urquhart Strategic Solutions. Author of *Flow Architectures: The Future of Streaming and Event-Driven Integration* (O'Reilly, 2021). 30+ years experience in distributed systems, cloud computing, and automation.

## License

Course materials for O'Reilly Media Live Course.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Claude Flow Wiki](https://github.com/ruvnet/claude-flow/wiki)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
