import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function ScreenCaptureGuide() {
  useEffect(() => {
    document.title = 'How to Take Screen Captures on Windows, Mac, and Linux in 2025 - DoAide Screenshot';

    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'How to Take Screen Captures on Windows, Mac, and Linux in 2025',
      description: 'Complete guide to screen capture on every platform. Learn keyboard shortcuts, built-in tools, and free online screenshot tools for Windows, Mac, and Linux.',
      datePublished: '2025-10-12',
      dateModified: '2025-10-12',
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://screenshot.doaide.com' },
      publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://screenshot.doaide.com', logo: { '@type': 'ImageObject', url: 'https://screenshot.doaide.com/logo.png' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://screenshot.doaide.com/blog/screen-capture-guide-windows-mac-linux' },
      image: 'https://screenshot.doaide.com/og-screen-capture.png',
      wordCount: 900,
      inLanguage: 'en',
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I take a screenshot on Windows without installing software?',
          acceptedAnswer: { '@type': 'Answer', text: 'Press Windows + Shift + S to open Snipping Tool. You can also use Print Screen to capture the full screen or Alt + Print Screen for the active window. For advanced editing, use a free online tool like DoAide Screenshot.' },
        },
        {
          '@type': 'Question',
          name: 'What is the shortcut for screen capture on Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Press Command + Shift + 3 for full screen, Command + Shift + 4 for a selected area, or Command + Shift + 5 to open the screenshot toolbar with recording options.' },
        },
        {
          '@type': 'Question',
          name: 'Can I take a screenshot of a website without a browser extension?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tools like DoAide Screenshot let you enter a URL and capture a full-page screenshot online without any extension or installation. Your data stays in your browser.' },
        },
        {
          '@type': 'Question',
          name: 'Which free screen capture tool is best for Indian users?',
          acceptedAnswer: { '@type': 'Answer', text: 'DoAide Screenshot is a free, privacy-first screen capture tool that works entirely in your browser. No downloads, no account required, and no data leaves your device — ideal for users in India who need a fast, lightweight solution.' },
        },
      ],
    };

    const scriptBlog = document.createElement('script');
    scriptBlog.type = 'application/ld+json';
    scriptBlog.textContent = JSON.stringify(blogSchema);
    scriptBlog.id = 'schema-blog-screen-capture';
    document.head.appendChild(scriptBlog);

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.textContent = JSON.stringify(faqSchema);
    scriptFaq.id = 'schema-faq-screen-capture';
    document.head.appendChild(scriptFaq);

    return () => {
      document.getElementById('schema-blog-screen-capture')?.remove();
      document.getElementById('schema-faq-screen-capture')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/blog" className="text-brand-gold text-sm hover:underline no-underline mb-6 inline-block">&larr; Back to Blog</Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Screen Capture</span>
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Productivity</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            How to Take Screen Captures on Windows, Mac, and Linux in 2025
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>October 12, 2025</span>
            <span>&#183;</span>
            <span>8 min read</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p className="text-lg leading-relaxed">
            Screen capture is one of the most essential skills in any digital workflow. From filing
            support tickets to creating tutorials, capturing exactly what's on your screen saves time
            and eliminates miscommunication. This guide covers every major platform — Windows, Mac, and
            Linux — plus free online alternatives that work anywhere.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Screen Capture on Windows</h2>
          <p>
            Windows offers several built-in screen capture methods, each suited to different situations.
            The fastest option is the Snipping Tool, which Microsoft has been improving with every
            update. Press <strong className="text-white">Windows + Shift + S</strong> to activate it
            instantly. You'll see a toolbar at the top of your screen with four options: rectangular
            snip, freeform snip, window snip, and full-screen snip.
          </p>
          <p>
            For quick captures, the classic <strong className="text-white">Print Screen</strong> key
            still works. It copies the entire screen to your clipboard. Pair it with
            <strong className="text-white"> Alt + Print Screen</strong> to capture only the active
            window — this is especially useful when you have multiple monitors and only want to share
            one application's view.
          </p>
          <p>
            Windows 11 added the ability to record your screen directly from the Snipping Tool, making
            it a solid choice for quick video walkthroughs. For more advanced needs like scrolling
            captures, timed delays, or annotating, a dedicated tool gives you much more flexibility.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Screen Capture on Mac</h2>
          <p>
            macOS has the most refined built-in screenshot experience of any operating system. The core
            shortcuts are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong className="text-white">Command + Shift + 3</strong> — capture the full screen</li>
            <li><strong className="text-white">Command + Shift + 4</strong> — select a custom area to capture</li>
            <li><strong className="text-white">Command + Shift + 4, then Space</strong> — capture a specific window with a shadow</li>
            <li><strong className="text-white">Command + Shift + 5</strong> — open the screenshot toolbar with capture and recording options</li>
          </ul>
          <p>
            Mac screenshots save to the Desktop by default. You can change this in the Screenshot
            toolbar (Command + Shift + 5 → Options → Save To). The floating thumbnail that appears
            after a capture lets you annotate immediately using Markup — great for quick notes.
          </p>
          <p>
            One tip many users miss: holding <strong className="text-white">Control</strong> along
            with any screenshot shortcut copies the capture to your clipboard instead of saving a file.
            This is perfect when you want to paste a screenshot directly into a chat or document.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Screen Capture on Linux</h2>
          <p>
            Linux screen capture varies by desktop environment. On GNOME, pressing
            <strong className="text-white"> Print Screen</strong> opens the built-in screenshot tool.
            On KDE Plasma, Spectacle is the default tool and supports rectangular selection, active
            window capture, and timed screenshots.
          </p>
          <p>
            Command-line tools like <code className="bg-slate-800 px-2 py-0.5 rounded text-sm text-brand-gold">scrot</code>,
            <code className="bg-slate-800 px-2 py-0.5 rounded text-sm text-brand-gold"> gnome-screenshot</code>, and
            <code className="bg-slate-800 px-2 py-0.5 rounded text-sm text-brand-gold"> maim</code> offer
            scriptable alternatives. For example, <code className="bg-slate-800 px-2 py-0.5 rounded text-sm text-brand-gold">scrot -s -d 3</code> takes
            a screenshot of a selected area with a 3-second delay — perfect for capturing dropdown menus
            or tooltips that disappear when you switch focus.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Online Screen Capture Tools — No Installation Needed</h2>
          <p>
            Built-in tools are great for basic captures, but they fall short when you need to add context.
            Browser-based tools bridge the gap by offering capture, annotation, mockups, and export —
            all without installing anything.
          </p>
          <p>
            With DoAide Screenshot, you can take your raw screenshot and instantly enhance it. Wrap
            it in a <Link to="/browser" className="text-brand-gold hover:underline">browser mockup</Link> or
            <Link to="/phone" className="text-brand-gold hover:underline"> phone frame</Link> for presentations.
            <Link to="/annotate" className="text-brand-gold hover:underline"> Annotate</Link> it with arrows, text,
            and blur for bug reports. <Link to="/crop" className="text-brand-gold hover:underline">Crop</Link> it
            to the exact aspect ratio you need for social media. Everything runs locally in your browser
            — no data is uploaded anywhere.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Capturing Full Websites</h2>
          <p>
            Sometimes you need more than what's visible on screen. Full-page website screenshots capture
            the entire scrollable content of a webpage in a single image. This is invaluable for design
            reviews, competitive analysis, and archiving web content.
          </p>
          <p>
            Our <Link to="/capture" className="text-brand-gold hover:underline">Website Capture tool</Link> lets
            you enter any URL and get a clean screenshot at desktop or mobile viewport sizes. No browser
            extension required — just paste the URL and capture.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tips for Better Screen Captures</h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-400">
            <li>
              <strong className="text-white">Clean your desktop first.</strong> Close unnecessary tabs,
              clear notification badges, and hide personal information before capturing. A clean screenshot
              looks more professional and avoids accidental data leaks.
            </li>
            <li>
              <strong className="text-white">Use the right resolution.</strong> If you're capturing for
              documentation or a blog, make sure your screen is at a standard resolution. Retina and 4K
              screens produce very large images — scale them down before sharing.
            </li>
            <li>
              <strong className="text-white">Annotate immediately.</strong> The moment you capture something,
              annotate it while the context is fresh. Waiting until later often means you'll forget what
              you wanted to highlight.
            </li>
            <li>
              <strong className="text-white">Choose the right format.</strong> PNG for screenshots with text
              (lossless, crisp text). JPEG for photos and screenshots where file size matters. WebP for web
              usage where you want both quality and small files.
            </li>
            <li>
              <strong className="text-white">Respect privacy.</strong> Always blur or crop out personal
              information — email addresses, names, account numbers — before sharing screenshots externally.
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">How do I take a screenshot on Windows without installing software?</h3>
          <p>
            Press <strong className="text-white">Windows + Shift + S</strong> to open Snipping Tool. You can also
            use Print Screen to capture the full screen or Alt + Print Screen for the active window. For advanced
            editing, use a free online tool like DoAide Screenshot.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">What is the shortcut for screen capture on Mac?</h3>
          <p>
            Press <strong className="text-white">Command + Shift + 3</strong> for full screen,
            <strong className="text-white"> Command + Shift + 4</strong> for a selected area, or
            <strong className="text-white"> Command + Shift + 5</strong> to open the screenshot toolbar
            with recording options.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Can I take a screenshot of a website without a browser extension?</h3>
          <p>
            Yes. Tools like DoAide Screenshot let you enter a URL and capture a full-page screenshot online
            without any extension or installation. Your data stays in your browser.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Which free screen capture tool is best for Indian users?</h3>
          <p>
            DoAide Screenshot is a free, privacy-first screen capture tool that works entirely in your browser.
            No downloads, no account required, and no data leaves your device — ideal for users in India who
            need a fast, lightweight solution on any internet speed.
          </p>

          <div className="mt-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
            <p className="text-white font-semibold mb-3">Enhance your screenshots instantly — free and private</p>
            <Link to="/" className="inline-block px-6 py-3 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors no-underline">
              Try DoAide Screenshot
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
