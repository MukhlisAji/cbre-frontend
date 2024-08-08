import React from 'react';
import TwoDSearch from './search/2dSearch';
import Map2D from './Map2D';
import Project from './project/Project';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function MapViewer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full h-full overflow-hidden justify-stretch items-stretch">
        <div className="relative top-0 z-30">
          <TwoDSearch />
        </div>
        <Map2D />
        <Project />
      </div>
    </DndProvider>
  );
}
