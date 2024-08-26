import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyNew({ onClose }) {
    const [accountName, setAccountName] = useState('');
    const [website, setWebsite] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [parentAccount, setParentAccount] = useState('');
    const [phone, setPhone] = useState('');
    const [billingStreet, setBillingStreet] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingState, setBillingState] = useState('');
    const [billingPostalCode, setBillingPostalCode] = useState('');
    const [billingCountry, setBillingCountry] = useState('');
    const [shippingStreet, setShippingStreet] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingState, setShippingState] = useState('');
    const [shippingPostalCode, setShippingPostalCode] = useState('');
    const [shippingCountry, setShippingCountry] = useState('');
    const [setShowSuccessModal] = useState(false);
    const [accountInformationVisible, setAccountInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [additionalInformationVisible, setAdditionalInformationVisible] = useState(true);
    const [accessToken] = useState('');
    const navigate = useNavigate();

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
            case 'additionalInformation':
                setAdditionalInformationVisible(!additionalInformationVisible);
                break;
            default:
                console.log(`Section '${section}' not handled`);
                break;
        }
    };

    const handleSaveNew = () => {
        resetData();
        navigate('/property/contacts/details');

    };


    const handleSubmit = async () => {
        const url = 'https://java-flow-2230.my.salesforce.com/services/data/v61.0/sobjects/Account';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const formData = {
            "Name": accountName,
            "Phone": phone,
            "Website": website,
            "Type": type,
            "Description": description,
            "ParentId": parentAccount,
            "BillingStreet": billingStreet,
            "BillingCity": billingCity,
            "BillingState": billingState,
            "BillingPostalCode": billingPostalCode,
            "BillingCountry": billingCountry,
            "ShippingStreet": shippingStreet,
            "ShippingCity": shippingCity,
            "ShippingState": shippingState,
            "ShippingPostalCode": shippingPostalCode,
            "ShippingCountry": shippingCountry,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            const responseData = await response.json();
            console.log('Response from Salesforce:', responseData);

            if (responseData.success) {
                setShowSuccessModal(true);
                resetData();
            }
        } catch (error) {
            console.error('Error occurred while contacting Salesforce:', error.message);
        }
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

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 h-3/4 bg-white shadow-lg rounded-lg">
                <header className="sticky top-0 shadow-sm py-3 bg-neutral-100 z-10 flex items-center justify-center rounded-t-lg border-b border-neutral-700">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-bold text-c-dark-grayish text-align-center">NEW CONTACT</h2>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {/* Body content */}
                    <div className="bg-white relative p-4">
                        {/* Account Information */}

                        <div className="absolute right-2 text-xs text-neutral-500 font-normal text-c-dark-grayish ">
                            <span className="text-red-500">*</span> = Required Information
                        </div>

                        <div className="my-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('accountInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{accountInformationVisible ? '▼' : '►'}</span> Contact Information
                                </h2>
                                <span>{accountInformationVisible ? '-' : '+'}</span>
                            </div>
                            {accountInformationVisible && (
                                <div className="bg-white p-2">
                                    {/* Content of Property Search Result Section */}
                                    <div className="ml-3 mb-6">
                                        {/* <h3 className="text-xl font-semibold mb-4">Account Information</h3> */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                            <div >
                                                <label className="block text-sm font-medium text-gray-700">Top Parent Account</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" readOnly disabled />
                                            </div>
                                            <div>

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
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Company Type</label>
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal">
                                                    <option value="">--None--</option>
                                                    <option>Select 2</option>
                                                    <option>Select 3</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center ">
                                                <input type="checkbox" className="mr-2" />
                                                <label className="block text-md font-medium text-gray-700">Headquarters</label>
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
                                                <label className="block text-sm font-medium text-gray-700">Website</label>
                                                <input
                                                    type="text"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                    className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
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

                        {/* Address Information */}

                        <div className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleVisibility('addressInformation')}>
                                <h2 className="text-lg font-semibold text-neutral-700 mb-2">
                                    <span>{addressInformationVisible ? '▼' : '►'}</span> Address Information
                                </h2>
                                <span>{addressInformationVisible ? '-' : '+'}</span>
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
                                                <select className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm">
                                                    <option value="">--None--</option>
                                                    <option>Select 2</option>
                                                    <option>Select 3</option>

                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Employees</label>
                                                <input type="number" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Annual Revenue</label>
                                                <input type="number" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Ticker Symbol</label>
                                                <input type="text" className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm" />
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
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Save & New
                    </button>
                    <button
                        onClick={handleSaveNew}
                        className="px-4 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                    >
                        Save
                    </button>
                </footer>
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