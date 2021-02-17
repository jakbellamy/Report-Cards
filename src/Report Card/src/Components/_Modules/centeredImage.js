import React from 'react';

export default function CenteredImage(props) {
  let { src, height } = props
  return (
    <center>
      <img src={src} height={height} width='auto' textAlign='center'/>
    </center>
  );
}
