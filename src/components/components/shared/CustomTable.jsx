import React, { useEffect, useState } from 'react';
import { IoCheckmark, IoTrashOutline } from 'react-icons/io5';
import { MdOutlineModeEdit } from 'react-icons/md';
import { CONTACTDATADUMMY } from '../../components/lib/const/DataEntryDummy';
import { useAppContext } from './../../../AppContext';

const CustomTable = ({ columns, filteredTemplates, handleSave }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const { setIsDirty } = useAppContext();
  const [accountNameOptions, setAccountNameOptions] = useState([]);


  // const accountNameOptions =  ['Account1', 'Account2', 'Account3']; 

  useEffect(() => {
    const uniqueAccountNames = [...new Set(CONTACTDATADUMMY.map(contact => contact.accountName))];
    setAccountNameOptions(uniqueAccountNames);
  }, []);

  const handleInputChange = (e, field, id) => {
    setEditValues({
      ...editValues,
      [id]: {
        ...editValues[id],
        [field]: e.target.value,
      },
    });
    setIsDirty(true);
  };

  const startEditing = (id) => {
    setEditingRowId(id);
    const building = filteredTemplates.find((b) => b.id === id);
    setEditValues({
      ...editValues,
      [id]: building,
    });
  };

  const saveChanges = (e, id) => {
    e.preventDefault();
    handleSave(editValues[id]);
    setEditingRowId(null);
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveChanges(e, id);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className="min-w-[600px] w-full border-collapse bg-white text-left text-sm text-gray-500" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-c-teal text-white sticky top-0">
          <tr>
            <th scope="col" className="px-4 py-4 w-2 font-medium">No.</th> {/* Adjusted column width */}
            {columns.map((col) => (
              <th key={col.accessor} scope="col" className={`px-2 py-4 ${col.width} font-medium`}>
                {col.Header}
              </th>
            ))}
            <th scope="col" className="px-2 py-4 w-10 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {filteredTemplates.map((building, index) => (
            <tr
              key={building.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : ''} ${editingRowId === building.id ? 'bg-blue-50' : 'hover:bg-gray-50 '}`}
              style={editingRowId === building.id ? { border: '1px solid lightblue' } : {}}
            >
              <td className="pl-6 py-4 w-2">{index + 1}</td> {/* Adjusted cell width */}
              {columns.map((col) => (
                <td key={col.accessor} className={`px-2 py-4 ${col.width} ${col.accessor === "errorMessage" ? "text-red-500" : ""}`}>
                  {editingRowId === building.id ? (
                    col.accessor === "accountName" ? (
                      <select
                        value={editValues[building.id]?.[col.accessor] || ''}
                        onChange={(e) => handleInputChange(e, col.accessor, building.id)}
                        className="border border-neutral-300 rounded focus:outline-none px-2 py-1 w-full focus:border-c-teal focus:ring-c-teal hover:border-c-teal"
                        style={{ width: '100%' }}
                      >
                        {accountNameOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={editValues[building.id]?.[col.accessor] || ''}
                        onChange={(e) => handleInputChange(e, col.accessor, building.id)}
                        className="border border-neutral-300 rounded focus:outline-none px-2 py-1 w-full focus:border-c-teal focus:ring-c-teal hover:border-c-teal"
                        style={{ width: '100%' }}
                        onKeyPress={(e) => handleKeyPress(e, building.id)}
                        readOnly={col.accessor === "errorMessage"}
                        disabled={col.accessor === "errorMessage"}
                      />
                    )
                  ) : (
                    <span className="w-full inline-block">{building[col.accessor]}</span>
                  )}
                </td>
              ))}
              <td className="px-2 py-4 w-10">
                <div className="flex justify-end gap-4">
                  {editingRowId === building.id ? (
                    <span onClick={(e) => saveChanges(e, building.id)} className="cursor-pointer">
                      <IoCheckmark fontSize={20} className="text-green-600" />
                    </span>
                  ) : (
                    <>
                      <span className="cursor-pointer">
                        <IoTrashOutline fontSize={18} color="red" />
                      </span>
                      <span onClick={() => startEditing(building.id)} className="cursor-pointer">
                        <MdOutlineModeEdit fontSize={20} className="text-yellow-500" />
                      </span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default CustomTable;
