import { useState } from 'react';

export const useDialog = () => {
  const [isOpenDialog, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  return [isOpenDialog, handleOpenDialog, handleCloseDialog];
};
