import React from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';

export default function WarningModal({ showModal, closeModal, leavePage }) {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm mx-auto text-center">
            <div className="flex flex-col items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mb-3">
                <MdOutlineErrorOutline className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Warning!</h2>
              <p className="text-sm text-gray-700">
                If you leave this page, all your progress will be lost. Do you want to proceed?
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg w-20"
              >
                Cancel
              </button>
              <button
                onClick={leavePage}
                className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg w-20"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
