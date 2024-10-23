import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function PowerBI() {
  return (
    <DndProvider backend={HTML5Backend}>
      <iframe title="test" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNTk3ZTZjZjctYmU1YS00MDQwLThjMjgtNTBlZjU2ZDZlNDhlIiwidCI6IjM0ODViOTYzLTgyYmEtNGE2Zi04MTBmLWI1Y2MyMjZmZjg5OCIsImMiOjEwfQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
    </DndProvider>
  );
}
