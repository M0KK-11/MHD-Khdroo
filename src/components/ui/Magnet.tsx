import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Check if mouse is within padding boundary around the element
      const isWithinX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const isWithinY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        const deltaX = (e.clientX - centerX) / strength;
        const deltaY = (e.clientY - centerY) / strength;
        setPosition({ x: deltaX, y: deltaY });
        setIsActive(true);
      } else {
        if (isActive) {
          setPosition({ x: 0, y: 0 });
          setIsActive(false);
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      setPosition({ x: 0, y: 0 });
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [padding, strength, isActive]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
