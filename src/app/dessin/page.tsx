'use client'; // if you're using Next.js App Router

import React, { useEffect } from 'react';

export default function Dessin() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.brush.ninja/drawing.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>Dessin</h2>
      <brush-ninja-drawing></brush-ninja-drawing>
    </div>
  );
}
