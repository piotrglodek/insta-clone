import { useState } from 'react';

export const useDrawer = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);
  return [isDrawerOpen, handleToggleDrawer];
};
