# Agent Readiness Design — thabetamer.com

**Date:** 2026-04-20
**Status:** Approved

## Context

thabetamer.com is a personal portfolio site for Thabet Amer (Technical Leader & Solutions Architect), built on Astro 5 + Cloudflare Pages. An agent-readiness audit flagged 9 missing signals that make sites discoverable and useful to AI agents. This spec covers implementing the applicable ones and stubbing the API-oriented ones that don't directly apply to a portfolio.

The goal: agents visiting the site can discover its capabilities, consume its content in machine-friendly formats, understand its data usage preferences, and (where WebMCP is supported) call structured tools to retrieve profile, project, and contact information.

## Architecture

The site uses Cloudflare Pages with an Astro SSR Worker (`_worker.js`). Two important constraints shape the implementation:

- `_headers` file applies **only to static assets** (CDN-served), not Worker responses. Dynamic pages get headers from `src/middleware.ts`.
- **Markdown for Agents** is a Cloudflare network-level feature enabled via the dashboard (AI Crawl Control), not via code.

## Changes

### 1. Link headers — `src/middleware.ts`

Add one `response.headers.set` call in the existing middleware chain:

```
Link: </.well-known/agent-skills/index.json>; rel="agent-skills",
      </.well-known/api-catalog>; rel="api-catalog",
      </llms.txt>; rel="describedby",
      </sitemap-index.xml>; rel="sitemap"
```

Applies to all dynamic page responses (RFC 8288 / RFC 9727).

### 2. Content Signals — `public/robots.txt`

Add one line to the existing file:

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Declares the site is open to AI training, search indexing, and use as AI context input (draft-romm-aipref-contentsignals).

### 3. Well-known discovery files

Four new static files under `public/.well-known/`:

**`agent-skills/index.json`** (Agent Skills Discovery RFC v0.2.0)
```json
{
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "skills": [
    {
      "name": "portfolio-tools",
      "type": "webmcp",
      "description": "WebMCP tools for Thabet Amer's portfolio: get profile, list projects, search projects, get resume, get contact info",
      "url": "https://thabetamer.com/",
      "sha256": "<computed-after-deploy>"
    }
  ]
}
```
The `sha256` field is a digest of the skill content. For a WebMCP entry it can be computed as the SHA-256 of the `url` field value and updated after first deployment.

**`api-catalog`** (RFC 9727, served as `application/linkset+json`)
```json
{
  "linkset": [
    {
      "anchor": "https://thabetamer.com/",
      "describedby": [{"href": "https://thabetamer.com/llms.txt", "type": "text/plain"}],
      "service-doc": [{"href": "https://thabetamer.com/llms-full.txt", "type": "text/plain"}],
      "sitemap": [{"href": "https://thabetamer.com/sitemap-index.xml", "type": "application/xml"}]
    }
  ]
}
```

**`oauth-protected-resource`** (RFC 9728 stub, served as `application/json`)
```json
{
  "resource": "https://thabetamer.com/",
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": "https://thabetamer.com/llms.txt"
}
```
Declares the site is a public resource requiring no authorization.

**`http-message-signatures-directory`** (Web Bot Auth JWKS stub, served as `application/json`)
```json
{
  "keys": []
}
```
Satisfies discovery without requiring real key management (no outgoing bot requests from this site).

### 4. Content-Type headers — `public/_headers`

Add to existing file:

```
/.well-known/api-catalog
  Content-Type: application/linkset+json

/.well-known/oauth-protected-resource
  Content-Type: application/json

/.well-known/http-message-signatures-directory
  Content-Type: application/json

/.well-known/agent-skills/index.json
  Content-Type: application/json
```

### 5. WebMCP tools — `src/components/AgentTools.astro`

New component injected in `src/layouts/BaseLayout.astro` just before `</body>`. Data from `src/data/` files is inlined via `define:vars` at build time (no runtime fetch).

Registers 5 tools via `navigator.modelContext.provideContext()`, guarded by `if ('modelContext' in navigator)`:

| Tool | Input schema | Returns |
|------|-------------|---------|
| `get_profile` | `{}` | name, tagline, bio, counters (years/markets), services list |
| `list_projects` | `{}` | 21 portfolio projects: title, client, role, description, tags, year |
| `search_projects` | `{ tag: enum }` | filtered subset of projects by tag |
| `get_resume` | `{}` | experience array, education, certifications |
| `get_contact` | `{}` | email, LinkedIn URL, location |

Tags enum: `product | architecture | cloud | ai | devops | startups | saas | edtech | agritech | ict4d | gov`

Data sources:
- `src/data/work.ts` → `getPortfolioProjects()` for project tools
- `src/data/experience.ts` → experience array
- `src/data/credentials.ts` → certifications + education
- `src/i18n/en.json` → profile bio, tagline, counters
- Contact info hardcoded in `src/components/Contact.astro` (`email = 'hello@thabetamer.com'`, `linkedinUrl = 'https://linkedin.com/in/thabetamer'`). Inline directly in `AgentTools.astro` (same pattern as `BaseLayout.astro` which also hardcodes these values).

### 6. Cloudflare Dashboard (manual step)

Enable **Markdown for Agents** in the Cloudflare dashboard:
- Zone: thabetamer.com
- Location: AI Crawl Control section
- Effect: Cloudflare intercepts `Accept: text/markdown` requests at the network layer and converts HTML responses to Markdown automatically. No code changes needed.

## Files changed

| File | Change |
|------|--------|
| `src/middleware.ts` | Add `Link` header |
| `public/robots.txt` | Add `Content-Signal` line |
| `public/_headers` | Add Content-Type blocks for `.well-known/` |
| `src/components/AgentTools.astro` | New — WebMCP tool registration |
| `src/layouts/BaseLayout.astro` | Import and inject `<AgentTools />` |
| `public/.well-known/agent-skills/index.json` | New |
| `public/.well-known/api-catalog` | New |
| `public/.well-known/oauth-protected-resource` | New |
| `public/.well-known/http-message-signatures-directory` | New |
| Cloudflare Dashboard | Enable Markdown for Agents (manual) |

## Verification

1. `npm run build && npm run preview` — confirm site builds and runs
2. `curl -I https://thabetamer.com/` — verify `Link` header present in response
3. `curl https://thabetamer.com/robots.txt` — confirm `Content-Signal` line
4. `curl https://thabetamer.com/.well-known/api-catalog -H "Accept: application/linkset+json"` — confirm JSON response with correct Content-Type
5. `curl https://thabetamer.com/.well-known/agent-skills/index.json` — confirm skills index
6. `curl https://thabetamer.com/.well-known/oauth-protected-resource` — confirm stub JSON
7. Browser DevTools → check `navigator.modelContext` tool registration on page load
8. Run isitagentready.com audit again to confirm issues resolved
9. Cloudflare Dashboard: verify Markdown for Agents is enabled and test with `curl -H "Accept: text/markdown" https://thabetamer.com/`
