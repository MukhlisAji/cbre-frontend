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

export default function SearchResult({ onBack }) {
    const { selectedBuildings, setSelectedBuildings } = useAppContext();
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [confirmSave, setConfirmSave] = useState(false);
    const [buildings, setBuildings] = useState(BUILDINGDATADUMMY);

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

    const darkGreen = '#5a8184';
    const cusInput = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: darkGreen,
            },
            '&.Mui-focused fieldset': {
                borderColor: darkGreen,
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: darkGreen,
        },
    };

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
                            className={`flex w-full p-2 border-b space-x-2.5 cursor-pointer ${selectedBuilding && selectedBuilding.id === building.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
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

            <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-2 bg-neutral-100 shadow-md">
                <button
                    className="flex items-center font-thin px-4 py-2 text-blue-700 border rounded-md bg-white text-xs hover:bg-neutral-200 hover:text-neutral-700 transition-all duration-300"
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
                <div className="z-50 fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white rounded-lg shadow-lg w-80 max-w-md">
                        <div
                            onClick={() => { setConfirmSave(false) }}
                            className='absolute right-2 top-2 cursor-pointer'>
                            <RiCloseLine className='text-lg' />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className='w-full border-b my-2'>
                                <h3 className="text-md font-semibold text-neutral-700 text-center py-2">Add to New Project</h3>
                            </div>

                            <div className="px-4 w-full mb-4">
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    size="small"
                                >
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Project Name"
                                        size="small"
                                        margin="dense"
                                        sx={cusInput}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Account"
                                        size="small"
                                        margin="dense"
                                        sx={cusInput}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Contact"
                                        size="small"
                                        margin="dense"
                                        sx={cusInput}
                                    />
                                </Box>
                            </div>
                            <div className="border-t py-2 px-4 flex justify-center space-x-2 w-full justify-center">
                                <div className='itemx-center flex gap-2'>
                                    <button
                                        className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                                    >
                                        Save
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => { setConfirmSave(false) }}
                                        className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs hover:text-white hover:bg-c-weldon-blue"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )}
        </div >
    );
}
