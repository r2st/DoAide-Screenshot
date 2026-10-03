import { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';

const THEMES = {
  dracula: { name: 'Dracula', bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', string: '#f1fa8c', comment: '#6272a4', func: '#50fa7b', number: '#bd93f9', operator: '#ff79c6', punctuation: '#f8f8f2', className: '#8be9fd', tag: '#ff79c6', attr: '#50fa7b' },
  monokai: { name: 'Monokai', bg: '#272822', text: '#f8f8f2', keyword: '#f92672', string: '#e6db74', comment: '#75715e', func: '#a6e22e', number: '#ae81ff', operator: '#f92672', punctuation: '#f8f8f2', className: '#66d9ef', tag: '#f92672', attr: '#a6e22e' },
  githubDark: { name: 'GitHub Dark', bg: '#0d1117', text: '#c9d1d9', keyword: '#ff7b72', string: '#a5d6ff', comment: '#8b949e', func: '#d2a8ff', number: '#79c0ff', operator: '#ff7b72', punctuation: '#c9d1d9', className: '#7ee787', tag: '#7ee787', attr: '#79c0ff' },
  githubLight: { name: 'GitHub Light', bg: '#ffffff', text: '#24292f', keyword: '#cf222e', string: '#0a3069', comment: '#6e7781', func: '#8250df', number: '#0550ae', operator: '#cf222e', punctuation: '#24292f', className: '#116329', tag: '#116329', attr: '#0550ae' },
  oneDark: { name: 'One Dark', bg: '#282c34', text: '#abb2bf', keyword: '#c678dd', string: '#98c379', comment: '#5c6370', func: '#61afef', number: '#d19a66', operator: '#56b6c2', punctuation: '#abb2bf', className: '#e5c07b', tag: '#e06c75', attr: '#d19a66' },
  nord: { name: 'Nord', bg: '#2e3440', text: '#d8dee9', keyword: '#81a1c1', string: '#a3be8c', comment: '#616e88', func: '#88c0d0', number: '#b48ead', operator: '#81a1c1', punctuation: '#d8dee9', className: '#8fbcbb', tag: '#81a1c1', attr: '#8fbcbb' },
  solarizedDark: { name: 'Solarized Dark', bg: '#002b36', text: '#839496', keyword: '#859900', string: '#2aa198', comment: '#586e75', func: '#268bd2', number: '#d33682', operator: '#859900', punctuation: '#839496', className: '#b58900', tag: '#268bd2', attr: '#b58900' },
  solarizedLight: { name: 'Solarized Light', bg: '#fdf6e3', text: '#657b83', keyword: '#859900', string: '#2aa198', comment: '#93a1a1', func: '#268bd2', number: '#d33682', operator: '#859900', punctuation: '#657b83', className: '#b58900', tag: '#268bd2', attr: '#b58900' },
  nightOwl: { name: 'Night Owl', bg: '#011627', text: '#d6deeb', keyword: '#c792ea', string: '#ecc48d', comment: '#637777', func: '#82aaff', number: '#f78c6c', operator: '#c792ea', punctuation: '#d6deeb', className: '#ffcb8b', tag: '#7fdbca', attr: '#addb67' },
  synthwave: { name: "Synthwave '84", bg: '#2b213a', text: '#f92aad', keyword: '#fede5d', string: '#ff8b39', comment: '#848bbd', func: '#36f9f6', number: '#f97e72', operator: '#fede5d', punctuation: '#f92aad', className: '#36f9f6', tag: '#fede5d', attr: '#ff8b39' },
  ayuDark: { name: 'Ayu Dark', bg: '#0a0e14', text: '#b3b1ad', keyword: '#ff8f40', string: '#c2d94c', comment: '#626a73', func: '#ffb454', number: '#e6b673', operator: '#f29668', punctuation: '#b3b1ad', className: '#59c2ff', tag: '#39bae6', attr: '#ffb454' },
  ayuLight: { name: 'Ayu Light', bg: '#fafafa', text: '#575f66', keyword: '#fa8d3e', string: '#86b300', comment: '#abb0b6', func: '#f2ae49', number: '#a37acc', operator: '#ed9366', punctuation: '#575f66', className: '#399ee6', tag: '#55b4d4', attr: '#f2ae49' },
  materialDark: { name: 'Material Dark', bg: '#263238', text: '#eeffff', keyword: '#c792ea', string: '#c3e88d', comment: '#546e7a', func: '#82aaff', number: '#f78c6c', operator: '#89ddff', punctuation: '#eeffff', className: '#ffcb6b', tag: '#f07178', attr: '#c792ea' },
  materialLight: { name: 'Material Light', bg: '#fafafa', text: '#90a4ae', keyword: '#7c4dff', string: '#91b859', comment: '#ccd7da', func: '#6182b8', number: '#f76d47', operator: '#39adb5', punctuation: '#90a4ae', className: '#e2931d', tag: '#e53935', attr: '#7c4dff' },
  gruvboxDark: { name: 'Gruvbox Dark', bg: '#282828', text: '#ebdbb2', keyword: '#fb4934', string: '#b8bb26', comment: '#928374', func: '#fabd2f', number: '#d3869b', operator: '#fe8019', punctuation: '#ebdbb2', className: '#83a598', tag: '#8ec07c', attr: '#fabd2f' },
  tokyoNight: { name: 'Tokyo Night', bg: '#1a1b26', text: '#a9b1d6', keyword: '#bb9af7', string: '#9ece6a', comment: '#565f89', func: '#7aa2f7', number: '#ff9e64', operator: '#89ddff', punctuation: '#a9b1d6', className: '#2ac3de', tag: '#f7768e', attr: '#e0af68' },
  catppuccin: { name: 'Catppuccin Mocha', bg: '#1e1e2e', text: '#cdd6f4', keyword: '#cba6f7', string: '#a6e3a1', comment: '#6c7086', func: '#89b4fa', number: '#fab387', operator: '#89dceb', punctuation: '#cdd6f4', className: '#f9e2af', tag: '#f38ba8', attr: '#a6e3a1' },
  rosePine: { name: 'Rose Pine', bg: '#191724', text: '#e0def4', keyword: '#c4a7e7', string: '#f6c177', comment: '#6e6a86', func: '#9ccfd8', number: '#ebbcba', operator: '#31748f', punctuation: '#e0def4', className: '#eb6f92', tag: '#eb6f92', attr: '#f6c177' },
  palenight: { name: 'Palenight', bg: '#292d3e', text: '#a6accd', keyword: '#c792ea', string: '#c3e88d', comment: '#676e95', func: '#82aaff', number: '#f78c6c', operator: '#89ddff', punctuation: '#a6accd', className: '#ffcb6b', tag: '#f07178', attr: '#c792ea' },
  cobalt2: { name: 'Cobalt2', bg: '#193549', text: '#e1efff', keyword: '#ffc600', string: '#a5ff90', comment: '#0088ff', func: '#ffc600', number: '#ff628c', operator: '#ff9d00', punctuation: '#e1efff', className: '#80ffbb', tag: '#ff9d00', attr: '#ffc600' },
  shadesOfPurple: { name: 'Shades of Purple', bg: '#2d2b55', text: '#e3dfff', keyword: '#ff9d00', string: '#a5ff90', comment: '#b362ff', func: '#fad000', number: '#ff628c', operator: '#ff9d00', punctuation: '#e3dfff', className: '#ffc600', tag: '#ff6363', attr: '#fad000' },
};

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'css', label: 'CSS' },
  { value: 'markup', label: 'HTML' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
];

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
  'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
  'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
  'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #C6FFDD 0%, #FBD786 50%, #f7797d 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
];

