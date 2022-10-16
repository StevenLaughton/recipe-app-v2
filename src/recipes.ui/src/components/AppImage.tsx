import React from 'react';

type ImageProps = {
    imageData: string | null;
    className?: string
}

function AppImage({imageData, className}: ImageProps) {
    const fallbackIcon = '/assets/icon/fast-food.svg';
    const imageStyle = {
        aspectRatio: '1',
    };

    return <img src={imageData ?? fallbackIcon}
                alt="img"
                className={className + ' object-cover h-full rounded-xl'}
                style={imageStyle as any}
    />
}

export default AppImage;
