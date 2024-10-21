import React from 'react';
import Map2D from './Map2D';
import Project from './project/Project';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function MapViewer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full h-full overflow-hidden justify-stretch items-stretch">
        <Map2D />
        <Project />
      </div>
    </DndProvider>
  );
}
