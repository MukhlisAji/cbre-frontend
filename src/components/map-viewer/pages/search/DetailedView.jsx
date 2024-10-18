import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import AmenitiesButton from '../../../shared/AmenitiesButton';

import { useRef } from 'react';
import { Spinner } from 'flowbite-react';
export default function DetailedView({ building, onClose, nearByMrt, nearByOthers, isLoading }) {

    const [activeTab, setActiveTab] = useState('Details');
    const [currentAmenities, setCurrentAmenities] = useState('MRts')
    const[height, setHeight]= useState(0)
    const targetRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
          const screenHeight = window.innerHeight;
          const newHeight = screenHeight - 400;
          setHeight(newHeight);
        };
        console.log("ini")
        console.log(building)
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
        
      }, []);

      useEffect(() => {
      targetRef.current = document.getElementById(currentAmenities)
      if (targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: 'auto' });
          targetRef.current.focus(); 
        }
    
      }, [currentAmenities]);

      

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':
                
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Completion</span>
                            <span> </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Zoning:</span>
                            <span>{`${building.zoning}`}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">GPA:</span>
                            <span>For Sale</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Base Area:</span>
                            <span>Vacant</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">No of Floors:</span>
                            <span>28,656 sq ft</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Car Park Lists:</span>
                            <span>Rent</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Lease Type:</span>
                            <span>Negotiator</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Commencement:</span>
                            <span>Immediate</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Expiry:</span>
                            <span>Landlord</span>
                        </div>
                    </div>
                );
            case 'Availability':
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Available Spaces:</span>
                            <span>{building.SPACE_COUNT}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Next Availability:</span>
                            <span>Immediate</span>
                        </div>
                    </div>
                );
            case 'Tenant Stack':
                return (
                    <div className="p-2 text-sm text-gray-700 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Tenant 1:</span>
                            <span>ABC Corp</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Tenant 2:</span>
                            <span>XYZ Ltd</span>
                        </div>
                    </div>
                );
            case 'Amenities':
                return(
                <div className=" text-sm text-gray-700 space-y-2">
                    <div className='border-b-2 border-black flex flex-wrap'>
                        <AmenitiesButton label={"Bus Stops"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Bus Stop"} targetRef={targetRef}/>
                        <AmenitiesButton label={"MRT"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"MRT"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Food"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Food"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Shopping Malls"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Shopping Malls"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Gyms"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Gyms"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Hotels"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Hotels"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Hospital /Clinics"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Hospitals"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Schools"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Schools"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Airports"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Airport"}/>
                        <AmenitiesButton label={"Land Checkpoints"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Checkpoints"} targetRef={targetRef}/>
                        <AmenitiesButton label={"Ports"} currentAmenities={currentAmenities} setCurrentAmenities={setCurrentAmenities} category={"Ports"} targetRef={targetRef}/>
                        
                    </div>
                    <div
                        style={{ height: `${height}px` }}
                        className="overflow-y-auto pr-3 flex-grow"
                    >
                        <div className="flex-grow space-y-2 w-full">
                            {/* <div id = "MRT" className='text-sm text-gray-700'>
                                MRT
                            </div>
                            {nearByMrt[0].distance_duration.map((mrt, index)=>{
                                <>
                                    <div className='text-sm text-gray-500'>
                                        {mrt.Destination}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                    Walking{mrt.Destination}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                    {mrt.Destination}
                                    </div>
                                </>
                            })} */}
                           
                       
                           {isLoading ? (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                                </div>
                            ) : (
                                <>
                            
                                    <div  className="space-y-2">
                                        <div id="MRT" className="text-sm text-neutral-900 font-bold">
                                            MRT
                                        </div>
                                        {nearByMrt.map((mrt, index) => (
                                            <div key={index}>
                                                <div className="text-sm text-neutral-700">
                                                    {mrt.nearby_station}
                                                </div>
                                                <div className="text-sm text-neutral-500">
                                                    Walking: {mrt.walking_duration} ({mrt.walking_distance})
                                                </div>
                                                <div className="text-sm text-neutral-500">
                                                    Driving: {mrt.driving_duration} ({mrt.driving_distance})
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                
                                    {nearByOthers.map((obj, objIndex) => (
                                        <div key={`category-${objIndex}`} className="space-y-2">
                                            <div id={obj.category} className="text-sm text-neutral-900 font-bold">
                                                {obj.category}
                                            </div>
                                            {obj.places_result.map((building, buildingIndex) => (
                                                <div key={`building-${buildingIndex}`}>
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
                                    ))}
                                </>
                            )}

                      
  
                        </div>
                    </div>
                </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className="fixed right-0 top-0 w-1/5 h-full translate-y-12 bg-white shadow-md z-10">
            <div className="px-4 py-2 flex justify-between items-center bg-neutral-100">
                <h2 className="text-sm font-semibold text-neutral-700">{building.BUILDINGNAME}</h2>
                <div
                    onClick={onClose}
                    className='absolute right-2 top-2 cursor-pointer'>
                    <RiCloseLine className='text-lg' />
                </div>
            </div>
            <p className='p-2 px-4 text-neutral-700 text-sm'>{building.BUILDINGNAME}</p>
            <img
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Building"
                className="w-full h-32 object-cover"
            />
            <div className="flex justify-around border-b">
                <button
                    className={`p-2 w-1/4 text-neutral-500 text-sm ${activeTab === 'Details' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Details')}
                >
                    Details
                </button>
                <button
                    className={`p-2 w-1/4text-neutral-500 text-sm ${activeTab === 'Availability' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Availability')}
                >
                    Availability ({building.SPACE_COUNT})
                </button>
                <button
                    className={`p-2 w-1/4 text-neutral-500 text-sm ${activeTab === 'Tenant Stack' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Tenant Stack')}
                >
                    Tenant Stack
                </button>
                <button
                    className={`p-2 w-1/4 text-neutral-500 text-sm ${activeTab === 'Amenities' ? 'border-b-2 border-black text-neutral-700' : ''}`}
                    onClick={() => setActiveTab('Amenities')}
                >
                    Amenities
                </button>
            </div>
            <div className="bg-gray-100 px-4 rounded-md h-full">
                {renderTabContent()}
            </div>
        </div>
    );
}
