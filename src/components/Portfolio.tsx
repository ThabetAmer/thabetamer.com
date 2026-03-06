import { useState, useEffect } from 'react';
import { getPortfolioProjects, getAllPortfolioTags, type ProjectTag } from '../data/work';
import { t, type Lang } from '../i18n/ui';
import Icon from './Icon.astro';

interface Props {
  lang: Lang;
}

const tagLabels: Record<ProjectTag, string> = {
  product: 'Product Development',
  architecture: 'Software Architecture',
  cloud: 'Cloud',
  ai: 'AI',
  gov: 'Gov/NGO',
  startups: 'Startup',
  saas: 'SaaS',
  edtech: 'EdTech',
  agritech: 'Agritech',
  ict4d: 'ICT4D'
};

const cardTagLabels: Record<string, Record<Lang, string>> = {
  product: { en: 'Product Development', ar: 'تطوير المنتج' },
  architecture: { en: 'Software Architecture', ar: 'هندسة البرمجيات' },
  cloud: { en: 'Cloud', ar: 'سحابة' },
  ai: { en: 'AI', ar: 'ذكاء اصطناعي' },
  gov: { en: 'Gov/NGO', ar: 'حكومي' },
  startups: { en: 'Startup', ar: 'ناشئة' },
  saas: { en: 'SaaS', ar: 'SaaS' },
  edtech: { en: 'EdTech', ar: 'EdTech' },
  agritech: { en: 'AgriTech', ar: 'AgriTech' },
  ict4d: { en: 'ICT4D', ar: 'ICT4D' }
};

export default function Portfolio({ lang }: Props) {
  const projects = getPortfolioProjects();
  const allTags = getAllPortfolioTags();
  const [activeFilter, setActiveFilter] = useState<ProjectTag>(allTags[0]);
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  // Update visible projects when filter changes
  useEffect(() => {
    const newVisible = new Set<string>();
    projects.forEach((project) => {
      if (project.tags.includes(activeFilter)) {
        newVisible.add(project.id);
      }
    });
    setVisibleProjects(newVisible);
  }, [activeFilter, projects]);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <section id="portfolio" className="mb-20 animate-on-scroll">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <h2 className="text-sm font-medium tracking-widest text-section-heading uppercase">
          {t(lang, 'portfolio.title')}
        </h2>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filter projects">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={activeFilter === tag}
              onClick={() => setActiveFilter(tag)}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out border ${activeFilter === tag
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border hover:border-muted-foreground hover:text-foreground'
                }`}
            >
              {tagLabels[tag]}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <article
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className={`project-card group rounded-xl border border-border bg-secondary/50 overflow-hidden transition-all duration-300 ease-out hover:border-muted-foreground/50 cursor-pointer ${visibleProjects.has(project.id)
              ? 'opacity-100 transform-none'
              : 'opacity-0 translate-y-2 hidden'
              }`}
            style={{
              animationDelay: `${index * 75}ms`,
            }}
          >
            {/* Project Image */}
            <div className="aspect-video bg-background overflow-hidden">
              <img
                src={project.image}
                alt={project.title[lang]}
                className="w-full h-full object-cover img-grayscale hover-scale"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                  {project.title[lang]}
                </h3>
                <svg
                  className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {project.client[lang]} &middot; {project.year}
              </p>

              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-muted text-muted-foreground mb-4">
                {project.role[lang]}
              </span>

              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {project.description[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-sm rounded-full border border-border text-muted-foreground"
                  >
                    {cardTagLabels[tag]?.[lang] || tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-2xl border border-border">
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 end-4 z-10 p-2 rounded-lg bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close preview"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image */}
            <div className="aspect-video bg-muted">
              <img
                src={selectedProject.image}
                alt={selectedProject.title[lang]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {selectedProject.title[lang]}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {selectedProject.client[lang]} · {selectedProject.year}
              </p>

              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-muted text-muted-foreground mb-4">
                {selectedProject.role[lang]}
              </span>

              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {selectedProject.description[lang]}
              </p>

              {selectedProject.details?.[lang] && (
                <div className="text-base text-muted-foreground leading-relaxed mb-4 pt-4 border-t border-border">
                  {selectedProject.details[lang]}
                </div>
              )}

              <p className="text-sm text-muted-foreground/70">
                {selectedProject.tags
                  .map((tag) => cardTagLabels[tag]?.[lang] || tag)
                  .join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .project-card {
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .img-grayscale {
          filter: grayscale(100%);
          transition: filter 0.3s ease-out;
        }

        .group:hover .img-grayscale {
          filter: grayscale(0%);
        }

        .hover-scale {
          transition: transform 0.3s ease-out;
        }

        .group:hover .hover-scale {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
