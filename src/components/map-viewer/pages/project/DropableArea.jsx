import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
    BUILDING: 'building',
};

function DroppableArea({ onDrop }) {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.BUILDING,
        drop: (item) => onDrop(item.building),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`p-4 border ${isOver ? 'bg-gray-200' : 'bg-white'}`}>
            Drop buildings here
        </div>
    );
}

export default DroppableArea;
