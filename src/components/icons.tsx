import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-6", className)}
    {...props}
  >
    <title>FinançasZen Logo</title>
    <path d="M12 2v20" />
    <path d="M17.6 3.2c-2.4 2.4-2.4 6.4 0 8.8" />
    <path d="M6.4 12c2.4 2.4 6.4 2.4 8.8 0" />
    <path d="M3.2 17.6c2.4-2.4 6.4-2.4 8.8 0" />
  </svg>
);
