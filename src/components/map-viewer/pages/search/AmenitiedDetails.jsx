import React, { useEffect, useState } from 'react';

export default function AmenitiesDetails({obj,category, currentAmenities,  setCurrentAmenitiesData}){
  useEffect(()=>{
    if (currentAmenities === category){
      setCurrentAmenitiesData(obj)
    }
   
  },[currentAmenities])


  return (
      <div>
        {obj.places_result.map((building, buildingIndex) => (
          <div key={`building-${buildingIndex}`} className='pt-2'>
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