import React, { useEffect, useState } from 'react';
import DataTable from '../../shared/CustomTableMUI';
import { MdAccountBox } from 'react-icons/md';
import { generateTransactionId } from '../../lib/api/Authorization';
import { ACCOUNTCOLUMN } from '../../lib/const/AppContant';
import AccountForm from './AccountForm';
import { CONFIG } from '../../../config';
import AccountList from './AccountList';

const Account = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultSet, setResultSet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    // Fetch data based on the current page
    const fetchData = async (page) => {
        setFetching(true);
        const transactionId = generateTransactionId();
        try {
            const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}?page=${page}`, {
                method: 'GET',
                headers: {
                    'transactionId': transactionId
                }
            });
            const data = await response.json();
            console.log("Fetched data: ", data.resultSet);

            setResultSet((prevData) => [...prevData, ...data.resultSet]); // Append new data
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setFetching(false);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchData(currentPage);
    }, []);

    // Function to fetch the next page
    const fetchNextPage = async () => {
        if (!fetching) {
            setCurrentPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchData(nextPage);
                return nextPage;
            });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleNewAccount = () => {
        setIsEditing(false);
        setCurrentAccount(null);
        setIsModalOpen(true);
    };

    const handleEditAccount = (account) => {
        setIsModalOpen(true);
        console.log('Editing account:', account.id);
        setIsEditing(true);
        setAccountId(account.id);
        setCurrentAccount(account);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentAccount(null);
    };

    return (
        <div className=" flex flex-col flex-grow mb-4">
            <div className="bg-neutral-100 rounded flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <div className='flex items-center space-x-2 p-4'>
                        <div className=''>
                            <div className='flex items-center space-x-2 mb-4'>
                                <div className="p-1 rounded-full border-2 border-purple-500 bg-purple-600">
                                    <MdAccountBox className="text-white text-xl font-bold" />
                                </div>
                                <div>
                                    <h2 className="flex items-center cursor-pointer text-2xl text-neutral-600">Accounts</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DataTable with infinite scroll */}
                <AccountList
                    column={ACCOUNTCOLUMN}
                    dataTable={resultSet}
                    openModal={handleNewAccount}
                    isHeader={true}
                    tableHeight={300}
                    loading={loading}
                    onEdit={handleEditAccount}
                    dataType={"contact"}
                    fetchNextPage={fetchNextPage} // Pass the fetchNextPage function to the DataTable
                />

                {isModalOpen && (
                    <AccountForm
                        onClose={closeModal}
                        isEditing={isEditing}
                        initialData={currentAccount}
                        accountId={accountId}
                    />
                )}
            </div>
        </div>
    );
};

export default Account;
