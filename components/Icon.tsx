
import React from 'react';

type IconName =
  | 'folder' | 'file-word' | 'file-excel' | 'file-pdf' | 'file-image' | 'file-generic'
  | 'dots' | 'share' | 'trash' | 'chart' | 'close' | 'upload' | 'tools' | 'sparkles'
  | 'loading';

interface IconProps {
  name: IconName;
  className?: string;
}

// This map contains the actual SVG path data for each icon.
// Using React.Fragment <> for icons with multiple paths ensures no nested SVGs.
const iconPaths: Record<IconName, React.ReactNode> = {
  folder: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
  'file-word': (
    <>
      <path fill="#2563EB" stroke="#fff" strokeWidth="0.5" d="M6,2 C4.8954305,2 4,2.8954305 4,4 L4,20 C4,21.1045695 4.8954305,22 6,22 L18,22 C19.1045695,22 20,21.1045695 20,20 L20,8 L14,2 L6,2 Z" />
      <path stroke="#fff" strokeWidth="1.5" strokeLinecap="round" d="M9 13h6M9 17h4" />
    </>
  ),
  'file-excel': (
    <>
      <path fill="#10B981" stroke="#fff" strokeWidth="0.5" d="M6,2 C4.8954305,2 4,2.8954305 4,4 L4,20 C4,21.1045695 4.8954305,22 6,22 L18,22 C19.1045695,22 20,21.1045695 20,20 L20,8 L14,2 L6,2 Z" />
      <path stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10 13h4M12 11v6" />
    </>
  ),
  'file-pdf': (
    <>
      <path fill="#EF4444" stroke="#fff" strokeWidth="0.5" d="M6,2 C4.8954305,2 4,2.8954305 4,4 L4,20 C4,21.1045695 4.8954305,22 6,22 L18,22 C19.1045695,22 20,21.1045695 20,20 L20,8 L14,2 L6,2 Z" />
      <path fill="#fff" d="M9 9h3v2H9zM9 13h6v2H9zM9 17h6v2H9z" />
    </>
  ),
  'file-image': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1a2 2 0 010-2.828l1-1M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L15 2z" />,
  'file-generic': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  dots: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />,
  share: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.846 13.655 9 14.088 9 14.5c0 .412-.154.845-.316 1.158m5.632-2.316C14.846 13.655 15 14.088 15 14.5c0 .412-.154.845-.316 1.158m-5.632-2.316a9 9 0 105.632 2.316m-5.632-2.316L9 12.5m5.632 2.316L15 12.5" />,
  trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />,
  upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
  tools: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
  sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M16 17v4m-2-2h4M15 3l-1 1M11 5l-1-1M5 15l1 1m-1-5l1-1" />,
  loading: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /><path d="M12 2a10 10 0 100 20V2z" fill="currentColor" opacity=".5" />,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  // Most icons are stroked and inherit their color via Tailwind's `text-` classes.
  // File icons and the loading spinner have their own colors and are not stroked.
  const isStroked = !['file-word', 'file-excel', 'file-pdf', 'loading'].includes(name);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={isStroked ? "currentColor" : "none"}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
};
