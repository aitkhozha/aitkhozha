import * as React from 'react';

// Lightweight, dependency-free inline SVG icon set. Every glyph inherits the
// current text colour so icons tint with their surrounding context. These
// replace the emoji that were previously used as UI icons across the site.

export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, strokeWidth = 1.8, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const CompassIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="16 8 10.5 10.5 8 16 13.5 13.5" fill="currentColor" stroke="none" />
  </Icon>
);

export const CarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 11l1.5-3.6A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1.4L19 11" />
    <path d="M3 16v-2.2a2 2 0 0 1 1.2-1.8l1.3-.5a3 3 0 0 1 1.1-.2h8.8a3 3 0 0 1 1.1.2l1.3.5A2 2 0 0 1 21 13.8V16a1 1 0 0 1-1 1h-1" />
    <path d="M5 17H4a1 1 0 0 1-1-1" />
    <path d="M9 17h6" />
    <circle cx="7.5" cy="17" r="2" />
    <circle cx="16.5" cy="17" r="2" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z" />
  </Icon>
);

export const TagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 7v4.8a2 2 0 0 0 .6 1.4l7.2 7.2a2 2 0 0 0 2.8 0l4.8-4.8a2 2 0 0 0 0-2.8L11.2 5.6A2 2 0 0 0 9.8 5H5a2 2 0 0 0-2 2z" />
    <circle cx="7.5" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 2" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
    <path d="M16 3.1a4 4 0 0 1 0 7.8" />
  </Icon>
);

export const MountainIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 20l5.5-10 3.2 5.8 2.3-4L21 20z" />
    <path d="M8.5 10l1.6 2.9" />
  </Icon>
);

export const CpuIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </Icon>
);

export const CardIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 3v5.5c0 4.6-3.2 7.8-8 9-4.8-1.2-8-4.4-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l2.7 5.5 6 .9-4.35 4.2 1.05 6L12 17l-5.4 2.6 1.05-6L3.3 9.4l6-.9z" fill="currentColor" stroke="none" />
  </Icon>
);

export const RouteIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="19" r="2.6" />
    <circle cx="18" cy="5" r="2.6" />
    <path d="M8.6 19h7.4a3.4 3.4 0 0 0 0-6.8H8a3.4 3.4 0 0 1 0-6.8h2.5" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4.5" width="18" height="17" rx="2" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4M8.5 15l2 2 4-4" />
  </Icon>
);

export const GearIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 21h14" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12H5" />
    <path d="M11 18l-6-6 6-6" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12l4.5 4.5L20 6" strokeWidth={2.2} />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3.6l1.6 4-2.2 1.4a12 12 0 0 0 5.2 5.2L16.4 12l4 1.6V18a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </Icon>
);

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </Icon>
);

export const TikTokIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      d="M15.8 3c.4 2.4 1.9 3.9 4.2 4.1v2.7c-1.6 0-3.1-.5-4.3-1.4v5.9a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.8a2.6 2.6 0 1 0 1.8 2.5V3z"
      fill="currentColor"
      stroke="none"
    />
  </Icon>
);
