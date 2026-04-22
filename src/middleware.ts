import { defineMiddleware } from 'astro:middleware';
import llmsContent from '../public/llms-full.txt?raw';

export const onRequest = defineMiddleware((context, next) => {
  const accept = context.request.headers.get('Accept') ?? '';
  if (accept.includes('text/markdown')) {
    return new Response(llmsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Vary': 'Accept',
      },
    });
  }

  return next().then((response) => {
    response.headers.set('Vary', 'Accept');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    );
    response.headers.append(
      'Link',
      '</.well-known/agent-skills/index.json>; rel="agent-skills", </.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", </sitemap-index.xml>; rel="sitemap"'
    );
    return response;
  });
});
