import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AnnotationGuide() {
  useEffect(() => {
    document.title = 'The Complete Guide to Screenshot Annotation and Markup - DoAide Screenshot';
  }, []);

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/blog" className="text-brand-gold text-sm hover:underline no-underline mb-6 inline-block">&larr; Back to Blog</Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Annotation</span>
            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold text-xs font-medium rounded-full">Productivity</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            The Complete Guide to Screenshot Annotation and Markup
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>October 5, 2025</span>
            <span>&#183;</span>
            <span>7 min read</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p className="text-lg leading-relaxed">
            A screenshot is worth a thousand words, but an annotated screenshot is worth a thousand meetings.
            Whether you're filing bug reports, creating tutorials, or giving design feedback, knowing how to
            annotate effectively saves everyone time.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">When to Annotate</h2>
          <p>
            Not every screenshot needs annotation. Use it when you need to draw attention to specific parts
            of the image, explain a process, or highlight problems. Here are the most common use cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong className="text-white">Bug reports:</strong> Circle the error, arrow to the problematic element, blur sensitive data</li>
            <li><strong className="text-white">Tutorials:</strong> Number the steps, highlight buttons to click, add explanatory text</li>
            <li><strong className="text-white">Design feedback:</strong> Draw rectangles around areas that need changes, add notes</li>
            <li><strong className="text-white">Documentation:</strong> Label UI elements, show workflows with arrows</li>
            <li><strong className="text-white">Presentations:</strong> Emphasize key data points, create visual focus</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Annotation Tools and When to Use Them</h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Arrows</h3>
          <p>
            Arrows are the most versatile annotation tool. Use them to point to specific elements, show flow
            direction, or connect related items. Keep arrows simple — a single straight arrow is clearer than
            a curved one in most cases. Use a bold color like red or orange so the arrow stands out.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Rectangles and Circles</h3>
          <p>
            Draw rectangles or circles around elements you want to highlight. Rectangles work best for UI
            elements (buttons, fields, error messages) because they match the rectangular shapes of most
            interfaces. Circles work better for drawing attention to text or small icons.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Text Labels</h3>
          <p>
            Add text when the visual alone isn't enough. Keep labels short — two to five words is ideal.
            Position text close to what it describes and use a contrasting color. Avoid paragraphs on
            screenshots; save the detailed explanation for the message body.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Highlights</h3>
          <p>
            Semi-transparent highlight overlays draw attention without obscuring the content underneath.
            Use yellow or green highlights for "look here" emphasis. They're particularly effective for
            text-heavy screenshots where you want to point out specific lines.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Blur and Redaction</h3>
          <p>
            Always blur or redact sensitive information before sharing screenshots. This includes email
            addresses, account numbers, API keys, personal data, and anything your company considers
            confidential. Pixelation (blur) is the standard approach — solid color blocks work too but
            can look heavy-handed.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Best Practices</h2>
          <ol className="list-decimal pl-6 space-y-3 text-slate-400">
            <li>
              <strong className="text-white">Use consistent colors.</strong> Pick one color for annotations
              (red is the convention for bug reports) and stick with it. Multiple colors should only be
              used when you're distinguishing between different types of feedback.
            </li>
            <li>
              <strong className="text-white">Keep it minimal.</strong> Every annotation competes for attention.
              If everything is highlighted, nothing is highlighted. Annotate only the elements that matter.
            </li>
            <li>
              <strong className="text-white">Number your steps.</strong> When showing a process, number
              the steps so the viewer knows the order. This is especially important for tutorials and
              how-to guides.
            </li>
            <li>
              <strong className="text-white">Crop first, annotate second.</strong> Remove unnecessary parts
              of the screenshot before annotating. A focused screenshot with clear annotations communicates
              faster than a full-screen grab with arrows everywhere.
            </li>
            <li>
              <strong className="text-white">Check sensitive data.</strong> Before sharing, scan the entire
              screenshot — including browser tabs, notification bars, and sidebar content — for information
              you don't want to share.
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Free Online Annotation</h2>
          <p>
            You don't need to install desktop software for quick annotations. Our <Link to="/annotate" className="text-brand-gold hover:underline">Image Annotator</Link> runs
            in your browser and supports all the essentials: rectangles, circles, arrows, text, freehand
            drawing, highlights, and blur. Upload your screenshot, annotate it, and download the result
            as a PNG. Everything stays in your browser — nothing is uploaded to any server.
          </p>

          <div className="mt-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
            <p className="text-white font-semibold mb-3">Try annotating a screenshot right now</p>
            <Link to="/annotate" className="inline-block px-6 py-3 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors no-underline">
              Open Image Annotator
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
