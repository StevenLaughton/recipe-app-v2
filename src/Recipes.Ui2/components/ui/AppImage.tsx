import React from 'react';

function AppImage({ imageData }: { imageData: string | null }) {
  const fallbackIcon = '/assets/icon/fast-food.svg';
  const imageStyle = {
    aspectRatio: '1',
  };

  // eslint-disable-next-line @next/next/no-img-element
  return (<img src={imageData ?? fallbackIcon} alt="img" className="object-cover h-full rounded-xl" style={imageStyle as any} />);
}

export default AppImage;
