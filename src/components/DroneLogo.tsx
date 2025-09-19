const DroneLogo = ({ className = "h-16 w-16" }: { className?: string }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drone body */}
      <circle cx="50" cy="50" r="8" fill="currentColor" />
      
      {/* Propeller arms */}
      <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="2" />
      <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeWidth="2" />
      
      {/* Propellers */}
      <circle cx="30" cy="30" r="15" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="70" cy="30" r="15" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="70" r="15" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="70" cy="70" r="15" stroke="currentColor" strokeWidth="1.5" fill="none" />
      
      {/* Propeller blades */}
      <ellipse cx="30" cy="30" rx="12" ry="3" fill="currentColor" opacity="0.7" />
      <ellipse cx="70" cy="30" rx="12" ry="3" fill="currentColor" opacity="0.7" />
      <ellipse cx="30" cy="70" rx="12" ry="3" fill="currentColor" opacity="0.7" />
      <ellipse cx="70" cy="70" rx="12" ry="3" fill="currentColor" opacity="0.7" />
      
      {/* Signal waves */}
      <circle cx="50" cy="35" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="50" cy="35" r="6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="50" cy="35" r="9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
    </svg>
  );
};

export default DroneLogo;