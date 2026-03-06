import { useEffect, useRef, useState } from 'react';
import { getMapMarkers } from '../data/work';
import { t, type Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
}

export default function GlobalMap({ lang }: Props) {
  const mapMarkers = getMapMarkers();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    country: string;
    clients: Array<{ name: string; project: string }>;
  }>({
    visible: false,
    x: 0,
    y: 0,
    country: '',
    clients: [],
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const markers = mapContainerRef.current?.querySelectorAll('.map-marker');
    if (!markers) return;

    const cleanups: (() => void)[] = [];

    markers.forEach((marker) => {
      const handleMouseEnter = (e: Event) => {
        const target = e.currentTarget as SVGGElement;
        const country = target.dataset.country || '';
        let clients: Array<{ name: string; project: string }> = [];
        try { clients = JSON.parse(target.dataset.clients || '[]'); } catch { return; }

        const circle = target.querySelector('.marker-dot') as SVGCircleElement;
        if (!circle || !svgRef.current) return;

        const svg = svgRef.current;
        const svgRect = svg.getBoundingClientRect();
        const containerRect = mapContainerRef.current?.getBoundingClientRect();

        if (!containerRect) return;

        const cx = parseFloat(circle.getAttribute('cx') || '0');
        const cy = parseFloat(circle.getAttribute('cy') || '0');

        const viewBox = svg.viewBox.baseVal;
        const scaleX = svgRect.width / viewBox.width;
        const scaleY = svgRect.height / viewBox.height;

        const screenX = cx * scaleX + (svgRect.left - containerRect.left);
        const screenY = cy * scaleY + (svgRect.top - containerRect.top);

        setTooltip({
          visible: true,
          x: screenX,
          y: screenY - 10,
          country,
          clients,
        });
      };

      const handleMouseLeave = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
      };

      marker.addEventListener('mouseenter', handleMouseEnter);
      marker.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        marker.removeEventListener('mouseenter', handleMouseEnter);
        marker.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <section className="py-12 mb-20 animate-on-scroll" id="global-reach">
      <h2 className="text-section-heading text-sm font-medium uppercase tracking-wider mb-8">
        {t(lang, 'globalReach.title')}
      </h2>

      <div className="relative w-full">
        <div className="map-container relative overflow-visible" ref={mapContainerRef}>
          <img
            src="/images/world-map.svg"
            alt="World Map"
            className="world-map-image w-full h-auto"
            width={896}
            height={472}
            loading="lazy"
            decoding="async"
          />

          <svg
            ref={svgRef}
            viewBox="0 0 895.92 471.76"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mapMarkers.map((marker) => (
              <g
                key={marker.location.id}
                className="map-marker cursor-pointer pointer-events-auto"
                data-location-id={marker.location.id}
                data-country={marker.location.country[lang]}
                data-clients={JSON.stringify(
                  marker.projects.map((p) => ({
                    name: p.client[lang],
                    project: p.title[lang],
                  }))
                )}
              >
                <circle
                  cx={marker.location.coordinates.x}
                  cy={marker.location.coordinates.y}
                  r="8"
                  className="fill-none stroke-primary/40 marker-pulse"
                  strokeWidth="2"
                />
                <circle
                  cx={marker.location.coordinates.x}
                  cy={marker.location.coordinates.y}
                  r="4"
                  className="fill-primary marker-dot transition-all duration-300"
                />
              </g>
            ))}
          </svg>

          {tooltip.visible && (
            <div
              className="absolute pointer-events-none z-10 transition-opacity duration-200 opacity-100"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="bg-card border border-border rounded-lg shadow-lg p-3 min-w-[180px] max-w-[240px]">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  {tooltip.country}
                </h4>
                <div className="space-y-1.5">
                  {tooltip.clients.map((client, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="text-muted-foreground">{client.name}</span>
                      <span className="block text-foreground/70">{client.project}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-border mx-auto -mt-px"></div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .map-container {
          aspect-ratio: 895.92 / 471.76;
        }

        .world-map-image {
          opacity: 0.85;
        }

        :global(.dark) .world-map-image {
          opacity: 0.9;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }

        .marker-pulse {
          will-change: transform, opacity;
          transform-origin: center;
          transform-box: fill-box;
          animation: pulse-ring 2s ease-out infinite;
        }

        .map-paused .marker-pulse {
          animation-play-state: paused;
        }

        .map-marker:hover .marker-dot {
          r: 6;
        }

        .map-marker:hover .marker-pulse {
          animation-duration: 1s;
        }
      `}</style>
    </section>
  );
}
