import React, { useState } from 'react';
import { Checkbox } from '@headlessui/react';
import { BsCheckLg } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useDrop } from 'react-dnd';
import { BUILDINGDATADUMMY } from '../../../lib/const/DummyData';
import ProjectShare from './ProjectShare';
import { useAppContext } from '../../../../AppContext';

const ItemTypes = {
    BUILDING: 'building',
};

const sampleData = {
    projects: [
        { id: 1, name: "Project Alpha", description: "A project focused on developing alpha features.", enabled: false },
        { id: 2, name: "Project Beta", description: "A project focused on developing beta features.", enabled: true },
    ],
    buildings: [
        { id: 1, name: "Building One", location: "1234 Main St", enabled: false },
        { id: 2, name: "Building Two", location: "5678 Elm St", enabled: true },
    ],
};

export default function Project() {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const [projects, setProjects] = useState(sampleData.projects);
    const [buildings, setBuildings] = useState(BUILDINGDATADUMMY);
    const [buildingIdList, setBuildingIdList] = useState([]);
    const { openProject, drawerContent, toggleDrawer } = useAppContext();

    const handleProjectChange = (index) => {
        const newProjects = [...projects];
        newProjects[index].enabled = !newProjects[index].enabled;
        setProjects(newProjects);
    };

    const handleBuildingChange = (index) => {
        const newBuildings = [...buildings];
        newBuildings[index].enabled = !newBuildings[index].enabled;
        setBuildings(newBuildings);
    };

    const handleCancelShare = () => {
        setConfirmationDialogVisible(false);
    };

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.BUILDING,
        drop: (item) => addBuildingToProject(item.building),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const addBuildingToProject = (building) => {
        setBuildingIdList((prev) => [...prev, building.id]);
    };

    return (
        <div className="relative">
            <div
                className={`fixed w-1/5 inset-y-0 right-0 z-20 flex flex-col transition-transform duration-300 ease-in-out bg-neutral-100 shadow-lg ${openProject ? 'transform translate-y-12' : 'transform translate-y-full pointer-events-none'}`}
            >
                {drawerContent === 'default' ? (

                    <div className="bg-neutral-100 h-full flex flex-col">
                        <div className='flex flex-col h-3/6 border-b'>
                            <div className='flex items-center justify-center bg-neutral-200'>
                                <h2 className="text-sm py-3 w-full text-center items-center font-semibold text-neutral-700">
                                    My Project List
                                </h2>
                            </div>
                            <div className='flex flex-col flex-grow p-2'>
                                {projects.map((project, index) => (
                                    <div key={project.id} className='mb-2 py-2 flex items-center'>
                                        <Checkbox
                                            checked={project.enabled}
                                            onChange={() => handleProjectChange(index)}
                                            className={`form-checkbox h-5 w-5 text-c-teal rounded-md ${project.enabled ? 'bg-c-teal' : 'bg-neutral-300'}`}
                                        >
                                            {project.enabled && <BsCheckLg className="text-white text-lg" />}
                                        </Checkbox>
                                        <span className="ml-2 text-sm text-neutral-700">{project.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col h-3/6 mb-2'>
                            <div className='flex items-center justify-center bg-neutral-200'>
                                <h2 className="text-sm py-3 w-full text-center items-center font-semibold text-neutral-700">Building List</h2>
                            </div>
                            <div ref={drop} className={`flex flex-col flex-grow p-2 h-full ${isOver ? 'border border-green-500' : ''}`}>
                                {buildings.filter((building) => buildingIdList.includes(building.id)).map((building, index) => (
                                    <div key={building.id} className='mb-2 py-2 flex items-center'>
                                        <Checkbox
                                            checked={building.enabled}
                                            onChange={() => handleBuildingChange(index)}
                                            className={`form-checkbox h-5 w-5 text-c-teal rounded-md ${building.enabled ? 'bg-c-teal' : 'bg-neutral-300'}`}
                                        >
                                            {building.enabled && <BsCheckLg className="text-white text-lg" />}
                                        </Checkbox>
                                        <span className="ml-2 text-sm text-neutral-700">{building.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-bottom flex-grow px-2 h-1/6'>
                            <div className="flex w-full mt-auto mb-20 pb-2">
                                <button
                                    className="flex-grow p-1.5 w-1/2 rounded-l-md shadow-md text-sm bg-gray-200 text-neutral-500 hover:bg-gray-300"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => setConfirmationDialogVisible(true)}
                                    className="flex-grow p-1.5 w-1/2 rounded-r-md shadow-md text-sm bg-gray-200 text-neutral-500 hover:bg-gray-300"
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-neutral-100 h-full flex flex-col">
                        <div className='flex flex-col h-3/6 border-b'>
                            <div className='flex items-center justify-center bg-neutral-200'>
                                <h2 className="text-sm py-3 w-full text-center items-center font-semibold text-neutral-700">
                                    James's Project List
                                </h2>
                            </div>
                            <div className='flex flex-col flex-grow p-2'>
                                {projects.map((project, index) => (
                                    <div key={project.id} className='mb-2 py-2 flex items-center'>
                                        <Checkbox
                                            checked={project.enabled}
                                            onChange={() => handleProjectChange(index)}
                                            className={`form-checkbox h-5 w-5 text-c-teal rounded-md ${project.enabled ? 'bg-c-teal' : 'bg-neutral-300'}`}
                                        >
                                            {project.enabled && <BsCheckLg className="text-white text-lg" />}
                                        </Checkbox>
                                        <span className="ml-2 text-sm text-neutral-700">{project.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-bottom flex-grow px-2 h-1/6'>
                            <div className="flex w-full mt-auto mb-20 pb-2">
                                <button
                                    className="flex-grow p-1.5 w-1/2 rounded-l-md shadow-md text-sm bg-gray-200 text-neutral-500 hover:bg-gray-300"
                                >
                                    Save
                                </button>
                                <button
                                    // onClick={() => setConfirmationDialogVisible(true)}
                                    className="flex-grow p-1.5 w-1/2 rounded-r-md shadow-md text-sm bg-gray-200 text-neutral-500 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                )}

            </div>
            <button
                className="fixed z-20 bottom-0 right-0 text-sm px-2 py-2 bg-c-teal font-thin text-white hover:bg-c-weldon-blue w-1/5 h-8 flex items-center justify-center transition-all duration-300 ease-in-out"
                onClick={() => toggleDrawer('default')}
            >
                {openProject ? (
                    <>
                        Manage Project <IoIosArrowDown className="ml-2" />
                    </>
                ) : (
                    <>
                        Manage Project <IoIosArrowUp className="ml-2" />
                    </>
                )}
            </button>
            <div className='z-50'>
                {confirmationDialogVisible && (
                    <ProjectShare onClose={handleCancelShare} />
                )}
            </div>
        </div>
    );
}

// export default function Project() {
//     return (
//         <DrawerProvider>
//             <ProjectComponent />
//         </DrawerProvider>
//     );
// }
