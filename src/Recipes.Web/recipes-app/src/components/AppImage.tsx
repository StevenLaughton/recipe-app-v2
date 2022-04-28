import React from 'react';

function AppImage({ imageData }: { imageData: string | null }) {
  const fallbackIcon = '/assets/icon/fast-food.svg';
  const imageStyle = {
    aspectRatio: '1',
    objectFit: 'cover',
    width: '100%',
  };

  return (<img src={imageData ?? fallbackIcon} alt="img" style={imageStyle as any} />);
}

export default AppImage;
