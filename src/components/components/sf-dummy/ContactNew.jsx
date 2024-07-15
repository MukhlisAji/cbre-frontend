import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactNew() {
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [accountInformationVisible, setAccountInformationVisible] = useState(true);
    const [addressInformationVisible, setAddressInformationVisible] = useState(true);
    const [additionalInformationVisible, setAdditionalInformationVisible] = useState(true);
    const [accessToken, setAccessToken] = useState('');
    const [error, setError] = useState(null);
    const loginInitiated = useRef(false);

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
                // Handle default case here (if needed)
                console.log(`Section '${section}' not handled`);
                break;
        }
    };
    

    const handleLogin = () => {
        const width = 600;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        const popup = window.open(
            'http://localhost:8086/authorize',
            'OAuth Login',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        const messageListener = (event) => {
            if (event.origin !== 'http://localhost:8086') {
                return;
            }

            const { data } = event;
            try {
                const response = JSON.parse(data);
                if (response.access_token) {
                    setAccessToken(response.access_token);
                    toast.success('Access token obtained successfully!');
                } else {
                    setError('Authorization failed or no access token received.');
                    toast.error('Authorization failed or no access token received.');
                }
            } catch (err) {
                setError('Invalid response received.');
                toast.error('Invalid response received.');
                console.error(error);
            }
            if (popup) {
                popup.close();
            }
            window.removeEventListener('message', messageListener);
        };

        window.addEventListener('message', messageListener);
    };

    useEffect(() => {
        if (!loginInitiated.current) {
            handleLogin();
            loginInitiated.current = true; // Mark that login has been initiated
        }
    }, );

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
                // Show success popup
                setShowSuccessModal(true);
                // Reset form fields
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
            }
        } catch (error) {
            console.error('Error occurred while contacting Salesforce:', error.message);
            // Handle error scenario here, e.g., show an error message to the user
        }
    };

    const closeModal = () => setShowSuccessModal(false);
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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} />
            <div style={{ height: `${sectionHeight}px` }} className="flex-1 overflow-y-auto flex flex-col px-5 py-5 h-screen p-4 bg-white border-t border-neutral-200 border-sm">
                <div className="bg-white shadow-md p-6 px-8 py-5 mb-5">
                    <h2 className="text-lg font-bold text-c-dark-grayish mb-6 border-b border-b-neutral-300">NEW ACCOUNT DETAILS</h2>

                    {/* Account Information */}

                    <div className="mb-4">
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

                    <div className="flex justify-end space-x-4">
                        {/* <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button> */}
                        <button
                            onClick={handleSubmit}
                            className={`px-4 py-2 text-white font-bold rounded-md bg-c-teal text-white hover:text-white hover:bg-c-weldon-blue`}
                        // disabled={!accessToken}
                        >Save</button>
                    </div>
                </div>
                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm mx-auto text-center">
                            <div className="flex flex-col items-center mb-4">
                                <div className="bg-green-100 rounded-full p-3 mb-3">
                                    <MdOutlineCheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">Success!</h2>
                                <p className="text-sm text-gray-700">
                                    Your account has been successfully submitted.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={closeModal}
                                    className="flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg w-20"
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
