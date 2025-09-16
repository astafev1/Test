export default function Logo() {
  return (
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" aria-label="DSPRX logo" className="mr-2">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#1E68FF"/>
            <stop offset="100%" stopColor="#0B5FFF"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="24" height="24" rx="8" fill="url(#g)"/>
        <path d="M14 20 h12 M20 14 v12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
