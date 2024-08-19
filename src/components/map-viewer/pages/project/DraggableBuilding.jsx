import React from 'react';
import { useDrag } from 'react-dnd';
import { useAppContext } from '../../../../AppContext';

const ItemTypes = {
    BUILDING: 'building',
};

function DraggableBuilding({ building }) {
    const { selectedBuildings, setDroppedBuildings } = useAppContext();

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.BUILDING,
        item: { building },
        canDrag: () => selectedBuildings.some(b => b.id === building.BUILDINGID && b.enabled),
        end: (item, monitor) => {
            if (monitor.didDrop() && item) {
                // Only add to droppedBuildings if not already present
                setDroppedBuildings(prev => {
                    const existingIds = new Set(prev.map(b => b.id));
                    if (!existingIds.has(item.building.id)) {
                        return [...prev, item.building];
                    }
                    return prev;
                });
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className='flex flex-col w-full p-2' ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <span className="text-sm text-neutral-500">{building.BUILDINGNAME}</span>
            <span className="text-sm text-neutral-500">{building.LATITUDE}</span>
            <span className="text-sm text-neutral-500">No. of Spaces: <strong>{building.POSTCODE}</strong></span>
        </div>
    );
}

export default DraggableBuilding;
