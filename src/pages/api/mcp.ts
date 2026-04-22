export const prerender = false;

import type { APIRoute } from 'astro';
import { getPortfolioProjects, getPortfolioProjectsByTag, getWorkById } from '../../data/work';
import type { ProjectTag } from '../../data/work';
import { experiences } from '../../data/experience';
import { certifications, education } from '../../data/credentials';
import { services } from '../../data/services';

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, mcp-protocol-version, mcp-session-id',
  'Access-Control-Max-Age': '86400',
};

// ---------------------------------------------------------------------------
// JSON-RPC helpers
// ---------------------------------------------------------------------------

function ok(id: string | number | null, result: unknown): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id, result }), {
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(id: string | number | null, code: number, message: string): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }), {
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

// ---------------------------------------------------------------------------
// Data projections — shape matches AgentTools.astro where tools overlap
// ---------------------------------------------------------------------------

function profileData() {
  return {
    name: 'Thabet Amer',
    tagline: 'Technical Leader | Product & Cloud Architecture',
    bio: 'Building scalable systems and leading product teams across 15+ countries. I bridge the gap between technical excellence and business outcomes, specializing in cloud-native solutions and AI-driven platforms.',
    yearsOfExperience: '15+',
    marketsServed: '20+',
    services: services.map(s => ({ title: s.title.en, description: s.description.en })),
  };
}

function projectList() {
  return getPortfolioProjects().map(p => ({
    id: p.id,
    title: p.title.en,
    client: p.client.en,
    role: p.role.en,
    description: p.description.en,
    tags: p.tags,
    year: p.year,
  }));
}

function projectsByTag(tag: ProjectTag) {
  return getPortfolioProjectsByTag(tag).map(p => ({
    id: p.id,
    title: p.title.en,
    client: p.client.en,
    role: p.role.en,
    description: p.description.en,
    tags: p.tags,
    year: p.year,
  }));
}

function projectById(id: string) {
  const p = getWorkById(id);
  if (!p) return null;
  return {
    id: p.id,
    title: p.title.en,
    client: p.client.en,
    role: p.role.en,
    description: p.description.en,
    details: p.details?.en ?? null,
    tags: p.tags,
    year: p.year,
    image: p.image,
  };
}

function experienceList() {
  return experiences.map(e => ({
    title: e.title.en,
    company: e.company.en,
    period: e.period,
    type: e.type,
  }));
}

function certificationList() {
  return {
    certifications: certifications.map(c => ({
      name: c.name.en,
      issuer: c.issuer.en,
      year: c.year,
      url: c.url ?? null,
    })),
    education: education.map(e => ({
      degree: e.degree.en,
      institution: e.institution.en,
      field: e.field?.en ?? null,
    })),
  };
}

function contactData() {
  return {
    email: 'hello@thabetamer.com',
    linkedin: 'https://linkedin.com/in/thabetamer',
    github: 'https://github.com/thabetamer',
  };
}

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const VALID_TAGS: ProjectTag[] = ['product', 'architecture', 'cloud', 'ai', 'devops', 'startups', 'saas', 'edtech', 'agritech', 'ict4d', 'gov'];

const TOOLS = [
  {
    name: 'get_profile',
    description: "Returns Thabet Amer's professional profile: bio, tagline, years of experience, markets served, and services offered.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_projects',
    description: 'Returns all portfolio projects with id, title, client, role, description, tags, and year.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'search_projects_by_tag',
    description: 'Filter portfolio projects by tag. Available tags: product, architecture, cloud, ai, devops, startups, saas, edtech, agritech, ict4d, gov.',
    inputSchema: {
      type: 'object',
      properties: {
        tag: {
          type: 'string',
          enum: VALID_TAGS,
          description: 'The tag to filter by.',
        },
      },
      required: ['tag'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_project',
    description: 'Returns a single portfolio project by its id, including full details and image. Use list_projects to discover valid ids.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Project id, e.g. "nft-co" or "souktel".' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_experience',
    description: "Returns Thabet's career timeline: all roles with title, company, period, and type (leadership/technical/hybrid/founder).",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_certifications',
    description: "Returns Thabet's professional certifications and educational degrees with verification URLs.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_contact',
    description: "Returns Thabet's contact information: email, LinkedIn, and GitHub.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
];

// ---------------------------------------------------------------------------
// Tool dispatcher
// ---------------------------------------------------------------------------

function callTool(name: string, args: Record<string, unknown>): { data?: unknown; error?: string } {
  switch (name) {
    case 'get_profile':    return { data: profileData() };
    case 'list_projects':  return { data: projectList() };
    case 'get_experience': return { data: experienceList() };
    case 'get_certifications': return { data: certificationList() };
    case 'get_contact':    return { data: contactData() };

    case 'search_projects_by_tag': {
      const tag = args.tag as string | undefined;
      if (!tag || !VALID_TAGS.includes(tag as ProjectTag)) {
        return { error: `Invalid tag "${tag}". Must be one of: ${VALID_TAGS.join(', ')}.` };
      }
      return { data: projectsByTag(tag as ProjectTag) };
    }

    case 'get_project': {
      const id = args.id as string | undefined;
      if (!id || typeof id !== 'string') return { error: 'Missing required parameter: id (string).' };
      const project = projectById(id);
      if (!project) return { error: `No project found with id "${id}".` };
      return { data: project };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ---------------------------------------------------------------------------
// MCP method handlers
// ---------------------------------------------------------------------------

function handleInitialize(id: string | number | null): Response {
  return ok(id, {
    protocolVersion: '2025-11-25',
    capabilities: { tools: {} },
    serverInfo: {
      name: 'thabetamer-portfolio',
      title: 'Thabet Amer Portfolio',
      version: '1.0.0',
      description: 'Portfolio MCP server for Thabet Amer — Technical Leader & Solutions Architect.',
      websiteUrl: 'https://thabetamer.com',
    },
  });
}

function handleToolsList(id: string | number | null): Response {
  return ok(id, { tools: TOOLS });
}

function handleToolsCall(id: string | number | null, params: Record<string, unknown>): Response {
  const name = params?.name as string | undefined;
  const args = (params?.arguments ?? {}) as Record<string, unknown>;

  if (!name || typeof name !== 'string') {
    return err(id, -32602, 'Invalid params: "name" (string) is required.');
  }
  if (!TOOLS.find(t => t.name === name)) {
    return err(id, -32601, `Method not found: tool "${name}" does not exist.`);
  }

  const { data, error } = callTool(name, args);

  return ok(id, {
    content: [{ type: 'text', text: error ?? JSON.stringify(data, null, 2) }],
    isError: !!error,
  });
}

// ---------------------------------------------------------------------------
// Route exports
// ---------------------------------------------------------------------------

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: CORS });

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return err(null, -32700, 'Parse error: request body is not valid JSON.');
  }

  const rpc = body as Record<string, unknown>;

  if (rpc.jsonrpc !== '2.0') {
    return err(null, -32600, 'Invalid Request: jsonrpc must be "2.0".');
  }

  // Notifications have no "id" field — must not return a JSON-RPC response
  if (!('id' in rpc)) {
    return new Response(null, { status: 202, headers: CORS });
  }

  const id = (rpc.id ?? null) as string | number | null;
  const method = rpc.method as string | undefined;
  const params = (rpc.params ?? {}) as Record<string, unknown>;

  if (!method || typeof method !== 'string') {
    return err(id, -32600, 'Invalid Request: "method" (string) is required.');
  }

  switch (method) {
    case 'initialize':   return handleInitialize(id);
    case 'tools/list':  return handleToolsList(id);
    case 'tools/call':  return handleToolsCall(id, params);
    default:            return err(id, -32601, `Method not found: "${method}".`);
  }
};
