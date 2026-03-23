# HA-AutoM8 — Architecture

*Last updated: 2026-03-23*

---

## What This Is

A **SentinelOne AI-SIEM Hyperautomation workspace** — a fork of the HELIOS event-injection platform extended with a content library reference, custom AI agents, and project governance for building and validating detection rules, automation playbooks, and SIEM use cases targeting SentinelOne Singularity.

---

## High-Level Picture

```
┌─────────────────────────────────────────────────────┐
│              HA-AutoM8 Workspace                    │
│                                                     │
│  ┌─────────────┐    ┌──────────────────────────┐   │
│  │  HELIOS App │    │  AI-SIEM Content Library │   │
│  │  (jarvis/)  │    │  (ai-siem/ submodule)    │   │
│  │             │    │                          │   │
│  │  Generate & │    │  282 validated S1 items  │   │
│  │  inject     │    │  ← QA baseline           │   │
│  │  test events│    └──────────────────────────┘   │
│  └──────┬──────┘              │                    │
│         │                     │ validate against   │
│         ▼                     ▼                    │
│  ┌──────────────────────────────────────────────┐  │
│  │         Content Development Layer            │  │
│  │  detections · playbooks · queries · parsers  │  │
│  │  (built here, validated, then PR'd upstream) │  │
│  └──────────────────────────────────────────────┘  │
│                        │                           │
│         ┌──────────────┴─────────────┐             │
│         ▼                            ▼             │
│  .claude/agents/              reference/           │
│  29 AI subagents              QA standards         │
│  (build & validate)           PR guide             │
└─────────────────────────────────────────────────────┘
```

**Flow:** Agents build content → HELIOS injects test events into SentinelOne → validate against `ai-siem/` baseline → merge to `origin` → PR upstream.

---

## Components

### HELIOS App (`jarvis/`)
Fork of `natesmalley/jarvis_coding`. Runs two Docker services:

| Service | Port | Role |
|---|---|---|
| Backend API | `8000` | FastAPI — destinations, parsers, scenario execution |
| Frontend UI | `9002` | Flask — trigger scenarios, upload logs, configure HEC |

Key capabilities: 150+ parser sourcetypes, named attack scenarios (ransomware, insider threat, MFA fatigue, impossible travel, Apollo, AsyncRAT), HEC batch delivery, UAM Alert Ingest, parser sync with S1 Config API.

### AI-SIEM Content Library (`ai-siem/`)
Git submodule → `Sentinel-One/ai-siem` pinned at `v_1_23_0`. Read-only reference.

| Type | Count |
|---|---|
| Detections (PowerQuery) | 8 |
| Dashboards | 85 |
| Workflows | 15 |
| Parsers (community + S1) | 169 |
| Pipelines | 5 |
| **Total** | **282** |

### AI Agents (`.claude/agents/`)
29 specialized subagents:

| Group | Agents |
|---|---|
| Security | `threat-hunter`, `siem-analyst`, `soar-engineer` |
| Platform | `backend`, `frontend`, `devops`, `qa`, `fullstack` |
| AI/ML | `ai-engineer` |
| Governance | `security`, `compliance`, `architect`, `technical-writer` |
| GSD workflow | 15 GSD orchestration agents |

### Reference / Governance (`reference/`)
- `APPROVED_CONTENT_WHITELIST.md` — 282 approved S1 items with field/structure standards
- `QA_STANDARDS.md` — validation rules for generated content
- `PR_GUIDE.md` — procedures for contributing content upstream

---

## Remotes

| Remote | URL | Role |
|---|---|---|
| `origin` | `aminhamidi-s1/HA-AutoM8` | This fork — all custom work |
| `upstream` | `natesmalley/jarvis_coding` | HELIOS source — pull updates into `jarvis/` |
| submodule | `Sentinel-One/ai-siem` | Content library — pin and update as needed |

---

*Update after every session that adds a new component or integration.*
