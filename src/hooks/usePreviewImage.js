import { useState } from 'react';

export const usePreviewImage = () => {
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');

  const handlePreviewImage = e => {
    const image = e.target.files[0];
    if (image) {
      setImagePreviewSrc(URL.createObjectURL(image));
    }
  };

  return [imagePreviewSrc, handlePreviewImage, setImagePreviewSrc];
};
