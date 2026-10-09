import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blog from '../pages/Blog';
import CodeScreenshotGuide from '../pages/blog/CodeScreenshotGuide';
import AnnotationGuide from '../pages/blog/AnnotationGuide';
import FreeScreenshotTools2025 from '../pages/blog/FreeScreenshotTools2025';

describe('Blog index page', () => {
  it('renders the blog title', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    expect(screen.getByText('Blog')).toBeTruthy();
  });

  it('lists all blog posts', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    expect(screen.getByText(/how to create beautiful code screenshots/i)).toBeTruthy();
    expect(screen.getByText(/complete guide to screenshot annotation/i)).toBeTruthy();
    expect(screen.getByText(/free screenshot tools/i)).toBeTruthy();
  });
});

describe('Blog posts', () => {
  it('renders CodeScreenshotGuide', () => {
    render(
      <MemoryRouter>
        <CodeScreenshotGuide />
      </MemoryRouter>
    );
    expect(screen.getByText(/how to create beautiful code screenshots/i)).toBeTruthy();
    expect(screen.getByText(/back to blog/i)).toBeTruthy();
  });

  it('renders AnnotationGuide', () => {
    render(
      <MemoryRouter>
        <AnnotationGuide />
      </MemoryRouter>
    );
    expect(screen.getByText(/complete guide to screenshot annotation/i)).toBeTruthy();
  });

  it('renders FreeScreenshotTools2025', () => {
    render(
      <MemoryRouter>
        <FreeScreenshotTools2025 />
      </MemoryRouter>
    );
    expect(screen.getByText(/free screenshot tools every designer/i)).toBeTruthy();
  });

  it('blog posts have internal links to tools', () => {
    const { container } = render(
      <MemoryRouter>
        <FreeScreenshotTools2025 />
      </MemoryRouter>
    );
    const links = Array.from(container.querySelectorAll('a'));
    const hrefs = links.map(l => l.getAttribute('href'));
    expect(hrefs.some(h => h === '/code')).toBe(true);
    expect(hrefs.some(h => h === '/annotate')).toBe(true);
    expect(hrefs.some(h => h === '/crop')).toBe(true);
  });
});
