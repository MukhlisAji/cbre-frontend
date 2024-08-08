import React, { useState } from 'react';
import { IoAddOutline, IoArrowBackOutline, IoSaveOutline } from 'react-icons/io5';
import DetailedView from './DetailedView';
import { BUILDINGDATADUMMY } from '../../../lib/const/DummyData';
import { RiCloseLine } from 'react-icons/ri';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import DraggableBuilding from '../project/DraggableBuilding';
import { BsCheckLg } from 'react-icons/bs';
import { Checkbox } from '@headlessui/react';
import { useAppContext } from '../../../../AppContext';
import AddProject from '../project/AddProject';

export default function SearchResult({ onBack }) {
    const { selectedBuildings, setSelectedBuildings } = useAppContext();
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const {confirmSave, setConfirmSave} = useAppContext();
    const [buildings, setBuildings] = useState(BUILDINGDATADUMMY);
    const [saveNew, setSaveNew] = useState();
    const { toggleDrawer } = useAppContext();

    const handleBuildingChange = (index) => {
        const newBuildings = [...buildings];
        newBuildings[index].enabled = !newBuildings[index].enabled;
        setBuildings(newBuildings);

        const updatedSelectedBuildings = newBuildings.filter(building => building.enabled);
        setSelectedBuildings(updatedSelectedBuildings);
    };

    const handleItemClick = (building) => {
        setSelectedBuilding(building);
    };

    const handleCloseDetailView = () => {
        setSelectedBuilding(null);
    };

    const onClose = () => {
        setConfirmSave(false);
    }

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col w-full">
                <div className='flex items-center gap-2 mb-4'>
                    <div className='p-1.5 rounded-full hover:bg-neutral-200 cursor-pointer'>
                        <IoArrowBackOutline onClick={onBack} className='text-md' />
                    </div>
                    <span className="text-md text-neutral-700">Search Results</span>
                </div>
                <div className="flex-grow space-y-2 w-full">
                    {buildings.map((building, index) => (
                        <div
                            key={building.id}
                            className={`flex w-full p-2 border-b space-x-2.5 cursor-pointer bg-white ${selectedBuilding && selectedBuilding.id === building.id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                            onClick={() => handleItemClick(building)}
                        >
                            <Checkbox
                                checked={building.enabled}
                                onChange={() => handleBuildingChange(index)}
                                className={`form-checkbox h-5 w-5 text-c-teal mt-2.5 rounded-md ${building.enabled ? 'bg-c-teal' : 'bg-neutral-300'}`}
                            >
                                {building.enabled && <BsCheckLg className="text-white text-lg" />}
                            </Checkbox>
                            <DraggableBuilding building={building} />
                        </div>
                    ))}
                </div>
            </div>

            {selectedBuilding && (
                <DetailedView building={selectedBuilding} onClose={handleCloseDetailView} />
            )}

            <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-2 bg-neutral-200 shadow-md">
                <button
                    onClick={() => { toggleDrawer('saveProject') }}
                    className="flex items-center font-thin px-4 py-2 text-blue-700 border rounded-md bg-white text-xs hover:bg-neutral-100 hover:text-neutral-700 transition-all duration-300"
                >
                    <IoSaveOutline className="mr-2 text-lg" />
                    Save Project
                </button>
                <button
                    onClick={() => { setConfirmSave(true) }}
                    className="flex items-center font-thin px-4 py-2 text-white rounded-md bg-c-teal text-xs hover:bg-c-weldon-blue transition-all duration-300"
                >
                    <IoAddOutline className="mr-2 text-lg" />
                    New
                </button>
            </div>

            {confirmSave && (
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                    <AddProject onClose={() => { setConfirmSave(false) }} />
                </div>
            )}

        </div>
    );
}
