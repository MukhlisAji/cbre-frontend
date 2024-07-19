import React from 'react';
import TwoDSearch from './2dSearch';
import Map2D from './Map2D';

export default function MapViewer() {
  return (
    <div className="relative">
      <Map2D />
      <div className="absolute top-0 z-40">
        <TwoDSearch />
      </div>
    </div>
  );
}
