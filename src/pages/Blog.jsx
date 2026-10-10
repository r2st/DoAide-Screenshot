import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const POSTS = [
  {
    slug: 'image-annotation-remote-teams-guide',
    title: 'Image Annotation and Screenshot Markup for Remote Teams: A Complete Guide',
    description: 'How remote teams in India and worldwide use screenshot annotation and image markup to communicate faster. Free tools, workflows, and best practices.',
    date: '2025-10-16',
    readTime: '8 min read',
    tags: ['Annotation', 'Remote Work'],
  },
  {
    slug: 'website-screenshot-seo-audit-guide',
    title: 'How to Use Website Screenshots for SEO Audits and Competitor Analysis',
    description: 'Learn how website screenshots help with SEO audits, competitor research, and visual regression testing. Free tools and workflows for digital marketers.',
    date: '2025-10-14',
    readTime: '9 min read',
    tags: ['SEO', 'Website Capture'],
  },
  {
    slug: 'screen-capture-guide-windows-mac-linux',
    title: 'How to Take Screen Captures on Windows, Mac, and Linux in 2025',
    description: 'Complete guide to screen capture on every platform. Keyboard shortcuts, built-in tools, and free online screenshot tools for Windows, Mac, and Linux.',
    date: '2025-10-12',
    readTime: '8 min read',
    tags: ['Screen Capture', 'Productivity'],
  },
  {
    slug: 'how-to-create-beautiful-code-screenshots',
    title: 'How to Create Beautiful Code Screenshots for Social Media',
    description: 'Learn to make eye-catching code screenshots that stand out on Twitter, LinkedIn, and dev blogs. Step-by-step guide with free tools.',
    date: '2025-10-08',
    readTime: '6 min read',
    tags: ['Code', 'Social Media', 'Developer Tools'],
  },
  {
    slug: 'screenshot-annotation-complete-guide',
    title: 'The Complete Guide to Screenshot Annotation and Markup',
    description: 'Master screenshot annotation with arrows, highlights, blur, and text. Perfect for bug reports, tutorials, and documentation.',
    date: '2025-10-05',
    readTime: '7 min read',
    tags: ['Annotation', 'Productivity', 'Documentation'],
  },
  {
    slug: 'free-screenshot-tools-for-designers-2025',
    title: '9 Free Screenshot Tools Every Designer Should Know in 2025',
    description: 'The best free screenshot and mockup tools for UI/UX designers. Browser mockups, phone frames, comparison sliders, and more.',
    date: '2025-10-01',
    readTime: '8 min read',
    tags: ['Design', 'Free Tools', 'UI/UX'],
  },
];

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog - DoAide Screenshot';
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Blog</h1>
        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
          Tips, guides, and tutorials for creating better screenshots, mockups, and visual content.
        </p>

        <div className="space-y-6">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group p-6 rounded-2xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600 transition-all no-underline"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm mb-3">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>&#183;</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
