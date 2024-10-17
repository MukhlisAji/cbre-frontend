import React from 'react';

const ProjectList = () => {
    return (
        <div className="bg-white rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="pl-1 text-neutral-700 text-base text-sm font-bold flex-grow">Project List</h2>
                <button className="bg-c-teal hover:bg-c-light-grayish text-neutral-200 text-xs text-black rounded px-3 py-1 shadow-md">
                    + Create New Project
                </button>
            </div>
            <div className="flex space-x-4">
                {/* Project A */}
                <div className="rounded-md flex-grow w-1/3 ">
                    <h3 className="text-center mb-1 text-sm text-neutral-600">Project A</h3>
                    <div className="grid grid-cols-2 gap-1 p-1 border bg-gray-200 rounded-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95">
                        <img
                            src="https://images.pexels.com/photos/4594533/pexels-photo-4594533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 1"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/14338570/pexels-photo-14338570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 2"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/1685109/pexels-photo-1685109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 3"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/14447085/pexels-photo-14447085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 4"
                            className="rounded-md w-full h-16 object-cover"
                        />
                    </div>
                </div>

                {/* Project B */}
                <div className="rounded-md flex-grow w-1/3 ">
                    <h3 className="text-center mb-1 text-sm text-neutral-600">Project A</h3>
                    <div className="grid grid-cols-2 gap-1 p-1 border bg-gray-200 rounded-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95">
                        <img
                            src="https://images.pexels.com/photos/1320815/pexels-photo-1320815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 1"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/1398761/pexels-photo-1398761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 2"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/13177501/pexels-photo-13177501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 3"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/15480522/pexels-photo-15480522/free-photo-of-the-alkaff-mansion-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 4"
                            className="rounded-md w-full h-16 object-cover"
                        />
                    </div>
                </div>

                {/* Project C */}
                <div className="rounded-md flex-grow w-1/3 ">
                    <h3 className="text-center mb-1 text-sm text-neutral-600">Project A</h3>
                    <div className="grid grid-cols-2 gap-1 p-1 border bg-gray-200 rounded-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95">
                        <img
                            src="https://images.pexels.com/photos/13162216/pexels-photo-13162216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 1"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/7771477/pexels-photo-7771477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 2"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/20779790/pexels-photo-20779790/free-photo-of-high-street-center-and-elgin-bridge-in-singapore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 3"
                            className="rounded-md w-full h-16 object-cover"
                        />
                        <img
                            src="https://images.pexels.com/photos/13177503/pexels-photo-13177503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Project C Image 4"
                            className="rounded-md w-full h-16 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
