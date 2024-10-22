import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function PowerBI() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full h-full overflow-hidden justify-stretch items-stretch">
      <iframe title="Salesy" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=88b98544-4187-4c85-99d4-707c9d7084de&autoAuth=true&ctid=f6153fa6-50c1-44e9-9691-1fdcc84a36aa" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </DndProvider>
  );
}
