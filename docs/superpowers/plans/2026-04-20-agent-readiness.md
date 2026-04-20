# Agent Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make thabetamer.com discoverable and useful to AI agents by adding Link headers, Content Signals, well-known discovery files, and WebMCP browser tools.

**Architecture:** Static well-known JSON files in `public/.well-known/` handle discovery; `src/middleware.ts` adds `Link` response headers on all dynamic page responses; a new `AgentTools.astro` component injects WebMCP tool registration into `BaseLayout.astro`. Markdown for Agents is enabled via the Cloudflare dashboard (one manual step).

**Tech Stack:** Astro 5, Cloudflare Pages (`_headers`), Astro middleware, WebMCP (`navigator.modelContext`)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `public/robots.txt` | Modify | Add Content-Signal directive |
| `public/_headers` | Modify | Add Content-Type for .well-known files |
| `public/.well-known/api-catalog` | Create | RFC 9727 linkset pointing to site resources |
| `public/.well-known/oauth-protected-resource` | Create | RFC 9728 stub — public resource, no auth |
| `public/.well-known/http-message-signatures-directory` | Create | Web Bot Auth JWKS stub |
| `public/.well-known/agent-skills/index.json` | Create | Agent Skills Discovery index |
| `src/middleware.ts` | Modify | Add `Link` response header |
| `src/components/AgentTools.astro` | Create | WebMCP tool registration (5 tools) |
| `src/layouts/BaseLayout.astro` | Modify | Inject `<AgentTools />` |

---

## Task 1: Content Signals in robots.txt

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Add Content-Signal directive**

Open `public/robots.txt`. Current content:
```
User-agent: *
Allow: /
Sitemap: https://thabetamer.com/sitemap-index.xml
```

Add one line at the end so it becomes:
```
User-agent: *
Allow: /
Sitemap: https://thabetamer.com/sitemap-index.xml
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

- [ ] **Step 2: Verify**

Run: `cat public/robots.txt`
Expected: file ends with `Content-Signal: ai-train=yes, search=yes, ai-input=yes`

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add Content-Signal directives to robots.txt"
```

---

## Task 2: Content-Type headers for .well-known files

**Files:**
- Modify: `public/_headers`

- [ ] **Step 1: Append Content-Type blocks**

Open `public/_headers`. Append at the end of the file (after the existing `/favicon.svg` block):

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

- [ ] **Step 2: Verify**

Run: `cat public/_headers`
Expected: file ends with the four blocks above.

- [ ] **Step 3: Commit**

```bash
git add public/_headers
git commit -m "feat: add Content-Type headers for .well-known discovery files"
```

---

## Task 3: Well-known discovery files

**Files:**
- Create: `public/.well-known/api-catalog`
- Create: `public/.well-known/oauth-protected-resource`
- Create: `public/.well-known/http-message-signatures-directory`
- Create: `public/.well-known/agent-skills/index.json`

- [ ] **Step 1: Create `public/.well-known/api-catalog`**

