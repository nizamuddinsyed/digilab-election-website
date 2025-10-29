import React from 'react';

interface StarburstProps {
  color?: 'purple' | 'teal' | 'silver';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Starburst: React.FC<StarburstProps> = ({ 
  color = 'purple', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const colorClasses = {
    purple: 'text-purple',
    teal: 'text-teal',
    silver: 'text-silver'
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={colorClasses[color]}>
        {/* Create 16 rays radiating from center */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 30;
          const y1 = 100 + Math.sin(angle) * 30;
          const x2 = 100 + Math.cos(angle) * 95;
          const y2 = 100 + Math.sin(angle) * 95;
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.9"
            />
          );
        })}
        {/* Center circle */}
        <circle cx="100" cy="100" r="20" fill="currentColor" />
      </g>
    </svg>
  );
};

export default Starburst;
