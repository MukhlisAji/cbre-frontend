import React, { useEffect, useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { generateTransactionId } from '../lib/api/Authorization';

export default function AccountNew({ onClose, isEditing, initialData }) {
    const [accountId, setAccountId] = useState(isEditing ? initialData.id : '');
    const [accountName, setAccountName] = useState(isEditing ? initialData.accountName : '');
    const [website, setWebsite] = useState(isEditing ? initialData.website : '');
    const [type, setType] = useState(isEditing ? initialData.type : '');
    const [description, setDescription] = useState(isEditing ? initialData.description : '');
    const [parentAccount, setParentAccount] = useState(isEditing ? initialData.parentAccount.name : '');
    const [phone, setPhone] = useState(isEditing ? initialData.phone : '');
    const [billingStreet, setBillingStreet] = useState(isEditing ? initialData.billingStreet : '');
    const [billingCity, setBillingCity] = useState(isEditing ? initialData.billingCity : '');
    const [billingState, setBillingState] = useState(isEditing ? initialData.billingState : '');
    const [billingPostalCode, setBillingPostalCode] = useState(isEditing ? initialData.billingPostalCode : '');
    const [billingCountry, setBillingCountry] = useState(isEditing ? initialData.billingCountry : '');
    const [shippingStreet, setShippingStreet] = useState(isEditing ? initialData.shippingStreet : '');
    const [shippingCity, setShippingCity] = useState(isEditing ? initialData.shippingCity : '');
    const [shippingState, setShippingState] = useState(isEditing ? initialData.shippingState : '');
    const [shippingPostalCode, setShippingPostalCode] = useState(isEditing ? initialData.shippingPostalCode : '');
    const [shippingCountry, setShippingCountry] = useState(isEditing ? initialData.shippingCountry : '');
    const [localAccountName, setLocalAccountName] = useState(isEditing ? initialData.localAccountName : '');
    const [fax, setFax] = useState(isEditing ? initialData.fax : '');
    const [commercialNumber, setCommercialNumber] = useState(isEditing ? initialData.commercialNumber : '');
    const [industryType, setIndustryType] = useState(isEditing ? initialData.industryType : '');
    const [subIndustry, setSubIndustry] = useState(isEditing ? initialData.subIndustry : '');
    const [headquarterCountry, setHeadquarterCountry] = useState(isEditing ? initialData.headquarterCountry : '');
    const [taxType, setTaxType] = useState(isEditing ? initialData.taxType : '');
    const [taxId, setTaxId] = useState(isEditing ? initialData.taxId : '');
    const [accountStatus, setAccountStatus] = useState(isEditing ? initialData.accountStatus : '');
    const [inactivation, setInactivation] = useState(isEditing ? initialData.inactivation : '');
    const [inactivationReason, setInactivationReason] = useState(isEditing ? initialData.inactivationReason : '');
    const [saveToSFDC, setSaveToSFDC] = useState(isEditing ? initialData.saveToSFDC : '');

    const { token } = useAppContext();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const [isSavingNew, setIsSavingNew] = useState(false);
    const [accessToken] = useState('');
    const navigate = useNavigate();
    const [accountInformationVisible, setAccountInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [additionalInformationVisible, setAdditionalInformationVisible] = useState(true);
    const [segmentInformationVisible, setSegmentInformationVisible] = useState(true);
    const [systemInformationVisible, setSysteminformationVisible] = useState(true);
    const [associateInformationVisible, setAssociateInformationVisible] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState('success');

    useEffect(() => {
        toggleBodyOverflow(true);
        return () => {
            toggleBodyOverflow(false);
        };
    }, []);

    const toggleVisibility = (section) => {
        switch (section) {
            case 'accountInformation':
                setAccountInformationVisible(!accountInformationVisible);
                break;
            case 'addressInformation':
                setAddressInformationVisible(!addressInformationVisible);
                break;
            case 'segmentInformation':
                setSegmentInformationVisible(!segmentInformationVisible);
                break;
            case 'additionalInformation':
                setAdditionalInformationVisible(!additionalInformationVisible);
                break;
            case 'systemInformation':
                setSysteminformationVisible(!systemInformationVisible);
                break;
            case 'associateInformation':
                setAssociateInformationVisible(!associateInformationVisible);
                break;
            default:
                console.log(`Section '${section}' not handled`);
                break;
        }
    };

    const [formData, setFormData] = useState({
        accountDetails: {
            accountId: accountId,
            accountName: accountName,
            parentAccount: parentAccount,
            localAccountName: localAccountName,
            clientType: [
                { clientTypeId: 9, clientTypeName: 'Developer' },
                { clientTypeId: 5, clientTypeName: 'Corporate' },
            ],
            phone: phone,
            fax: fax,
            website: website,
        },
        addressInformation: {
            billingCountryCode: 'ID',
            billingCountry: billingCountry,
            billingState: billingState,
            billingCity: billingCity,
            billingStreet: billingStreet,
            billingPostCode: billingPostalCode,
            shippingCountryCode: 'ID',
            shippingCountry: shippingCountry,
            shippingState: shippingState,
            shippingCity: shippingCity,
            shippingStreet: shippingStreet,
            shippingPostCode: shippingPostalCode,
        },
        segmentation: {
            industrialType: industryType,
            subIndustrialId: 10,
            subIndustrial: subIndustry,
            headquarterCountryId: 4333,
            headquarterCountry: headquarterCountry,
            commercialNumber: commercialNumber,
        },
        additionalInformation: {
            taxType: taxType,
            taxId: taxId,
            description: description,
        },
        systemInformation: {
            accountOwner: [82809, 82807],
            status: accountStatus,
            inactivationDate: inactivation,
            reasonForInactivating: inactivationReason,
            saveToSFDC: saveToSFDC,
            userId: '',
        },
    });

    const handleSave = async (event) => {
        if (!isEditing) {
            setConfirmationDialogVisible(true);
        } else {
            setIsLoading(true);
            setConfirmationDialogVisible(false);
            console.log('inserting data');
            try {
                const result = await handleEdit(event);

                if (result.statusCode === "00" && result.resultSet && result.resultSet.accountId) {
                    const accountId = result.resultSet.accountId;
                    resetData();

                    // if (isSaveNew) {
                    // showNotification("Account created successfully!", 'success');
                    // } else {
                    navigate(`details/${accountId}`);
                    // }
                } else {
                    console.error('Unexpected response format:', result);
                    showNotification("Failed to update account. Please try again.", 'error');
                }
            } catch (error) {
                console.error('Error during submission:', error);
                showNotification("Failed to update account. Please try again.", 'error');
            } finally {
                setIsLoading(false);
            }

        };
    };
    const handleSaveNew = async (event) => {
        setIsLoading(true);
        setConfirmationDialogVisible(false);
        console.log('inserting data');

        if (isEditing) {
            try {
                console.log("formData : ", formData); 
                const result = await handleEdit(event);
    
                if (result.statusCode === "00") {
                    resetData();
    
                    // if (isSaveNew) {
                    showNotification("Account update successfully!", 'success');
                    // } else {
                    //     navigate(`/property/accounts/details/${accountId}`);
                    // }
                } else {
                    console.error('Unexpected response format:', result);
                    showNotification("Failed to update account. Please try again.", 'error');
                }
            } catch (error) {
                console.error('Error during submission:', error);
                showNotification("Failed to update account. Please try again.", 'error');
            } finally {
                setIsLoading(false);
            }
        }else{
            try {
                const result = await handleSubmit(event);
    
                if (result.statusCode === "00" && result.resultSet && result.resultSet.accountId) {
                    const accountId = result.resultSet.accountId;
                    resetData();
    
                    // if (isSaveNew) {
                    showNotification("Account created successfully!", 'success');
                    // } else {
                    //     navigate(`/property/accounts/details/${accountId}`);
                    // }
                } else {
                    console.error('Unexpected response format:', result);
                    showNotification("Failed to create account. Please try again.", 'error');
                }
            } catch (error) {
                console.error('Error during submission:', error);
                showNotification("Failed to create account. Please try again.", 'error');
            } finally {
                setIsLoading(false);
            }
        }

    };

    const handleConfirmSave = async (event) => {
        setIsLoading(true);
        setConfirmationDialogVisible(false);
        console.log('inserting data');
        try {
            const result = await handleSubmit(event);

            if (result.statusCode === "00" && result.resultSet && result.resultSet.accountId) {
                const accountId = result.resultSet.accountId;
                resetData();

                // if (isSaveNew) {
                // showNotification("Account created successfully!", 'success');
                // } else {
                navigate('/property/contacts', { state: { openModal: true } });
                // }
            } else {
                console.error('Unexpected response format:', result);
                showNotification("Failed to create account. Please try again.", 'error');
            }
        } catch (error) {
            console.error('Error during submission:', error);
            showNotification("Failed to create account. Please try again.", 'error');
        } finally {
            setIsLoading(false);
        }

    }



    const handleCancelSave = () => {
        setConfirmationDialogVisible(false);
    };

    const handleSubmit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/cbre/account/', {
                method: 'POST',
                headers: {
                    'SFDC-token': token,
                    'transactionId': transactionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/cbre/account/', {
                method: 'PUT',
                headers: {
                    'SFDC-token': token,
                    'transactionId': transactionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const showNotification = (message, type = 'success') => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotification(null);
            setNotificationType('success');
        }, 5000);
    };



    const resetData = () => {
        setAccountName('');
        setPhone('');
        setBillingCity('');
        setBillingCountry('');
        setBillingPostalCode('');
        setBillingState('');
        setBillingStreet('');
        setDescription('');
        setParentAccount('');
        setPhone('');
        setShippingCity('');
        setShippingCountry('');
        setShippingState('');
        setShippingPostalCode('');
        setShippingStreet('');
        setType('');
        setWebsite('');
    };

    const copyBillingToShipping = () => {
        setShippingCountry(billingCountry);
        setShippingPostalCode(billingPostalCode);
        setShippingCity(billingCity);
        setShippingState(billingState);
        setShippingStreet(billingStreet);
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}>

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 h-3/4 bg-white shadow-lg rounded-lg">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                    </div>
                )}
                {notification && (
                    <div className={`absolute top-5 right-5 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out 
                        ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    text-white
                `}>
                        {notification}
                    </div>
                )}
                <header className="sticky top-0 shadow-sm py-3 bg-neutral-100 z-10 flex items-center justify-center rounded-t-lg border-b border-neutral-700">
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-bold text-c-dark-grayish text-align-center">NEW ACCOUNT</h2>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="bg-white relative p-4">
                        {/* Account Information */}

                        <div className="absolute right-2 text-xs text-neutral-500 font-normal text-c-dark-grayish ">
                            <span className="text-red-600">*</span> = Required Information
                        </div>

                        <div className="my-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('accountInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{accountInformationVisible ? '▼' : '►'}</span> Account Information
                                </h2>
                                <span>{accountInformationVisible ? '-' : '+'}</span>
                            </div>
                            {accountInformationVisible && (
                                <div className="bg-white p-2">
                                    {/* Content of Property Search Result Section */}
                                    <div className="ml-3 mb-6">
                                        {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Local Account Name</label>
                                                <input value={localAccountName}
                                                    onChange={(e) => setLocalAccountName(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Client Type</label>
                                                <select
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                >
                                                    <option value="">--None--</option>
                                                    <option value="type1">Type 1</option>
                                                    <option value="type2">Type 2</option>
                                                </select>
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
                                                <label className="block text-sm font-medium text-gray-700">Fax</label>
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


                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Address Information */}

                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-md font-semibold text-neutral-700 mb-2 cursor-pointer" onClick={() => toggleVisibility('addressInformation')}>
                                    <span>{addressInformationVisible ? '▼' : '►'}</span> Address Information
                                </h2>
                                <div className='items-center space-x-4'>
                                    <span className='text-xs cursor-pointer text-blue-600 underline' onClick={copyBillingToShipping}
                                    >Copy Billing Address To Shipping Address</span>
                                    <span className='cursor-pointer' onClick={() => toggleVisibility('addressInformation')}>{addressInformationVisible ? '-' : '+'}</span>
                                </div>

                            </div>
                            {addressInformationVisible && (
                                <div className="bg-white p-2">
                                    <div className="ml-3 mb-6">
                                        {/* <h3 className="text-xl font-semibold mb-4">Address Information</h3> */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Billing Country</label>
                                                <select
                                                    value={billingCountry}
                                                    onChange={(e) => setBillingCountry(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm">
                                                    <option>Singapore</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Shipping Country</label>
                                                <select
                                                    value={shippingCountry}
                                                    onChange={(e) => setShippingCountry(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm">
                                                    <option>Singapore</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Billing State/Province</label>
                                                <select
                                                    value={billingState}
                                                    onChange={(e) => setBillingState(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm">
                                                    <option>Singapore</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Shipping State/Province</label>
                                                <select
                                                    value={shippingState}
                                                    onChange={(e) => setShippingState(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm">
                                                    <option>Singapore</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Billing City</label>
                                                <input
                                                    value={billingCity}
                                                    onChange={(e) => setBillingCity(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" defaultValue="Singapore"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Shipping City</label>
                                                <input
                                                    value={shippingCity}
                                                    onChange={(e) => setShippingCity(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" defaultValue="Singapore"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Billing Street</label>
                                                <input value={billingStreet}
                                                    onChange={(e) => setBillingStreet(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Shipping Street</label>
                                                <input
                                                    value={shippingStreet}
                                                    onChange={(e) => setShippingStreet(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Billing Zip/Postal Code</label>
                                                <input
                                                    value={billingPostalCode}
                                                    onChange={(e) => setBillingPostalCode(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Shipping Zip/Postal Code</label>
                                                <input
                                                    value={shippingPostalCode}
                                                    onChange={(e) => setShippingPostalCode(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Segmentation */}

                        <div className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('segmentInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{segmentInformationVisible ? '▼' : '►'}</span> Segmentation
                                </h2>
                                <span>{segmentInformationVisible ? '-' : '+'}</span>
                            </div>
                            {segmentInformationVisible && (
                                <div className="bg-white p-2">
                                    <div className="ml-3 mb-6">
                                        {/* <h3 className="text-xl font-semibold mb-4">Additional Information</h3> */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            {/* <div className="flex items-center ">
                                                <input type="checkbox" className="mr-2" />
                                                <label className="block text-md font-medium text-gray-700">Headquarters</label>
                                            </div>
                                            <div></div> */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Industry Type</label>
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                    value={industryType}
                                                    onChange={(e) => setIndustryType(e.target.value)}
                                                >
                                                    <option value="">--None--</option>
                                                    <option>Accommodation</option>
                                                    <option>Select 3</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Sub Industry</label>
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                    value={subIndustry}
                                                    onChange={(e) => setSubIndustry(e.target.value)}
                                                >
                                                    <option value="">--None--</option>
                                                    <option>Select 2</option>
                                                    <option>Select 3</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Headquarter Country</label>
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                    value={headquarterCountry}
                                                    onChange={(e) => setHeadquarterCountry(e.target.value)}
                                                >
                                                    <option value="">--None--</option>
                                                    <option>Select 2</option>
                                                    <option>Select 3</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Commercial Number</label>
                                                <input
                                                    value={commercialNumber}
                                                    onChange={(e) => setCommercialNumber(e.target.value)}
                                                    type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Information */}

                        <div className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('additionalInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{additionalInformationVisible ? '▼' : '►'}</span> Additional Information
                                </h2>
                                <span>{additionalInformationVisible ? '-' : '+'}</span>
                            </div>
                            {additionalInformationVisible && (
                                <div className="bg-white p-2">
                                    <div className="ml-3 mb-6">
                                        {/* <h3 className="text-xl font-semibold mb-4">Additional Information</h3> */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Tax Type</label>
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm"
                                                    value={taxType}
                                                    onChange={(e) => setTaxType(e.target.value)}
                                                >
                                                    <option value="">--None--</option>
                                                    <option>Select 2</option>
                                                    <option>Select 3</option>

                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                                                <input value={taxId}
                                                    onChange={(e) => setTaxId(e.target.value)} type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* System Information */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('systemInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{systemInformationVisible ? '▼' : '►'}</span> System Information
                                </h2>
                                <span>{systemInformationVisible ? '-' : '+'}</span>
                            </div>
                            {systemInformationVisible && (
                                <div className="bg-white p-2">
                                    <div className="ml-3 mb-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Account Owner</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Created By</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Created Date</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Modified By</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Modified Date</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <input value={accountStatus}
                                                    onChange={(e) => setAccountStatus(e.target.value)} type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Inactivation Date</label>
                                                <input value={inactivation}
                                                    onChange={(e) => setInactivation(e.target.value)} type="date" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Reason for Inactivating</label>
                                                <input value={inactivationReason}
                                                    onChange={(e) => setInactivationReason(e.target.value)} type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Salesforce ID</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div className="flex items-center ">
                                                <input value={saveToSFDC}
                                                    onChange={(e) => setSaveToSFDC(e.target.value)} type="checkbox" className="mr-2" />
                                                <label className="block text-sm font-medium text-gray-700">Save to SFDC</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Associate Information */}

                        <div className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('associateInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{associateInformationVisible ? '▼' : '►'}</span> Associate Information
                                </h2>
                                <span>{associateInformationVisible ? '-' : '+'}</span>
                            </div>
                            {associateInformationVisible && (
                                <div className="bg-white p-2">
                                    <div className="ml-3 mb-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Account Source</label>
                                                <input type="text" value={"OneApp"} className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Account ID</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Parent Account Source</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Parent Account ID</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Top Parent Account Source</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Top Parent Account ID</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </main>

                <footer className="sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-center border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveNew}
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Save & New
                    </button>
                    <button
                        onClick={() => { setIsSavingNew(false); handleSave(); }}
                        className="px-4 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                    >
                        Save
                    </button>
                </footer>

                {/* Confirmation Dialog */}
                {confirmationDialogVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 max-w-md">
                            <div className="flex flex-col items-center">
                                <BsQuestionCircle className="text-yellow-500 text-4xl mb-4" />
                                <h3 className="text-lg font-bold text-center">Confirm Save</h3>
                                <p className="mt-2 text-center">Do you want to proceed to create new contact with this set of Account data?
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={handleCancelSave}
                                        className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={handleConfirmSave}
                                        className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}


            </div>
        </div>
    );
}

const toggleBodyOverflow = (isModalOpen) => {
    if (isModalOpen) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
};