```json
{
  "linkset": [
    {
      "anchor": "https://thabetamer.com/",
      "describedby": [
        { "href": "https://thabetamer.com/llms.txt", "type": "text/plain" }
      ],
      "service-doc": [
        { "href": "https://thabetamer.com/llms-full.txt", "type": "text/plain" }
      ],
      "sitemap": [
        { "href": "https://thabetamer.com/sitemap-index.xml", "type": "application/xml" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Create `public/.well-known/oauth-protected-resource`**

```json
{
  "resource": "https://thabetamer.com/",
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": "https://thabetamer.com/llms.txt"
}
```

- [ ] **Step 3: Create `public/.well-known/http-message-signatures-directory`**

```json
{
  "keys": []
}
```

- [ ] **Step 4: Create `public/.well-known/agent-skills/index.json`**

(The `agent-skills/` subdirectory is created implicitly by the file path.)

```json
{
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "skills": [
    {
      "name": "portfolio-tools",
      "type": "webmcp",
      "description": "WebMCP tools for Thabet Amer's portfolio: get profile, list projects, search projects by tag, get resume, get contact info",
      "url": "https://thabetamer.com/"
    }
  ]
}
```

Note: the `sha256` field can be added after first deployment (compute SHA-256 of the `url` string value).

- [ ] **Step 5: Verify all four files exist**

Run: `ls public/.well-known/`
Expected output includes: `api-catalog`, `http-message-signatures-directory`, `oauth-protected-resource`, `security.txt`, and `agent-skills/`

Run: `ls public/.well-known/agent-skills/`
Expected: `index.json`

- [ ] **Step 6: Commit**

```bash
git add public/.well-known/
git commit -m "feat: add well-known discovery files (api-catalog, agent-skills, oauth stubs)"
```

---

## Task 4: Link header in middleware

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Add Link header to middleware**

Open `src/middleware.ts`. Current content:

```typescript
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  return next().then((response) => {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    );
    return response;
  });
});
```

Add one line after the `Content-Security-Policy` set and before `return response`:

```typescript
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  return next().then((response) => {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    );
    response.headers.set(
      'Link',
      '</.well-known/agent-skills/index.json>; rel="agent-skills", </.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </sitemap-index.xml>; rel="sitemap"'
    );
    return response;
  });
});
```

- [ ] **Step 2: Build to verify no TypeScript errors**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add RFC 8288 Link response header for agent discovery"
```

---

## Task 5: AgentTools.astro component

**Files:**
- Create: `src/components/AgentTools.astro`

This component has no visible output — it only runs a script. Data is serialized from server-side data files at build time via `define:vars` and registered as WebMCP tools in the browser.

- [ ] **Step 1: Create `src/components/AgentTools.astro`**

```astro
---
import { getPortfolioProjects } from '../data/work.ts';
import { experiences } from '../data/experience.ts';
import { certifications, education } from '../data/credentials.ts';
import { services } from '../data/services.ts';

const projects = getPortfolioProjects().map(p => ({
  id: p.id,
  title: p.title.en,
  client: p.client.en,
  role: p.role.en,
  description: p.description.en,
  tags: p.tags,
  year: p.year
}));

const experienceData = experiences.map(e => ({
  title: e.title.en,
  company: e.company.en,
  period: e.period,
  type: e.type
}));

const certificationData = certifications.map(c => ({
  name: c.name.en,
  issuer: c.issuer.en,
  year: c.year,
  url: c.url
}));

const educationData = education.map(e => ({
  degree: e.degree.en,
  institution: e.institution.en,
  field: e.field?.en
}));

const serviceData = services.map(s => ({
  title: s.title.en,
  description: s.description.en
}));

const profile = {
  name: 'Thabet Amer',
  tagline: 'Technical Leader | Product & Cloud Architecture',
  bio: 'Building scalable systems and leading product teams across 15+ countries. I bridge the gap between technical excellence and business outcomes, specializing in cloud-native solutions and AI-driven platforms.',
  yearsOfExperience: '15+',
  marketsServed: '20+',
  services: serviceData
};

const contact = {
  email: 'hello@thabetamer.com',
  linkedin: 'https://linkedin.com/in/thabetamer',
  github: 'https://github.com/thabetamer'
};
---

<script define:vars={{ projects, experienceData, certificationData, educationData, profile, contact }}>
  if ('modelContext' in navigator) {
    navigator.modelContext.provideContext({
      tools: [
        {
          name: 'get_profile',
          description: "Returns Thabet Amer's professional profile: bio, tagline, years of experience, markets served, and services offered.",
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => profile
        },
        {
          name: 'list_projects',
          description: 'Returns all portfolio projects with title, client, role, description, tags, and year.',
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => projects
        },
        {
          name: 'search_projects',
          description: 'Filter portfolio projects by tag. Available tags: product, architecture, cloud, ai, devops, startups, saas, edtech, agritech, ict4d, gov.',
          inputSchema: {
            type: 'object',
            properties: {
              tag: {
                type: 'string',
                enum: ['product', 'architecture', 'cloud', 'ai', 'devops', 'startups', 'saas', 'edtech', 'agritech', 'ict4d', 'gov']
              }
            },
            required: ['tag'],
            additionalProperties: false
          },
          execute: async ({ tag }) => projects.filter(p => p.tags.includes(tag))
        },
        {
          name: 'get_resume',
          description: "Returns Thabet's work experience history, certifications, and education.",
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => ({
            experience: experienceData,
            certifications: certificationData,
            education: educationData
          })
        },
        {
          name: 'get_contact',
          description: "Returns Thabet's contact information: email, LinkedIn, and GitHub.",
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: async () => contact
        }
      ]
    });
  }
</script>
```

