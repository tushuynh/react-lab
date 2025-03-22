import { useState, useEffect, RefObject } from 'react';

const useHover = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
): boolean => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const node = elementRef.current;

    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [elementRef]);

  return isHovered;
};

export default useHover;
