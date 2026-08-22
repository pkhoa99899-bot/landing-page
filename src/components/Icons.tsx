type IconProps = { className?: string };

export const TelegramIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.04 15.47 8.66 20.8c.54 0 .78-.23 1.06-.51l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.9-.9L22.9 4.3c.31-1.42-.52-1.98-1.46-1.63L2.3 10.05c-1.38.54-1.36 1.31-.24 1.66l4.9 1.53L18.3 6.1c.53-.35 1.02-.16.62.2z" />
  </svg>
);

export const PhoneIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1z" />
  </svg>
);

export const PinIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export const ThumbIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 96 96" aria-hidden="true">
    <path d="M27.28 41.996h-24c-1.104 0-2 .9-2 2v40c0 1.1.896 2 2 2h24c1.104 0 2-.9 2-2v-40c0-1.104-.896-2-2-2zM73.279 49.996c-1.1 0-2-.9-2-2s.9-2 2-2h21.109c.295-1.192.327-2.352.327-3.008 0-8.992-7.368-8.992-10.508-8.992H65.132c3.224-13.952-.647-21.188-5.575-23.32-3.705-1.592-7.9-.264-9.992 3.172-.188.312-.293.672-.293 1.04v9.52c0 .7-.299 1.552-.588 2.38-1.952 5.584-5.824 10.6-11.832 15.336-.456.352-.88.764-1.252 1.224-.6.724-1.416 1.304-2.328 1.752v37.116c1.084.272 2.092.804 2.916 1.601 1.48 1.42 3.436 2.18 5.66 2.18H74.6c4.412 0 8.133-1.721 10.492-4.828 1.584-2.08 2.4-4.704 2.393-7.172H73.279c-1.1 0-2-.9-2-2s.9-2 2-2h17.416c.313-.508.584-1.048.805-1.616.764-2.016.916-4.312.532-6.384H73.279c-1.1 0-2-.9-2-2s.9-2 2-2h20.173c.756-1.584 1.14-3.4.952-5.28-.088-.991-.368-1.884-.725-2.716l-20.4-.005z" />
  </svg>
);

export const DiamondIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 2 12l10 10 10-10z" /></svg>
);

export const PhoneOutlineDeco = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 100 200" fill="none" stroke="#fff" strokeWidth="4" aria-hidden="true">
    <rect x="5" y="5" width="90" height="190" rx="18" />
    <rect x="30" y="12" width="40" height="8" rx="4" fill="#fff" stroke="none" />
    <line x1="35" y1="180" x2="65" y2="180" strokeLinecap="round" />
  </svg>
);

const simple = (d: string) => ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);
export const ListIcon = simple("M3 5h18v2H3zm0 6h18v2H3zm0 6h12v2H3z");
export const BoltIcon = simple("M13 2 3 14h7l-1 8 10-12h-7z");
export const ShieldIcon = simple("M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5zm-2 16-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9z");
export const HeartIcon = simple("M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z");
export const UserIcon = simple("M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z");
export const ClockIcon = simple("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.5 5v5.3l4.5 2.7-.8 1.2L11 13V7z");
export const CheckIcon = simple("M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z");
export const StarIcon = simple("m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z");
