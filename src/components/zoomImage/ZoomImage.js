// src/components/zoomImage/ZoomImage.js
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

export const ZoomImage = ({ imageUrl }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <InnerImageZoom
        src={imageUrl}
        zoomType="hover" // You can change to 'click'
        zoomPreload={true}
        zoomScale={1.2}
        width="100%"
        alt="Product Image"
        hideHint={true}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
};
