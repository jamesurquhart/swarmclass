# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Note**: This is a living document. Update the course structure, demos, and content sections below as materials are created or refined.

## Project Overview

**O'Reilly Live Course: "Developing with AI Agent Swarms"**

A 3-hour intermediate-level workshop on agentic software development with claude-flow. Target audience: software developers, architects, and product managers looking to apply AI swarms to their development process.

### Course Structure (3 hours total)

**Section 1: Agentic AI and Swarm Basics** (60 min)
- Outline: `presentation/scripts/section-1-outline.md`
- Script: `presentation/scripts/section-1-script.md` (27 slides)

| Module | Time | Slides | Content |
|--------|------|--------|---------|
| 1.1 Introduction | 5 min | 1-3 | Course structure, objectives |
| 1.2 What is Multi-Agent AI? | 10 min | 4-8 | Definition, why it matters, real-world deployments |
| 1.3 Key Terminology | 5 min | 9-10 | Agent, orchestration, context window, handoff, swarm, MCP |
| 1.4 Technology Landscape | 4 min | 11-12 | Claude Code, Claude Flow, LangGraph, CrewAI, MCP |
| 1.5 Six Architectures | 15 min | 13-20 | Hierarchical, Debate, Committee, Pipeline, Routing, Swarm |
| 1.6 Demo Setup | 8 min | Screen share | Create agents, launch pipeline in background |
| 1.7 Handoff Patterns | 8 min | 21-25 | Four patterns, demo illustration, shared memory preview |
| Wrap-up + Q&A | 5 min | 26-27 | Recap, Section 2 preview |

**Section 2: Creating Advanced Multi-Agent Systems in Claude Code** (60 min)
- Outline: `presentation/scripts/section-2-outline.md`
- Focus: Structured, orchestrated multi-agent systems

| Module | Time | Content |
|--------|------|---------|
| 2.1 Intro + Demo 1 Results | 5 min | Transition, show pipeline results |
| 2.2 Anthropic Agent Support | 10 min | Task tool recap, agent definitions, tool patterns |
| 2.3 Hierarchical Pattern | 8 min | Deep dive, implementation guidance, real-world use cases |
| 2.4 Demo 2 Setup Part 1 | 8 min | Create reviewers, show sample code |
| 2.5 Debate Pattern | 7 min | Deep dive, disagreement handling, use cases |
| 2.6 Demo 2 Complete + Run | 10 min | Add coordinator, run demo |
| 2.7 Committee Pattern | 5 min | Deep dive, aggregation strategies |
| 2.8 Dynamic Routing | 5 min | Brief implementation guidance |
| 2.9 Demo 2 Results | 5 min | Walk through output, connect patterns |
| 2.10 Wrap-up | 5 min | Recap, Section 3 preview |

**Section 3: Applying Multi-Agent Patterns** (60 min)
- Outline: `presentation/scripts/section-3-outline.md`
- Focus: Synthesis, decision-making, choosing the right architecture

| Module | Time | Content |
|--------|------|---------|
| 3.1 Introduction | 5 min | Architecture spectrum, control vs emergence |
| 3.2 Emergent Coordination | 5 min | Brief claude-flow overview, Agentics Foundation vs AAIF |
| 3.3 Demo Walkthrough | 10 min | Pre-recorded swarm output, memory trail analysis |
| 3.4 Decision Framework | 15 min | Choosing architectures, criteria tables, hybrid approaches |
| 3.5 Best Practices & Safety | 7 min | Cost awareness, safety rails, failure modes |
| 3.6 Q&A + Optional Live Demo | 13 min | Audience questions, live demo if time permits |
| 3.7 Course Wrap-Up | 5 min | Full recap, resources, next steps |

**Note**: Demo 3 is pre-recorded due to alpha software unpredictability and hour 3 cognitive load. See `context/demo-plan.md` for recording instructions.

### Six Multi-Agent Architectures Covered

1. **Hierarchical (Manager-Worker)** - Centralized control with task decomposition
2. **Debate (Adversarial)** - Proposer/Critic/Judge for high-stakes decisions
3. **Mixture of Agents (Committee)** - Parallel agents with aggregation
4. **Sequential Pipeline (Relay)** - Staged transformations
5. **Dynamic Routing** - Adaptive query-based agent selection
6. **Collaborative Network (Society)** - Emergent coordination via shared memory

## Repository Structure

- `context/` - Background materials
  - `proposal.pdf` - O'Reilly Live Course proposal
  - `multi-agent-architectures.md` - Educational content on six architectures
  - `demo-plan.md` - Three progressive workshop demonstrations
- `presentation/` - Presentation materials
  - `slides/` - Slide decks
  - `images/` - Images and diagrams
  - `scripts/` - Speaker notes and demo scripts
    - `section-1-outline.md` - Detailed lesson plan for Section 1
    - `section-1-script.md` - Full script with slide descriptions (27 slides)
    - `section-2-outline.md` - Detailed lesson plan for Section 2
    - `section-2-script.md` - Full script with slide descriptions (26 slides)
- `README.md` - Project overview and setup instructions

## Workshop Demos

The demos use different tools and increase in complexity:

| Demo | Architecture | Stack |
|------|--------------|-------|
| Research & Write | Sequential Pipeline | Claude Code subagents (`.claude/agents/*.md`) |
| Code Review | Hierarchical + Debate | Claude Agent SDK (`@anthropic-ai/claude-agent-sdk`) |
| Self-Organizing Swarm | Collaborative Network | Claude Flow (`claude-flow@alpha`) |

## Key Technologies Referenced

- **Claude Code subagents**: Custom agents defined in `.claude/agents/` with YAML frontmatter
- **Claude Agent SDK**: JavaScript SDK via `@anthropic-ai/claude-agent-sdk`
- **Claude Flow**: Swarm orchestration via `npx claude-flow@alpha`
- **MCP (Model Context Protocol)**: Tool/data integration standard
