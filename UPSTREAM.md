# Upstream Sync Guide

This repository is a local fork of [natesmalley/jarvis_coding](https://github.com/natesmalley/jarvis_coding).

The `upstream` remote tracks the original repo. Use the commands below to pull upstream updates into your local fork without overwriting your customizations.

---

## Remote Setup (already done — reference only)

```bash
# Add the upstream remote (one-time setup, already configured)
git remote add upstream https://github.com/natesmalley/jarvis_coding.git

# Verify remotes
git remote -v
```

---

## Pull Upstream Updates

Run these commands to pull the latest changes from the original repo into your fork:

```bash
# 1. Fetch all upstream branches (does not modify your local files)
git fetch upstream

# 2. Make sure you are on your main branch
git checkout main

# 3. Merge upstream/main into your local main
#    Your local customizations (CLAUDE.md, tasks/, .claude/) are preserved
git merge upstream/main --no-edit
```

### If you have local commits that conflict

```bash
# Option A — Merge (keeps full history)
git merge upstream/main

# Option B — Rebase (replays your commits on top of upstream)
git rebase upstream/main
```

Resolve any conflicts, then:

```bash
git add <conflicted-files>
git merge --continue   # or: git rebase --continue
```

---

## Check What Changed Upstream (before merging)

```bash
# See upstream commits not yet in your fork
git log HEAD..upstream/main --oneline

# Preview files that would change
git diff HEAD upstream/main --name-only
```

---

## After Merging — Rebuild Docker

If upstream changes include Dockerfile, requirements, or generator/parser files, rebuild:

```bash
# Rebuild and restart both services
docker compose build --no-cache && docker compose up -d

# Or rebuild only one service
docker compose build api && docker compose up -d
docker compose build frontend && docker compose up -d
```

---

## Quick Reference

| Task | Command |
|---|---|
| Fetch upstream changes | `git fetch upstream` |
| See what changed | `git log HEAD..upstream/main --oneline` |
| Merge upstream | `git merge upstream/main --no-edit` |
| Verify remotes | `git remote -v` |
| Rebuild after merge | `docker compose build --no-cache && docker compose up -d` |
| Check container status | `docker ps` |
| API health check | `curl http://localhost:8000/api/v1/health` |

---

## Local-Only Files (never overwritten by upstream)

These files exist only in your fork and are safe across all upstream merges:

```
CLAUDE.md              # Project instruction set
UPSTREAM.md            # This file
tasks/todo.md          # Session task tracking
tasks/lessons.md       # Accumulated lessons
.claude/agents/        # All subagent definitions (including S1-specific agents)
.planning/             # GSD roadmap and phase plans
```

---

## Services

| Service | URL |
|---|---|
| API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/api/v1/docs |
| Frontend UI | http://localhost:9002 |

---

*Maintained by: Amin Hamidi — update this file whenever new features are added to the fork.*
