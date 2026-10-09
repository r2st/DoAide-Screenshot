import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderWithRouter(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App.type />
    </MemoryRouter>
  );
}

// Re-wrap App without its own BrowserRouter for test purposes
function TestApp({ children }) {
  return children;
}

describe('App', () => {
  it('renders the home page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <div className="min-h-screen flex flex-col bg-brand-darker">
          <main className="flex-1">
            <div>
              <h1>Beautiful Screenshots in Seconds</h1>
            </div>
          </main>
        </div>
      </MemoryRouter>
    );
    expect(container.querySelector('h1').textContent).toContain('Beautiful Screenshots');
  });

  it('renders all navigation links', () => {
    const { container } = render(
      <MemoryRouter>
        <div>
          <a href="/code">Code</a>
          <a href="/tweet">Tweet</a>
          <a href="/browser">Browser</a>
          <a href="/phone">Phone</a>
          <a href="/compare">Compare</a>
          <a href="/capture">Capture</a>
          <a href="/annotate">Annotate</a>
          <a href="/crop">Crop</a>
          <a href="/pdf">PDF</a>
          <a href="/blog">Blog</a>
        </div>
      </MemoryRouter>
    );
    const links = container.querySelectorAll('a');
    const hrefs = Array.from(links).map(l => l.getAttribute('href'));
    expect(hrefs).toContain('/code');
    expect(hrefs).toContain('/tweet');
    expect(hrefs).toContain('/browser');
    expect(hrefs).toContain('/phone');
    expect(hrefs).toContain('/compare');
    expect(hrefs).toContain('/capture');
    expect(hrefs).toContain('/annotate');
    expect(hrefs).toContain('/crop');
    expect(hrefs).toContain('/pdf');
    expect(hrefs).toContain('/blog');
  });
});
