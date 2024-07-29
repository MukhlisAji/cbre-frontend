import React from 'react';
import TwoDSearch from './2dSearch';
import Map2D from './Map2D';

export default function MapViewer() {
  return (
    <div className="flex w-full h-full overflow-hidden justify-stretch items-stretch">
      <div className="relative top-0 z-40">
        <TwoDSearch />
      </div>
      <Map2D />
    </div>
  );
}
