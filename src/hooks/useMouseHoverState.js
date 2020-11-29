import { useState } from 'react';

export const useMouseHoverState = () => {
  const [isHover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  return [isHover, handleMouseEnter, handleMouseLeave];
};
