'use client';

// CSS-only film grain: SVG feTurbulence rendered once as a GPU texture,
// animated via CSS transform (no JS per frame, no canvas pixel writes).
export function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
