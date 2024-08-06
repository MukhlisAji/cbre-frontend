import React, { Fragment, useEffect, useState } from 'react';
import { BUILDINGDATADUMMY, SPACEDATADUMMY, LEASEDATADUMMY } from '../../lib/const/DataEntryDummy';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileDownload, MdOutlineFileUpload } from 'react-icons/md';
import CustomTable from '../shared/CustomTable';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { IoCheckmarkOutline } from 'react-icons/io5';

export default function LeaseTemplate() {
    const [selected, setSelected] = useState(BUILDINGDATADUMMY[3])
    const [selectedTemplate, setSelectedTemplate] = useState('mandatory');
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [buildingSearchTerm, setBuildingSearchTerm] = useState('');
    const [templateSearchTerm, setTemplateSearchTerm] = useState('');
    const [dragging, setDragging] = useState(false);



    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const navigate = useNavigate();
    // const location = useLocation();

    const buildingData = [
        { id: 1, name: 'JTC Space @ Buroh55 Ayer Rajah Crescent' },
        { id: 2, name: '62 Loyang Way' },
        { id: 3, name: 'Bugis Village - 64 Queen Street' },
        { id: 4, name: 'JTC Aerospace @ Seletar Aerospace Park' },
        { id: 5, name: '62 Loyang Way' },
        { id: 6, name: 'JTC Aerospace @ Seletar Aerospace Park' },
        { id: 7, name: '62 Loyang Way' },
        { id: 8, name: 'Bugis Village - 64 Queen Street' },
        { id: 9, name: 'JTC Aerospace @ Seletar Aerospace Park' },
        { id: 10, name: '62 Loyang Way' },
        { id: 11, name: 'JTC Aerospace @ Seletar Aerospace Park' }
    ];

    const handleTemplateChange = (e) => setSelectedTemplate(e.target.value);

    const handleBuildingSearchChange = (event) => setBuildingSearchTerm(event.target.value);
    const handleTemplateSearchChange = (event) => setTemplateSearchTerm(event.target.value);

    const filteredBuildings = buildingData.filter((building) =>
        building.name.toLowerCase().includes(buildingSearchTerm.toLowerCase())
    );

    // to handle select all table Select Building
    const handleSelectAll = () => {
        if (selectedBuildings.length === filteredBuildings.length) {
            // If all buildings are already selected, deselect all
            setSelectedBuildings([]);
        } else {
            // If not all buildings are selected, select all
            setSelectedBuildings(filteredBuildings.map(building => building.id));
        }
    };



    const filteredTemplates = SPACEDATADUMMY.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(templateSearchTerm.toLowerCase())
        )
    );

    const filteredLease = LEASEDATADUMMY.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(templateSearchTerm.toLowerCase())
        )
    );

    const columns = [
        { Header: 'Floor', accessor: 'floor', width: 'w-6' },
        { Header: 'Space', accessor: 'space', width: 'w-10' },
        { Header: 'Lease Title', accessor: 'leaseTitle', width: 'w-14' },
        { Header: 'Lease Start', accessor: 'leaseStart', width: 'w-12' },
        { Header: 'Lease End', accessor: 'leaseEnd', width: 'w-12' },
        { Header: 'Lease Status', accessor: 'leaseStatus', width: 'w-8' },
        { Header: 'Account Name', accessor: 'accountName', width: 'w-12' },
        { Header: 'Account Name Fuzzy Match', accessor: 'accountFuzzyMatch', width: 'w-12' },
        { Header: 'Contact', accessor: 'contact', width: 'w-12' },
        { Header: 'Contact Fuzzy Match', accessor: 'contactFuzzyMatch', width: 'w-12' },


    ];


    const handleBuildingSelect = (buildingId) => {
        setSelectedBuildings((prev) =>
            prev.includes(buildingId) ? prev.filter((id) => id !== buildingId) : [...prev, buildingId]
        );
    };

    const handleDownload = () => {
        // Implement download functionality based on selected template or selected buildings
        console.log('Selected Template:', selectedTemplate);
        console.log('Selected Buildings:', selectedBuildings);
    };

    const handleUpload = (e) => {
        // const file = e.target.files[0];
        // Logic for uploading file
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        // const file = e.dataTransfer.files[0];
        // Logic for uploading file
    };

    const handleSubmit = (path) => {
        navigate(path);
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - 100; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        // Set initial height
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [templates, setTemplates] = useState(filteredTemplates);

    const handleSave = (updatedBuilding) => {
        setTemplates(templates.map((building) =>
            building.id === updatedBuilding.id ? updatedBuilding : building
        ));
    };

    return (
        <div>
            <div style={{ height: `${sectionHeight}px` }} className="flex-1 overflow-y-auto flex flex-col px-5 py-5 h-screen p-4 bg-white border-t border-neutral-200 border-sm">

                <div className="bg-white shadow-md p-6 px-3 py-3 mb-5 rounded rounded-md">

                    <div className="mt-2 text-c-dark-grayish text-md bg-neutral-100 rounded rounded-md">

                        <div className=' px-3 py-3 items-centered flex flex-row gap-4 '>

                            <div className='flex flex-col w-3/5'>
                                <h2 className="text-neutral-700 font-semibold text-md">Select Template</h2>

                                <div className="mt-2 text-neutral-600 text-sm">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="mandatory"
                                            checked={selectedTemplate === 'mandatory'}
                                            onChange={handleTemplateChange}
                                            className="form-radio text-teal-600 checked:bg-teal-500 checked:hover:bg-teal-600 active:text-teal-700 checked:active:bg-teal-700 checked:focus:bg-teal-700 focus:outline-none h-4 w-4"
                                        />
                                        <span className="ml-2">Mandatory Columns</span>
                                    </label>
                                </div>
                                <div className="mt-2 pb-3 text-neutral-600 text-sm">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="allFields"
                                            checked={selectedTemplate === 'allFields'}
                                            onChange={handleTemplateChange}
                                            className="form-radio h-4 w-4 text-c-teal checked:text-c-teal"
                                        />
                                        <span className="ml-2">All Fields</span>
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-col w-2/5'>
                                <Listbox value={selected} onChange={setSelected}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-md font-semibold leading-6 text-neutral-700">Select Building</Listbox.Label>
                                            <div className="relative mt-2">
                                                <Listbox.Button className="relative sm:w-full lg:w-3/4 cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-sm text-neutral-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                                                    <span className="flex items-center">
                                                        <span className="ml-1 block truncate">{selected.buildingName}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-1 flex items-center pr-2">
                                                        <HiChevronUpDown className="h-5 w-5 text-gray-300" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 sm:w-full lg:w-3/4 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {BUILDINGDATADUMMY.map((building) => (
                                                            <Listbox.Option
                                                                key={building.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'bg-c-teal text-white' : 'text-neutral-600',
                                                                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={building}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-1 block truncate')}
                                                                            >
                                                                                {building.buildingName}
                                                                            </span>
                                                                        </div>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-neutral-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                            >
                                                                                <IoCheckmarkOutline className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>


                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-row gap-4'>
                        <div className="min-w-[16rem] my-4 bg-white w-2/6">
                            <h2 className="px-3 text-md text-neutral-700 font-semibold mb-4 h-7">Select the space(s) for the selected building:</h2>
                            <div className="relative rounded-sm border border-gray-300 shadow-sm text-sm">
                                <body className="flex w-full h-96 rounded rounded-sm">
                                    <div className="flex flex-col w-full">
                                        {/* Table Headers */}
                                        <div className="flex bg-c-teal text-white">
                                            <div className="flex items-center justify-start w-1/12 h-10 px-2.5 ml-2">
                                            </div>
                                            <div className="flex items-center justify-start w-5/12 h-10 px-2.5">
                                                <span>Building</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/12 h-10 px-2.5">
                                                <span>Floor</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/12 h-10 px-2.5">
                                                <span>Space</span>
                                            </div>
                                        </div>

                                        {/* Search and Select All */}
                                        <div className="flex bg-white">
                                            <div className="flex items-center justify-center w-1/12 h-10 px-2.5 ml-2 relative">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBuildings.length === filteredTemplates.length}
                                                    onChange={handleSelectAll}
                                                    className="form-checkbox h-4 w-4 text-c-teal checked:bg-c-teal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                />
                                            </div>
                                            <div className="flex items-center justify-start w-11/12 h-10 px-2.5">
                                                <div className="relative w-full">
                                                    <label htmlFor="table-search" className="sr-only">Search building...</label>
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <svg className="w-4 h-4 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="table-search"
                                                        placeholder="Search..."
                                                        value={buildingSearchTerm}
                                                        onChange={handleBuildingSearchChange}
                                                        className="w-full pl-10 py-1.5 h-full border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-c-teal focus:border-c-teal"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Table Body */}
                                        <div className="overflow-auto flex-grow">
                                            {filteredTemplates.map((building, index) => (
                                                <div key={index} className={`flex ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-gray-200`}>
                                                    <div className="flex items-center justify-center w-1/12 h-10 px-2.5 ml-2 relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBuildings.includes(building.id)}
                                                            onChange={() => handleBuildingSelect(building.id)}
                                                            className="form-checkbox h-4 w-4 text-c-teal checked:bg-c-teal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-start w-5/12 h-10 px-2.5 text-neutral-600">
                                                        <span>{building.spaceName}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-3/12 h-10 px-2.5 text-neutral-600">
                                                        <span>{building.floor}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-3/12 h-10 px-2.5 text-neutral-600">
                                                        <span className='pl-2'>{building.unitNo}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </body>





                            </div>

                        </div>


                        <div className="min-w-[16rem] my-4 bg-white w-4/6">
                            <h2 className="px-3 text-md text-neutral-700 font-semibold mb-4 h-7">List of existing spaces (tier 1) for the selected building:</h2>
                            <div className="relative rounded-sm border border-gray-300 shadow-sm text-sm">
                                <body className="flex min-w-[500px] w-full h-96 rounded rounded-sm">
                                    <div className="flex flex-col w-full">
                                        {/* Table Headers */}
                                        <div className="flex bg-c-teal text-white">
                                            <div className="flex items-center justify-start w-1/12 h-10 px-2.5">
                                            </div>
                                            <div className="flex items-center justify-start w-3/12 h-10 px-2.5">
                                                <span>Lease Title</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/12 h-10 px-2.5">
                                                <span>Account Name</span>
                                            </div>
                                            <div className="flex items-center justify-start w-2/12 h-10 px-2.5">
                                                <span>Lease Start</span>
                                            </div>
                                            <div className="flex items-center justify-start w-2/12 h-10 px-2.5">
                                                <span>Lease End</span>
                                            </div>
                                            <div className="flex items-center justify-start w-2/12 h-10 px-2.5">
                                                <span>Lease Status</span>
                                            </div>
                                        </div>

                                        {/* Search and Select All */}
                                        <div className="flex bg-white">
                                            <div className="flex items-center justify-center w-1/12 h-10 px-2.5 relative">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBuildings.length === filteredTemplates.length}
                                                    onChange={handleSelectAll}
                                                    className="form-checkbox h-4 w-4 text-c-teal checked:bg-c-teal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                />
                                            </div>
                                            <div className="flex items-center justify-start w-11/12 h-10 px-2.5">
                                                <div className="relative w-full">
                                                    <label htmlFor="table-search" className="sr-only">Search building...</label>
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <svg className="w-4 h-4 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="table-search"
                                                        placeholder="Search..."
                                                        value={buildingSearchTerm}
                                                        onChange={handleBuildingSearchChange}
                                                        className="w-full pl-10 py-1.5 h-full border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-c-teal focus:border-c-teal"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Table Body */}
                                        <div className="overflow-auto flex-grow text-sm">
                                            {filteredLease.map((lease, index) => (
                                                <div key={index} className={`flex ${index % 2 === 0 ? 'bg-gray-100' : ''} hover:bg-gray-200`}>
                                                    <div className="flex items-center justify-center w-1/12 h-10 px-2.5 relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBuildings.includes(lease.id)}
                                                            onChange={() => handleBuildingSelect(lease.id)}
                                                            className="form-checkbox h-4 w-4 ml-0.5 text-c-teal checked:bg-c-teal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-start w-3/12 h-10 px-2.5 text-neutral-600">
                                                        <span className='pl-1'>{lease.leaseTitle}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-3/12 h-10 px-2.5 text-neutral-600">
                                                        <span>{lease.accountName}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-2/12 h-10 px-2.5 text-neutral-600">
                                                        <span>{lease.leaseStart}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-2/12 h-10 px-2.5 text-neutral-600">
                                                        <span className='pl-1'>{lease.leaseEnd}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start w-2/12 h-10 px-2.5 text-neutral-600">
                                                        <span className='text-red-500 pl-2'>{lease.leaseStatus}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </body>





                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md p-6 px-3 py-3 mb-5 rounded rounded-md">
                    <div className='py-3 flex flex-row gap-4'>
                        <div className="min-w-[16rem] my-4 bg-white w-full md:w-3/5">
                            <h2 className="px-3 text-md text-neutral-700 font-semibold mb-4">List of existing spaces (tier 1) for the selected building:</h2>
                            <div className="relative overflow-hidden rounded-sm border border-gray-300 shadow-sm">
                                <div className="min-h-70 max-h-72 ">
                                    <table className="w-full">
                                        <thead className="text-white w-full">
                                            <tr className="flex w-full bg-c-teal">
                                                <th className="mx-1.5 py-3 px-2.5 w-1/8"></th>
                                                <th className="w-7/8">Building Name</th>
                                            </tr>
                                            <tr className="flex w-full bg-white">
                                                <th className="mx-2 py-0 px-2.5 w-1/8 relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBuildings.length === filteredBuildings.length}
                                                        onChange={() => handleSelectAll()}
                                                        className="form-checkbox h-3 w-3 text-c-teal checked:bg-c-teal border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                    />
                                                </th>

                                                <th className="w-full py-1 px-2 ">
                                                    <div className="relative h-full ">
                                                        <label htmlFor="table-search" className="sr-only">Search building...</label>
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <svg className="w-4 h-4 text-neutral-700 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="table-search"
                                                            placeholder="Search..."
                                                            value={buildingSearchTerm}
                                                            onChange={handleBuildingSearchChange}
                                                            className="w-full pl-10 py-1.5 h-full border border-neutral-300 rounded rounded-md text-sm text-neutral-700 font-thin focus:outline-none focus:ring-c-teal focus:border-c-teal hover:border-c-teal"
                                                        />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full" style={{ height: "200px" }}>
                                            {filteredBuildings.map((building, index) => (
                                                <tr key={building.id} className={`flex w-full hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                                    <td className="mx-2 w-1/8 relative">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBuildings.includes(building.id)}
                                                            onChange={() => handleBuildingSelect(building.id)}
                                                            className="form-checkbox h-3 w-3 text-c-teal checked:bg-c-teal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                        />
                                                    </td>
                                                    <td className="w-7/8 text-neutral-600">{building.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>



                                </div>
                            </div>

                        </div>


                        <div className="flex flex-col pt-4 items-center justify-center text-center min-w-[16rem] w-full md:w-2/5">

                            <div className='flex flex-row justify-between w-full px-2 py-2 my-3'>
                                <div className='w-full flex flex-row items-center'>
                                    <div
                                        className='flex flex-row items-center px-4 justify-between hover:bg-c-teal px-2 py-2 w-full border border-2 border-c-teal cursor-pointer rounded rounded-full text-neutral-700 hover:text-white font-semibold transform transition-transform hover:scale-105'
                                        onClick={handleDownload}
                                    >
                                        <span>Download selected template</span>
                                        <span><MdOutlineFileDownload fontSize={24} /></span>
                                    </div>
                                </div>
                            </div>

                            <label
                                htmlFor="file-upload"
                                className={`flex flex-col bg-neutral-100 rounded-lg border-4 border-dashed w-full py-9 group text-center ${dragging ? 'border-blue-500' : ''}`}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                    {/* <div className="items-center flex items-center max-h-48 mx-auto -mt-10">
                                    </div> */}
                                    <MdOutlineFileUpload fontSize={60} className="text-yellow-400" />

                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop files here or </span></p>
                                    <span
                                        className="w-32 mx-2 py-1.5 mb-1 mt-3 bg-white text-neutral-700 border border-md border-c-teal cursor-pointer hover:text-white hover:bg-c-teal focus:outline-none shadow-md rounded rounded-full transform transition-transform hover:scale-105"
                                    >
                                        Choose File
                                    </span>
                                </div>
                                <input id="file-upload" type="file" className="hidden" onChange={handleUpload} />
                            </label>

                        </div>
                    </div>

                </div>

                <div className="bg-neutral-100 shadow-lg py-3 px-3 rounded rounded-md">
                    <div className="relative mb-2 w-80 ">
                        <label htmlFor="table-search" className="sr-only">Search building...</label>
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            placeholder="Search..."
                            value={templateSearchTerm}
                            onChange={handleTemplateSearchChange}
                            className="w-full px-10 py-1.5 text-sm font-thin rounded-lg border border-neutral-300 focus:outline-none focus:border-c-teal hover:border-c-teal"
                        />
                    </div>

                    <div className="h-[28rem] overflow-auto shadow shadow-md">

                        <CustomTable columns={columns} filteredTemplates={filteredLease} handleSave={handleSave} />

                    </div>



                    <div className="flex justify-end">
                        <button
                            onClick={() => handleSubmit('/data-entry-portal/mass-upload/lease/submit/error')}
                            className="w-32 mx-2 py-2 mt-3 bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue focus:outline-none shadow-md rounded rounded-md"
                        >
                            Submit
                        </button>
                    </div>

                </div>

            </div>

        </div >
    );
}


