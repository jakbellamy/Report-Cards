import React from 'react';

export default function CenteredImage(props) {
  let { src, height } = props
  return (
      <img src={src} height={height} width='auto' textAlign='center' style={{'image-rendering': 'crisp-edges'}}/>


  );
}
