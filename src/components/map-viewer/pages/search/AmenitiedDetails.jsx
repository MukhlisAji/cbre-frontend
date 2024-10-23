import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../../AppContext';

export default function AmenitiesDetails({obj,category, currentAmenities,  setCurrentAmenitiesData}){
  const{currentAmenitiesBuilding}= useAppContext()
  useEffect(()=>{
    console.log("ppppppp")
    console.log(currentAmenities)
    console.log(category)
    if (currentAmenities === category){
      console.log("msssss")
      setCurrentAmenitiesData(obj.places_result)
    }
   
  },[currentAmenities])

  const handleClick =(building)=>{
    console.log(building)
  }
  return (
      <div>
        {obj.places_result.map((building, buildingIndex) => (
          <div key={`building-${building.name}`} id={`building-${building.name}`} className={`pt-2 ${currentAmenitiesBuilding === building ? 'bg-slate-200' : 'bg-inherit'}`} onClick={() => handleClick(building)}>
            <div className="text-sm text-neutral-700">
              {building.name}
            </div>
            <div className="text-sm text-neutral-500">
              Walking: {building.distance_duration.walking.duration} ({building.distance_duration.walking.distance})
            </div>
            <div className="text-sm text-neutral-500">
              Driving: {building.distance_duration.driving.duration} ({building.distance_duration.driving.distance})
            </div>
          </div>
        ))}
      </div>
  );
}