type CampusMarkProps = {
  className?: string;
};

export function CampusMark({ className }: CampusMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50.8 15.7C45.7 9.3 38.8 6.5 30.4 7.1C16.7 8 7.3 18.6 7.8 32.8C8.3 47 19 57.4 33.1 57.3C40.7 57.2 47.2 54.1 51.4 48.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".34" />
      <path d="M48.3 17.5C44.1 12.2 37.9 9.6 30.8 10.2C19.1 11.1 11.1 20.1 11.5 32.4C12 44.7 21.1 53.6 33.1 53.5C39.7 53.4 45 50.9 48.7 46.3" stroke="currentColor" strokeWidth="8.3" strokeLinecap="round" />
    </svg>
  );
}