const DEFAULT_CODE = `function fibonacci(n) {
  if (n <= 1) return n;

  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }

  return b;
}

// Generate first 10 numbers
const result = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(result); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`;

export default function CodeScreenshot() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [theme, setTheme] = useState('dracula');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(14);
  const [padding, setPadding] = useState(32);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [title, setTitle] = useState('untitled.js');
  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#667eea');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [showWindow, setShowWindow] = useState(true);
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);

  const currentTheme = THEMES[theme];

  const highlighted = useCallback(() => {
    try {
      const grammar = Prism.languages[language];
      if (!grammar) return code;
      return Prism.highlight(code, grammar, language);
    } catch {
      return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }, [code, language]);

  const getBackground = () => {
    if (bgType === 'transparent') return 'transparent';
    if (bgType === 'solid') return bgColor;
    return bgGradient;
  };

  const handleExport = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `code-screenshot-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      setExporting(false);
    }
  }, []);

  const lines = code.split('\n');

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              <div className="flex justify-center">
                <div
                  ref={captureRef}
                  style={{
                    background: bgType === 'transparent' ? 'transparent' : getBackground(),
                    padding: `${padding}px`,
                  }}
                  className="inline-block"
                >
                  <div
                    style={{ backgroundColor: currentTheme.bg }}
                    className="rounded-xl overflow-hidden shadow-2xl"
                  >
                    {showWindow && (
                      <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{ backgroundColor: currentTheme.bg, borderBottom: `1px solid ${currentTheme.comment}33` }}
                      >
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex-1 text-center">
                          <span style={{ color: currentTheme.comment, fontSize: '13px' }}>{title}</span>
                        </div>
                        <div className="w-14" />
                      </div>
                    )}
                    <div className="overflow-auto" style={{ padding: '16px 0' }}>
                      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <tbody>
                          {lines.map((line, i) => (
                            <tr key={i} style={{ lineHeight: '1.6' }}>
                              {showLineNumbers && (
                                <td
                                  style={{
                                    color: currentTheme.comment,
                                    fontSize: `${fontSize}px`,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    textAlign: 'right',
                                    userSelect: 'none',
                                    verticalAlign: 'top',
                                    opacity: 0.5,
                                  }}
                                >
                                  {i + 1}
                                </td>
                              )}
                              <td
                                style={{
                                  color: currentTheme.text,
                                  fontSize: `${fontSize}px`,
                                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                  paddingLeft: showLineNumbers ? '0' : '16px',
                                  paddingRight: '24px',
                                  whiteSpace: 'pre',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: (() => {
                                    try {
                                      const grammar = Prism.languages[language];
                                      if (!grammar) return line || ' ';
                                      const h = Prism.highlight(line, grammar, language);
                                      return h || ' ';
                                    } catch {
                                      return line || ' ';
                                    }
                                  })(),
                                }}
                              />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                    <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
                      screenshot.doaide.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Input */}
            <div className="w-full mt-4">
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 font-mono text-sm resize-y focus:outline-none focus:border-brand-gold/50"
                placeholder="Paste your code here..."
                spellCheck={false}
              />
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button
                onClick={handleCopy}
                disabled={exporting}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Theme */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Theme</label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold/50"
              >
                {Object.entries(THEMES).map(([key, t]) => (
                  <option key={key} value={key}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold/50"
              >
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold/50"
              />
            </div>

            {/* Font Size */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>

            {/* Padding */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Padding: {padding}px</label>
              <input
                type="range"
                min="16"
                max="96"
                value={padding}
                onChange={e => setPadding(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>

            {/* Toggles */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">Line Numbers</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${showLineNumbers ? 'bg-brand-gold' : 'bg-slate-600'}`}
                  onClick={() => setShowLineNumbers(!showLineNumbers)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showLineNumbers ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">Window Frame</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${showWindow ? 'bg-brand-gold' : 'bg-slate-600'}`}
                  onClick={() => setShowWindow(!showWindow)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showWindow ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            </div>

            {/* Background */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Background</label>
              <div className="flex gap-2 mb-3">
                {['gradient', 'solid', 'transparent'].map(t => (
                  <button
                    key={t}
                    onClick={() => setBgType(t)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${bgType === t ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {bgType === 'gradient' && (
                <div className="grid grid-cols-4 gap-2">
                  {GRADIENTS.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setBgGradient(g)}
                      className={`w-full h-8 rounded-md border-2 transition-colors ${bgGradient === g ? 'border-brand-gold' : 'border-transparent'}`}
                      style={{ background: g }}
                    />
                  ))}
                </div>
              )}
              {bgType === 'solid' && (
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .token.comment, .token.prolog, .token.doctype, .token.cdata { color: ${currentTheme.comment}; }
        .token.punctuation { color: ${currentTheme.punctuation}; }
        .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol { color: ${currentTheme.number}; }
        .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin { color: ${currentTheme.string}; }
        .token.operator, .token.entity, .token.url { color: ${currentTheme.operator}; }
        .token.atrule, .token.attr-value, .token.keyword { color: ${currentTheme.keyword}; }
        .token.function, .token.class-name { color: ${currentTheme.func}; }
        .token.regex, .token.important, .token.variable { color: ${currentTheme.className}; }
        .token.tag { color: ${currentTheme.tag}; }
        .token.attr-name { color: ${currentTheme.attr}; }
      `}</style>
    </div>
  );
}
