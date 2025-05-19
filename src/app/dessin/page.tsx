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
    <main className='w-full h-[100vh]'>
      <brush-ninja-drawing className='h-[100vh]'></brush-ninja-drawing>
      <div className='h-[100%] flex justify-center align-center m-10 bg-dark'>
        <h2>Creéez votre dessin juste au dessus puis importez-le dans notre éditeur !</h2>
      </div>
    </main>
  );
}
