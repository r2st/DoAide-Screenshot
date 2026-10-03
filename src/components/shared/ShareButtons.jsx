export default function ShareButtons() {
  const shareUrl = 'https://screenshot.doaide.com';
  const shareText = 'Create beautiful code screenshots, tweet cards & mockups for free!';

  const links = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      bg: '#25D366',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      bg: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      bg: '#0A66C2',
    },
  ];

  return (
    <div className="flex gap-2">
      {links.map(link => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity no-underline"
          style={{ backgroundColor: link.bg }}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
