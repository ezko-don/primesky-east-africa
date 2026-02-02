import { useState } from 'react';

interface PrimeSkyLogoProps {
  className?: string;
  showText?: boolean;
}

const PrimeSkyLogo = ({ className = "h-12 w-12", showText = true }: PrimeSkyLogoProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {!imageError ? (
        <img 
          src="/primesky-logo.png" 
          alt="PrimeSky East Africa Logo" 
          className={className}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full`}>
          <span className="text-white font-bold text-xl">PS</span>
        </div>
      )}
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-lg font-light tracking-wider">
            <span className="inline-block">PRIMESKY</span>
            <span className="text-emerald-500 font-medium ml-2">EAST AFRICA</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default PrimeSkyLogo;