- [ ] **Step 2: Build to verify no TypeScript/Astro errors**

Run: `npm run build`
Expected: build completes with no errors. If there are import errors for `getPortfolioProjects`, verify it is exported from `src/data/work.ts` at line 532.

- [ ] **Step 3: Commit**

```bash
git add src/components/AgentTools.astro
git commit -m "feat: add AgentTools component with WebMCP tool registration"
```

---

## Task 6: Inject AgentTools into BaseLayout + verify

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Import and inject AgentTools**

Open `src/layouts/BaseLayout.astro`. In the frontmatter (between the `---` fences), add one import after the existing imports:

```typescript
import AgentTools from '../components/AgentTools.astro';
```

Existing imports at top of frontmatter:
```typescript
import '../styles/global.css';
import { getDir, type Lang } from '../i18n/ui';
import ScrollToTop from '../components/ScrollToTop.astro';
```

After adding import:
```typescript
import '../styles/global.css';
import { getDir, type Lang } from '../i18n/ui';
import ScrollToTop from '../components/ScrollToTop.astro';
import AgentTools from '../components/AgentTools.astro';
```

Then in the HTML body, after `<ScrollToTop />` (line ~151) and before the `<script is:inline>` block, add:

```html
  <body class="bg-background text-foreground min-h-screen antialiased">
    <slot />
    <ScrollToTop />
    <AgentTools />

    <!-- Intersection Observer for scroll animations -->
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Preview and verify WebMCP in DevTools**

Run: `npm run preview`

Open http://localhost:4321 in a browser. Open DevTools console and run:

```javascript
'modelContext' in navigator
```

Expected: `false` (WebMCP not yet available in standard browsers — the guard prevents errors). The script itself should not throw.

Then verify the built output contains the serialized data by running:

```bash
grep -l "get_profile" dist/
```

Expected: finds `dist/_worker.js/index.js` or similar — confirms the tool definitions were compiled into the bundle.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: inject AgentTools WebMCP registration into BaseLayout"
```

---

## Task 7: Cloudflare Dashboard — Markdown for Agents (manual)

This step cannot be automated. It enables Markdown content negotiation at the Cloudflare network layer.

- [ ] **Step 1: Enable Markdown for Agents**

1. Log in to the Cloudflare dashboard
2. Select the `thabetamer.com` zone
3. Navigate to **AI** → **AI Crawl Control** (or search "Markdown for Agents")
4. Enable the **Markdown for Agents** toggle

- [ ] **Step 2: Verify after deployment**

After deploying to production, run:

```bash
curl -s -H "Accept: text/markdown" https://thabetamer.com/ | head -20
```

Expected: response body starts with Markdown (e.g. `# Thabet Amer` or similar), not HTML.
Expected: response includes `Content-Type: text/markdown` header.

---

## Post-deploy verification checklist

Run these after deploying to production:

```bash
# Link headers present
curl -sI https://thabetamer.com/ | grep -i link

# Content-Signal in robots.txt
curl -s https://thabetamer.com/robots.txt | grep Content-Signal

# API catalog (check Content-Type header)
curl -sI https://thabetamer.com/.well-known/api-catalog

# Agent Skills index
curl -s https://thabetamer.com/.well-known/agent-skills/index.json

# OAuth protected resource stub
curl -s https://thabetamer.com/.well-known/oauth-protected-resource

# Web Bot Auth JWKS stub
curl -s https://thabetamer.com/.well-known/http-message-signatures-directory

# Markdown negotiation (after Cloudflare dashboard step)
curl -s -I -H "Accept: text/markdown" https://thabetamer.com/ | grep content-type
```

Then re-run the isitagentready.com audit to confirm all issues are resolved.
