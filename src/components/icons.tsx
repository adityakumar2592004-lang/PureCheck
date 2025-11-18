import type { SVGProps } from 'react';

export function SpiceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12 2c-3.31 0-6 2.69-6 6 0 2.28.89 4.33 2.34 5.76C6.26 15.34 5 18.09 5 21h14c0-2.91-1.26-5.66-3.34-7.24C17.11 12.33 18 10.28 18 8c0-3.31-2.69-6-6-6z" />
        <path d="M12 2a3.99 3.99 0 0 0-4 4c0 .8.22 1.54.61 2.18" />
    </svg>
  );
}
