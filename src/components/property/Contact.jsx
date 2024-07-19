import React, { useMemo } from 'react';
import { FaSearch, FaPlus, FaList, FaFilter, FaSyncAlt, FaCog } from 'react-icons/fa';
import DataTable from '../shared/CustomTableMUI';

const Contact = () => {
    const columns = useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Mailing Address', accessor: 'contactmailingaddress' },
            { Header: 'Account Name', accessor: 'accountname' },
            { Header: 'Business Phone', accessor: 'businessphone' },
            { Header: 'Mobile', accessor: 'mobile' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Status', accessor: 'status' },
        ],
        []
    );
    
    const data = useMemo(
        () => [
            { name: 'John Doe', contactmailingaddress: '123 Main St, Anytown, USA', accountname: 'ABC Company', businessphone: '(555) 123-4567', mobile: '(555) 987-6543', email: 'john.doe@example.com', status: 'Active' },
            { name: 'Jane Smith', contactmailingaddress: '456 Elm St, Another Town, USA', accountname: 'XYZ Corporation', businessphone: '(555) 222-3333', mobile: '(555) 999-8888', email: 'jane.smith@example.com', status: 'Inactive' },
        ],
        []
    );
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Contacts</h1>
                <button className="flex items-center space-x-2 p-2 bg-blue-600 text-white rounded">
                    <FaPlus />
                    <span>New</span>
                </button>
            </div>
            <div className="bg-gray-100 p-4 rounded">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Recently Viewed</h2>
                        <p className="text-gray-600">1 item • Updated a few seconds ago</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 bg-gray-200 rounded">
                            <FaSyncAlt />
                        </button>
                        <button className="p-2 bg-gray-200 rounded">
                            <FaCog />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                        <button className="p-2 bg-gray-200 rounded">Import</button>
                        <button className="p-2 bg-gray-200 rounded">Add to Campaign</button>
                        <button className="p-2 bg-gray-200 rounded">Send List Email</button>
                        <button className="p-2 bg-gray-200 rounded">Add to Cadence</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search this list..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded"
                            />
                            <FaSearch className="absolute left-2 top-2 text-gray-500" />
                        </div>
                        <button className="p-2 bg-gray-200 rounded">
                            <FaList />
                        </button>
                        <button className="p-2 bg-gray-200 rounded">
                            <FaFilter />
                        </button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Contact;
