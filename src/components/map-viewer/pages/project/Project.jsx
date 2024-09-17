import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from '@headlessui/react';
import { BsCheckLg, BsTrash } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useDrop } from 'react-dnd';
import { BUILDINGDATADUMMY } from '../../../lib/const/DummyData';
import ProjectShare from './ProjectShare';
import { useAppContext } from '../../../../AppContext';
import NewProject from './NewProject';

const ItemTypes = {
    BUILDING: 'building',
};

const sampleData = {
    projects: [
        { id: 1, name: "Project Alpha", description: "A project focused on developing alpha features.", enabled: false },
        { id: 2, name: "Project Beta", description: "A project focused on developing beta features.", enabled: false },
    ],
    buildings: [
        { id: 1, name: "Building One", location: "1234 Main St", enabled: true, projectId: 1 },
        { id: 2, name: "Building Two", location: "5678 Elm St", enabled: true, projectId: 2 },
    ],
};

export default function Project() {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const [projects, setProjects] = useState(sampleData.projects);
    const [buildings, setBuildings] = useState(BUILDINGDATADUMMY);
    const [buildingIdList, setBuildingIdList] = useState([]);
    const { openProject, drawerContent, toggleDrawer } = useAppContext();
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(null);
    const [newProjectDialogVisible, setNewProjectDialogVisible] = useState(false);
    const confirmationRef = useRef(null);
    const [newProjectName, setNewProjectName] = useState('');
    const [newAccount, setNewAccount] = useState('');
    const [newContact, setNewContact] = useState('');


    const confirmDeletion = (itemType, itemId) => {
        setShowConfirmation({ itemType, itemId }); // Show the confirmation dialog
    };

    const handleConfirmDelete = (itemType, itemId) => {
        if (itemType === 'project') {
            handleDeleteProject(itemId);
        } else if (itemType === 'building') {
            handleDeleteBuilding(itemId);
        }
        setShowConfirmation(null); // Hide the confirmation dialog
    };


    const handleCancelDelete = () => {
        setShowConfirmation(null); // Hide the confirmation dialog
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click was outside of the confirmation dialog and the trash icon
            if (
                confirmationRef.current &&
                !confirmationRef.current.contains(event.target) &&
                !event.target.closest('.trash-icon')
            ) {
                setShowConfirmation(null); // Close the confirmation dialog
            }
        };

        // Add event listener to detect clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleProjectChange = (projectId) => {
        const newProjects = projects.map((project) =>
            project.id === projectId ? { ...project, enabled: !project.enabled } : project
        );
        setProjects(newProjects);
    };


    const filteredBuildings = sampleData.buildings.filter(building => building.projectId === selectedProjectId);


    const handleBuildingChange = (index) => {
        const newBuildings = [...buildings];
        newBuildings[index].enabled = !newBuildings[index].enabled;
        setBuildings(newBuildings);
    };

    const handleProjectSelection = (projectId) => {
        setSelectedProjectId(projectId === selectedProjectId ? null : projectId); // Toggle selection

    }

    const handleCancelShare = () => {
        setConfirmationDialogVisible(false);
    };

    const handleCancelSaveNew = () => {
        setNewProjectDialogVisible(false);
    }

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

    const handleSaveNewProject = () => {
        const newProject = {
            id: projects.length + 1, // Simple id generation, update based on your logic
            name: newProjectName,
            description: "New project", // You can update this to be more descriptive
            enabled: false,
        };
        setProjects([...projects, newProject]);
        setNewProjectDialogVisible(false);
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
                                <button
                                    className="flex items-center font-normal text-sm space-x-2 px-4 py-0.5 hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-700 rounded rounded-md transition duration-150 ease-in-out mx-2"
                                    onClick={() => setNewProjectDialogVisible(true)}
                                >
                                    New
                                </button>
                            </div>
                            <div className='flex flex-col flex-grow p-2'>
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`relative mb-2 py-2 pl-2 pr-8 flex items-center cursor-pointer group ${selectedProjectId === project.id ? 'bg-blue-100' : 'bg-white'
                                            } hover:bg-neutral-200`}
                                        onClick={(e) => {
                                            if (!e.target.closest('.trash-icon')) {
                                                handleProjectSelection(project.id);
                                            }
                                        }}
                                    >
                                        <Checkbox
                                            checked={project.enabled}
                                            onChange={() => handleProjectChange(project.id)}
                                            className={`form-checkbox h-5 w-5 text-c-teal rounded-md ${project.enabled ? 'bg-c-teal' : 'bg-neutral-300'
                                                }`}
                                        >
                                            {project.enabled && <BsCheckLg className="text-white text-lg" />}
                                        </Checkbox>
                                        <span className="ml-2 text-sm text-neutral-700">{project.name}</span>

                                        <BsTrash
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirmDeletion('project', project.id);
                                            }}
                                            className="trash-icon absolute right-2 h-5 w-5 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />

                                        {showConfirmation?.itemType === 'project' && showConfirmation?.itemId === project.id && (
                                            <div
                                                ref={confirmationRef}
                                                className="absolute right-10 top-2 z-20 bg-white border border-gray-300 shadow-lg p-2 rounded-md"
                                            >
                                                <p className="text-sm text-gray-700">Are you sure?</p>
                                                <div className="flex justify-end space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleConfirmDelete('project', project.id)}
                                                        className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={handleCancelDelete}
                                                        className="bg-gray-300 text-black text-xs px-2 py-1 rounded-md"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>


                        </div>
                        <div className='flex flex-col h-3/6 mb-2'>
                            <div className='flex items-center justify-center bg-neutral-200'>
                                <h2 className="text-sm py-3 w-full text-center items-center font-semibold text-neutral-700">Building List</h2>
                            </div>
                            <div ref={drop} className={`flex flex-col flex-grow p-2 h-full ${isOver ? 'border border-green-500' : ''}`}>
                                {selectedProjectId && (
                                    <div className='flex flex-col flex-grow p-2'>
                                        {filteredBuildings.length > 0 ? (
                                            filteredBuildings.map((building) => (
                                                <div key={building.id} className="relative mb-2 py-2 pl-2 pr-8 flex items-center group hover:bg-neutral-200">
                                                    <span className="ml-2">{building.name} - {building.location}</span>

                                                    {/* Trash icon for buildings */}
                                                    <BsTrash
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmDeletion('building', building.id);
                                                        }}
                                                        className="trash-icon absolute right-2 h-5 w-5 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    />

                                                    {/* Confirmation dialog for buildings */}
                                                    {showConfirmation?.itemType === 'building' && showConfirmation?.itemId === building.id && (
                                                        <div
                                                            ref={confirmationRef}
                                                            className="absolute right-10 top-2 z-20 bg-white border border-gray-300 shadow-lg p-2 rounded-md"
                                                        >
                                                            <p className="text-sm text-gray-700">Are you sure?</p>
                                                            <div className="flex justify-end space-x-2 mt-2">
                                                                <button
                                                                    onClick={() => handleConfirmDelete('building', building.id)}
                                                                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                                                >
                                                                    Delete
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelDelete}
                                                                    className="bg-gray-300 text-black text-xs px-2 py-1 rounded-md"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-neutral-500">
                                                No buildings available for this project.
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                    My Project List
                                </h2>
                            </div>
                            <div className='flex flex-col flex-grow p-2'>
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`relative mb-2 py-2 pl-2 pr-8 flex items-center cursor-pointer group ${selectedProjectId === project.id ? 'bg-blue-100' : 'bg-white'
                                            } hover:bg-neutral-200`}
                                        onClick={(e) => {
                                            if (!e.target.closest('.trash-icon')) {
                                                handleProjectSelection(project.id);
                                            }
                                        }}
                                    >
                                        <Checkbox
                                            checked={project.enabled}
                                            onChange={() => handleProjectChange(project.id)}
                                            className={`form-checkbox h-5 w-5 text-c-teal rounded-md ${project.enabled ? 'bg-c-teal' : 'bg-neutral-300'
                                                }`}
                                        >
                                            {project.enabled && <BsCheckLg className="text-white text-lg" />}
                                        </Checkbox>
                                        <span className="ml-2 text-sm text-neutral-700">{project.name}</span>

                                        <BsTrash
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirmDeletion('project', project.id);
                                            }}
                                            className="trash-icon absolute right-2 h-5 w-5 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />

                                        {showConfirmation?.itemType === 'project' && showConfirmation?.itemId === project.id && (
                                            <div
                                                ref={confirmationRef}
                                                className="absolute right-10 top-2 z-20 bg-white border border-gray-300 shadow-lg p-2 rounded-md"
                                            >
                                                <p className="text-sm text-gray-700">Are you sure?</p>
                                                <div className="flex justify-end space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleConfirmDelete('project', project.id)}
                                                        className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={handleCancelDelete}
                                                        className="bg-gray-300 text-black text-xs px-2 py-1 rounded-md"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>


                        </div>
                        <div className='flex flex-col h-3/6 mb-2'>
                            <div className='flex items-center justify-center bg-neutral-200'>
                                <h2 className="text-sm py-3 w-full text-center items-center font-semibold text-neutral-700">Building List</h2>
                            </div>
                            <div ref={drop} className={`flex flex-col flex-grow p-2 h-full ${isOver ? 'border border-green-500' : ''}`}>
                                {selectedProjectId && (
                                    <div className='flex flex-col flex-grow p-2'>
                                        {filteredBuildings.length > 0 ? (
                                            filteredBuildings.map((building) => (
                                                <div key={building.id} className="relative mb-2 py-2 pl-2 pr-8 flex items-center group hover:bg-neutral-200">
                                                    <span className="ml-2">{building.name} - {building.location}</span>

                                                    {/* Trash icon for buildings */}
                                                    <BsTrash
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmDeletion('building', building.id);
                                                        }}
                                                        className="trash-icon absolute right-2 h-5 w-5 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    />

                                                    {/* Confirmation dialog for buildings */}
                                                    {showConfirmation?.itemType === 'building' && showConfirmation?.itemId === building.id && (
                                                        <div
                                                            ref={confirmationRef}
                                                            className="absolute right-10 top-2 z-20 bg-white border border-gray-300 shadow-lg p-2 rounded-md"
                                                        >
                                                            <p className="text-sm text-gray-700">Are you sure?</p>
                                                            <div className="flex justify-end space-x-2 mt-2">
                                                                <button
                                                                    onClick={() => handleConfirmDelete('building', building.id)}
                                                                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                                                >
                                                                    Delete
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelDelete}
                                                                    className="bg-gray-300 text-black text-xs px-2 py-1 rounded-md"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-neutral-500">
                                                No buildings available for this project.
                                            </div>
                                        )}
                                    </div>
                                )}
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
            {newProjectDialogVisible && (
                <NewProject onClose={handleCancelSaveNew} />
            )}

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
