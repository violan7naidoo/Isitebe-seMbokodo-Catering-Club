import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

export const XIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.901 1.453h3.68l-8.04 9.19L24 22.543h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.452h7.594l5.243 6.932L17.617 1.45h1.285zm-2.54 18.95h1.5L6.323 3.41H4.66L16.36 20.403z" />
    </svg>
  )
);

XIcon.displayName = 'XIcon';

export default XIcon as LucideIcon;
