import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function CodeScreenshotGuide() {
  useEffect(() => {
    document.title = 'How to Create Beautiful Code Screenshots for Social Media - DoAide Screenshot';
  }, []);

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/blog" className="text-brand-gold text-sm hover:underline no-underline mb-6 inline-block">&larr; Back to Blog</Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Code</span>
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Social Media</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            How to Create Beautiful Code Screenshots for Social Media
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>October 8, 2025</span>
            <span>&#183;</span>
            <span>6 min read</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p className="text-lg text-slate-300 leading-relaxed">
            Sharing code on social media can be a great way to teach, show off your work, or spark discussions.
            But raw text screenshots often look messy and hard to read. Here's how to create polished code screenshots
            that grab attention and actually get engagement.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Code Screenshots Matter</h2>
          <p>
            A well-formatted code screenshot does three things: it's <strong className="text-white">readable</strong> even
            at small sizes, it <strong className="text-white">catches the eye</strong> in a busy feed, and
            it <strong className="text-white">provides context</strong> through syntax highlighting and file names.
            Plain text in a tweet gets scrolled past. A beautifully styled code block stops the thumb.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Choose the Right Theme</h2>
          <p>
            The theme sets the mood. Dark themes like <strong className="text-white">Dracula</strong>, <strong className="text-white">One Dark</strong>,
            and <strong className="text-white">Tokyo Night</strong> are developer favorites because they're easy on the eyes and look
            professional. Light themes like <strong className="text-white">GitHub Light</strong> work better for documentation or
            blog posts where the surrounding content is also light.
          </p>
          <p>
            Pro tip: match your theme to the platform. Dark themes pop on Twitter's dark mode. Light themes
            work well on LinkedIn where many users are in light mode during work hours.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: Pick the Right Background</h2>
          <p>
            A solid gradient background transforms a flat code block into something eye-catching. Purple-to-blue
            gradients are the most popular for a reason: they provide contrast without competing with the code.
            But don't be afraid to experiment with warmer tones or minimal transparent backgrounds.
          </p>
          <p>
            Padding matters too. Give your code room to breathe. A padding of 32-48 pixels creates a nice
            frame effect that separates the code from the surrounding content.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Show Only What Matters</h2>
          <p>
            The biggest mistake people make is screenshotting too much code. Social media is for quick consumption.
            Keep your snippets to <strong className="text-white">15 lines or fewer</strong>. If you need to show more, create a
            thread or link to a gist.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>Remove imports that aren't relevant to the point</li>
            <li>Trim unnecessary blank lines</li>
            <li>Use a descriptive filename (e.g., <code className="text-brand-gold bg-slate-800 px-1 rounded">useAuth.ts</code> instead of <code className="text-brand-gold bg-slate-800 px-1 rounded">untitled.js</code>)</li>
            <li>Highlight the key line with a comment if needed</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Export at High Resolution</h2>
          <p>
            Always export at 2x resolution. Social media platforms compress images, and a 1x export will look
            blurry on retina displays. Most screenshot tools (including our <Link to="/code" className="text-brand-gold hover:underline">Code Screenshot tool</Link>)
            export at 2x by default.
          </p>
          <p>
            Use PNG format for code screenshots. JPG compression creates artifacts around text that make code
            harder to read.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Add Context</h2>
          <p>
            A screenshot without context is just pretty code. Add a window title bar with the filename. Include
            line numbers if you're referencing specific lines. And always write a good caption that explains
            <em> why</em> this code is interesting, not just what it does.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tools to Use</h2>
          <p>
            You don't need to install anything. <Link to="/code" className="text-brand-gold hover:underline">DoAide Screenshot</Link> runs
            entirely in your browser. Paste your code, pick a theme and gradient, and download a polished PNG
            in seconds. It supports 20+ languages and 21 themes, with line numbers and window frames built in.
          </p>

          <div className="mt-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
            <p className="text-white font-semibold mb-3">Ready to create your first code screenshot?</p>
            <Link to="/code" className="inline-block px-6 py-3 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors no-underline">
              Try the Code Screenshot Tool
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
