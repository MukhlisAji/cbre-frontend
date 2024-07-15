import React, { useState, useEffect } from 'react';

export default function SearchModal({ showModal, cancelModal, closeModal, account }) {
  const [editableAccount, setEditableAccount] = useState(account);

  useEffect(() => {
    setEditableAccount(account);
  }, [account]);

  if (!editableAccount) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableAccount({
      ...editableAccount,
      [name]: value,
    });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditableAccount({
      ...editableAccount,
      details: {
        ...editableAccount.details,
        [name]: value,
      },
    });
  };

  const handleSave = () => {
    // Add your save logic here
    closeModal();
  };

  return (
    <>
      {/* Modal with transition and conditional rendering */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 transform transition-transform duration-200 ease-in-out scale-100">
          <h2 className="text-2xl mb-4">Edit Account</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Account</label>
            <input
              type="text"
              name="account"
              value={editableAccount.account}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={editableAccount.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Client Type</label>
            <input
              type="text"
              name="clientType"
              value={editableAccount.details.clientType || ''}
              onChange={handleDetailsChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Industry</label>
            <input
              type="text"
              name="industry"
              value={editableAccount.details.industry || ''}
              onChange={handleDetailsChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={editableAccount.details.phone || ''}
              onChange={handleDetailsChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button onClick={cancelModal} className="bg-gray-500 text-white px-4 py-2 rounded m-2 hover:bg-gray-400">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-white font-md rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue m-2">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
