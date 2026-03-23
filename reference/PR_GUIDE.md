# PR Submission Guide — Sentinel-One/ai-siem

**Purpose:** Step-by-step instructions for submitting approved generated content as pull requests to the official SentinelOne AI-SIEM community repository.

**Upstream repo:** https://github.com/Sentinel-One/ai-siem
**Local clone:** `ai-siem/` (read-only reference — do NOT commit generated content here)
**Generated content staging:** Lives in the application's output directory until approved and PR-ready

---

## Prerequisites

Before submitting any PR:

1. ✅ Content has passed T1 + T2 + T3 validation (see `reference/QA_STANDARDS.md`)
2. ✅ User has explicitly approved the content
3. ✅ GitHub CLI (`gh`) is installed and authenticated
4. ✅ You have a GitHub account with fork access to `Sentinel-One/ai-siem`

---

## One-Time Setup: Fork the Upstream Repo

Do this once. The `ai-siem/` directory in this project is a direct clone (read-only reference). PRs require your own fork on GitHub.

```bash
# Fork the repo on GitHub (creates your-username/ai-siem)
gh repo fork Sentinel-One/ai-siem --clone=false

# Verify your fork exists
gh repo view your-username/ai-siem
```

---

## PR Workflow: Step by Step

### Step 1 — Set up your fork as a working directory

```bash
# Clone YOUR fork (not the Sentinel-One original)
git clone https://github.com/YOUR-GITHUB-USERNAME/ai-siem.git ai-siem-fork
cd ai-siem-fork

# Add the official upstream as remote
git remote add upstream https://github.com/Sentinel-One/ai-siem.git

# Verify remotes
git remote -v
# upstream   https://github.com/Sentinel-One/ai-siem.git (fetch)
# origin     https://github.com/YOUR-GITHUB-USERNAME/ai-siem.git (fetch)
```

### Step 2 — Sync your fork with upstream before branching

```bash
git fetch upstream
git checkout main
git merge upstream/main --no-edit
git push origin main
```

### Step 3 — Create a feature branch

```bash
# Branch naming: feat/<vendor>-<usecase>-<content-type>
# Examples:
git checkout -b feat/cloudflare-waf-detection
git checkout -b feat/okta-mfa-fatigue-detection
git checkout -b feat/sentinelone-identity-dashboard
git checkout -b feat/crowdstrike-log-pipeline
```

### Step 4 — Add your content

Place generated content in the correct directory structure:

```bash
# Detections
mkdir -p detections/community/<your-detection-name>-latest/
cp /path/to/generated/<name>.conf detections/community/<your-detection-name>-latest/
cp /path/to/generated/metadata.yaml detections/community/<your-detection-name>-latest/

# Dashboards
mkdir -p dashboards/community/<your-dashboard-name>-latest/
cp /path/to/generated/<name>.conf dashboards/community/<your-dashboard-name>-latest/
cp /path/to/generated/metadata.yaml dashboards/community/<your-dashboard-name>-latest/

# Workflows
mkdir -p workflows/community/<Your Workflow Name>/
cp /path/to/generated/<name>.json workflows/community/<Your Workflow Name>/
cp /path/to/generated/metadata.yaml workflows/community/<Your Workflow Name>/

# Parsers
mkdir -p parsers/community/<vendor>_<product>_logs-latest/
cp /path/to/generated/<name>.conf parsers/community/<vendor>_<product>_logs-latest/
cp /path/to/generated/metadata.yaml parsers/community/<vendor>_<product>_logs-latest/

# Pipelines
mkdir -p pipelines/community/<vendor>_<product>/
cp /path/to/generated/<name>.json pipelines/community/<vendor>_<product>/
cp /path/to/generated/metadata.yaml pipelines/community/<vendor>_<product>/
```

### Step 5 — Commit

```bash
git add .
git commit -m "feat: add <brief description of what it does>"

# Examples:
# feat: add Cloudflare WAF detection for high-severity blocked requests
# feat: add Okta MFA fatigue detection with impossible travel correlation
# feat: add SentinelOne Identity dashboard for Ranger AD events
```

### Step 6 — Push and open PR

```bash
git push origin HEAD

# Open PR against Sentinel-One/ai-siem main
gh pr create \
  --repo Sentinel-One/ai-siem \
  --base main \
  --title "feat: <brief title under 70 chars>" \
  --body "$(cat <<'EOF'
## Summary

- **Content type:** [Detection | Dashboard | Workflow | Parser | Pipeline]
- **Vendor/Product:** [e.g., Cloudflare WAF]
- **Data source:** [exact dataSource.name value]
- **What it does:** [1-2 sentence description]

## Requirements

- **Required products:** [e.g., AI SIEM, HyperAutomation]
- **Required integrations:** [e.g., Cloudflare API key]
- **Required parsers:** [e.g., marketplace-cloudflare-latest]

## Validation

- [ ] Tested against sample events
- [ ] metadata.yaml complete with all required fields
- [ ] No hardcoded credentials
- [ ] MITRE ATT&CK mapping included (detections only)

## Sample Event / Test Data

\`\`\`
[paste a sanitized sample log or event that triggers this detection/dashboard]
\`\`\`

EOF
)"
```

---

## Secret Scanning (Auto-run on PR)

The upstream CI runs **TruffleHog** on every PR. If secrets are detected, the PR will be blocked and a comment will be posted.

Pre-check before pushing:

```bash
# Install TruffleHog if not present
brew install trufflehog

# Scan your branch diff before pushing
trufflehog git file://. --branch HEAD --only-verified
```

If TruffleHog flags something:
1. Remove the secret from the file
2. Rotate the credential immediately (even if it was a placeholder)
3. Use `git commit --amend` or `git rebase -i` to rewrite history before pushing

---

## Sync Your Fork After Upstream Updates

Run this regularly to keep your fork current:

```bash
cd ai-siem-fork
git fetch upstream
git checkout main
git merge upstream/main --no-edit
git push origin main
```

Also update the local reference clone:

```bash
cd /path/to/ai-siem_HA/ai-siem
git pull origin main
```

After pulling reference updates, re-run the whitelist audit to catch any new approved content:

```bash
# From project root
python3 scripts/audit_whitelist.py  # (once this script exists)
```

---

## Upstream CI Pipeline Summary

| Stage | What it does | Blocks PR? |
|---|---|---|
| TruffleHog secret scan | Detects verified secrets in diff | Yes |
| CODEOWNERS review | Requires at least 1 owner approval | Yes |
| Semantic release | Tags `vX.Y.Z` and publishes release zip | No (post-merge) |

**Version tagging format:** `v_1_N_0` (e.g., `v_1_8_0` for v1.8.0)

---

## Contribution Quality Standards (from upstream README)

From the official contributing guide:
1. Name files `vendor-usecase-vX.Y.<ext>` (e.g., `zscaler_http_access-v1.0.s1ql`) with matching `metadata.yaml`
2. Include sample logs under `tests/fixtures/` where possible
3. Follow existing content patterns — study the approved whitelist before generating new content
4. At least one CODEOWNERS review required before merge

---

## PR Status Tracking

```bash
# View your open PRs against the upstream repo
gh pr list --repo Sentinel-One/ai-siem --author @me

# Check status of a specific PR
gh pr view <PR-NUMBER> --repo Sentinel-One/ai-siem

# View review comments
gh pr view <PR-NUMBER> --repo Sentinel-One/ai-siem --comments
```

---

*Maintained by the AI-SIEM Hyperautomation application. Update this guide whenever the upstream contribution process changes.*
