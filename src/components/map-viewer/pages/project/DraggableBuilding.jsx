import { Checkbox } from "@headlessui/react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { BsCheckLg } from "react-icons/bs";
import { useAppContext } from "../../../../AppContext";
import { buildAtom } from "./store/build";

const ItemTypes = {
  BUILDING: "building",
};

function DraggableBuilding({
  building,
  index,
  handleChangeCheck,
  checked,
  controlChecked,
}) {
  const { selectedBuildings, setDroppedBuildings } = useAppContext();
//   const [build, setBuild] = useAtom(buildAtom);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BUILDING,
    item: { building },
    canDrag: () =>
      selectedBuildings.some((b) => b.id === building.BUILDINGID && b.enabled),
    end: (item, monitor) => {
      if (monitor.didDrop() && item) {
        // Only add to droppedBuildings if not already present
        setDroppedBuildings((prev) => {
          const existingIds = new Set(prev.map((b) => b.id));
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
    <>
      {controlChecked && (
        <Checkbox
          checked={true}
          onChange={() => handleChangeCheck(building)}
          className={`form-checkbox h-5 w-5 text-c-teal mt-2.5 rounded-md ${
            checked ? "bg-c-teal" : "bg-neutral-300"
          }`}
        >
          {checked && <BsCheckLg className="text-white text-lg" />}
        </Checkbox>
      )}
      <div
        className="flex flex-col w-full p-2"
        onClick={() => {
        //   setBuild(building);
          if(controlChecked) handleChangeCheck(building);
        }}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <span className="text-sm text-neutral-500">
          {index + 1}. {building.buildingName}
        </span>
        <span className="text-sm text-neutral-500">{building.latitude}</span>
        <span className="text-sm text-neutral-500">{building.longitude}</span>
        <span className="text-sm text-neutral-500">
          No. of Spaces: <strong>{building.postalCode}</strong>
        </span>
      </div>
    </>
  );
}

export default DraggableBuilding;
