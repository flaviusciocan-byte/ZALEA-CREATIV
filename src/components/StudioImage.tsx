import React, { useState, useEffect, useRef } from 'react';

export interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const StudioImage: React.FC<StudioImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  sizes,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EACBD5]/25 p-6 text-center text-[#30272D] ${className}`}
      >
        <svg
          viewBox="0 0 64 64"
          className="mb-3 h-10 w-10 text-[#A67589]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="32" cy="32" r="24" strokeDasharray="3 3" />
          <path d="M32 16 C24 24, 24 40, 32 48 C40 40, 40 24, 32 16 Z" />
          <path d="M18 32 C26 26, 38 26, 46 32" />
        </svg>
        <span className="font-editorial italic text-sm text-[#30272D]/80">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${containerClassName}`}>
      {/* Editorial shimmer placeholder while lazy loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#EACBD5]/20 animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        sizes={sizes}
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
