import React, { useEffect, useState } from 'react';
import { DATASEACRH } from '../lib/const/DataEntryDummy'
import SearchModal from './SearchModal';
import { ToastContainer, toast } from 'react-toastify';

export default function AccAndConSearch() {
  const [accountName, setAccountName] = useState('');
  const [website, setWebsite] = useState('');
  const [parentAccount, setParentAccount] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('contacts');
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAccount(null);
    setShowModal(false);
    toast.success('Record saved successfully!');

  };

  const cancelModal = () => {
    setSelectedAccount(null);
    setShowModal(false);

  };

  // const [formData, setFormData] = useState({
  //   contactName: '',
  //   propertyName: '',
  //   account: '',
  //   parentAccount: '',
  //   showAllCountriesAccounts: false,
  //   clientType: 'all',
  //   country: 'China',
  //   stateProvince: '',
  //   city: '',
  //   street: '',
  //   phone: '',
  //   industryType: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   });
  // };

  const renderFields = () => {
    switch (type) {
      case 'contacts':
        return (
          <>
            <div className="bg-white p-2">
              {/* Content of Property Search Result Section */}
              <div className="ml-3 mb-6">
                {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Account</label>
                    <input value={parentAccount}
                      onChange={(e) => setParentAccount(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div className="flex items-center ">
                    <input type="checkbox" className="mr-2" />
                    <label className="block text-sm font-medium text-gray-700">Show All Countries Accounts</label>
                  </div>
                  <div className="flex items-center ">
                    <input type="checkbox" className="mr-2" />
                    <label className="block text-sm font-medium text-gray-700">Show All Countries Accounts</label>
                  </div>
                  <div className='md:row-span-3'>
                    <label className="block text-sm font-medium text-gray-700">Client Type</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">All Countries</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Type Tier 1</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    >
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>                                </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Type Tier 2</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    >
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>                                </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'accounts':
        return (
          <>
            <div className="bg-white p-2">
              {/* Content of Property Search Result Section */}
              <div className="ml-3 mb-6">
                {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Account</label>
                    <input value={parentAccount}
                      onChange={(e) => setParentAccount(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div className="flex items-center ">
                    <input type="checkbox" className="mr-2" />
                    <label className="block text-sm font-medium text-gray-700">Show All Countries Accounts</label>
                  </div>
                  <div className="flex items-center ">
                    <input type="checkbox" className="mr-2" />
                    <label className="block text-sm font-medium text-gray-700">Show All Countries Accounts</label>
                  </div>
                  <div className='md:row-span-2'>
                    <label className="block text-sm font-medium text-gray-700">Client Type</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">All Countries</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street</label>
                    <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Type Tier 1</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    >
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>                                </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Type Tier 2</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    >
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>                                </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'activity':
        return (
          <>
            <div className="bg-white p-2">
              {/* Content of Property Search Result Section */}
              <div className="ml-3 mb-6">
                {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Account</label>
                    <input value={parentAccount}
                      onChange={(e) => setParentAccount(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Type</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'event':
        return (
          <>
            <div className="bg-white p-2">
              {/* Content of Property Search Result Section */}
              <div className="ml-3 mb-6">
                {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                      <option value="">--None--</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account</label>
                    <input type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Account</label>
                    <input value={parentAccount}
                      onChange={(e) => setParentAccount(e.target.value)}
                      className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const newHeight = screenHeight - 100;
      setSectionHeight(newHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />

      <div style={{ height: `${sectionHeight}px` }} className="flex-1 overflow-y-auto flex flex-col px-5 py-5 h-screen p-4 bg-white border-t border-neutral-200 border-sm">
        <div className="bg-white shadow-md p-6 px-8 py-5 mb-5">

          <div className="mb-4">
            <div className="flex space-x-4">
              <div>
                <input
                  type="radio"
                  id="contacts"
                  name="type"
                  value="contacts"
                  checked={type === 'contacts'}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="contacts" className="text-sm font-medium text-gray-700">Contacts</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="accounts"
                  name="type"
                  value="accounts"
                  checked={type === 'accounts'}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="accounts" className="text-sm font-medium text-gray-700">Accounts</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="activity"
                  name="type"
                  value="activity"
                  checked={type === 'activity'}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="activity" className="text-sm font-medium text-gray-700">activity</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="event"
                  name="type"
                  value="event"
                  checked={type === 'event'}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="event" className="text-sm font-medium text-gray-700">event</label>
              </div>
            </div>
          </div>
          {renderFields()}
          <div className="ml-3">
            <button className={`px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2`}>Export To Excel</button>
            <button className={`px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2`}>New Account</button>
            <button className={`px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2`}>New Contact</button>
            <button className={`px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2`}>Save Search</button>
            <button
              className={`px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2`}
              onClick={() => setShowResults(!showResults)}>Search</button>
          </div>
        </div>

        {showResults && (
          <>
            <div className="max-w-auto mx-auto bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">Account Search Results</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Account</th>
                    <th className="px-4 py-2 text-left">Address</th>
                    <th className="px-4 py-2 text-left">Details</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {DATASEACRH.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{item.account}</td>
                      <td className="px-4 py-2">
                        <strong>Address:</strong> {item.address}
                      </td>
                      <td className="px-4 py-2">
                        {item.details.clientType && <p><strong>Client Type:</strong> {item.details.clientType}</p>}
                        {item.details.industry && <p><strong>Industry:</strong> {item.details.industry}</p>}
                        {item.details.phone && <p><strong>Phone:</strong> {item.details.phone}</p>}
                      </td>
                      <td className="px-4 py-2">
                        <button className="px-4 py-1.5 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2" onClick={() => handleEdit(item)} >Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <SearchModal showModal={showModal} cancelModal={cancelModal} closeModal={closeModal} account={selectedAccount} />

      </div>
    </div>
  );
}
