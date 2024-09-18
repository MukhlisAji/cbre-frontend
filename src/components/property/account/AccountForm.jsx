import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../AppContext';
import AccountFormSection from './AccountFormSection';
import { BsQuestionCircle } from 'react-icons/bs';
import { generateTransactionId, useUtils } from '../../lib/api/Authorization';
import { CONFIG } from '../../../config';

const generateSystemValues = () => {
    const currentUser = "System User"; // Replace with actual user info if available
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return {
        createdBy: currentUser,
        createdDate: currentDate,
    };
};

export default function AccountForm({ onClose, isEditing, accountId }) {
    const { token } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState('success');
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const { generateAndSetToken } = useUtils();
    const navigate = useNavigate();

    const [sectionVisibility, setSectionVisibility] = useState({
        accountInformationVisible: true,
        addressInformationVisible: true,
        additionalInformationVisible: true,
        segmentInformationVisible: true,
        systemInformationVisible: true,
        associateInformationVisible: true,
    });

    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({
        accountDetails: {
            accountId: '',
            accountName: '',
            parentAccount: '',
            localAccountName: '',
            clientType: [],
            phone: '',
            fax: '',
            website: '',
        },
        addressInformation: {
            billingCountryCode: '',
            billingCountry: '',
            billingState: '',
            billingCity: '',
            billingStreet: '',
            billingPostCode: '',
            shippingCountryCode: '',
            shippingCountry: '',
            shippingState: '',
            shippingCity: '',
            shippingStreet: '',
            shippingPostCode: '',
        },
        segmentation: {
            industrialType: '',
            subIndustrialId: '',
            subIndustrial: '',
            headquarterCountryId: '',
            headquarterCountry: '',
            commercialNumber: '',
        },
        additionalInformation: {
            taxType: '',
            taxId: '',
            description: '',
        },
        systemInformation: {
            accountOwner: [],
            // createdBy: generateSystemValues.createdBy,
            // createdDate: generateSystemValues.createdDate,
            // lastModifiedBy: '',
            // lastModifiedDate: '',
            status: 'Active',
            inactivationDate: '',
            reasonForInactivating: '',
            userId: '',
            saveToSFDC: true,
            // salesforceId: '',
        },
        // associateInformation: {
        //     accountSource: 'One App',
        //     accountId: '',
        //     parentAccountSource: '',
        //     parentAccountId: '',
        //     topParentAccountSource: '',
        //     topParentAccountId: '',
        // },
    });
    const url = `${CONFIG.ACCOUNT_SERVICE}/${accountId}`;
    // const headers = {
    //     'transactionId': ,
    //     'Cookie': 'CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
    // };

    useEffect(() => {
        if (isEditing) {

            const fetchAccountData = async () => {
                try {
                    const transactionId = generateTransactionId();

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'transactionId': transactionId,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setInitialData(data.resultSet);
                    console.log('Fetched account data:', data);
                } catch (error) {
                    console.error('Error fetching account data:', error);
                }
            };
            fetchAccountData();
        }
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                accountDetails: {
                    accountId: initialData?.id?.toString() || '',
                    accountName: initialData?.accountName?.toString() || '',
                    parentAccount: initialData?.parentAccount?.id?.toString() || '',
                    localAccountName: initialData?.localAccountName?.toString() || '',
                    clientType: initialData?.clientType?.map(type => ({
                        clientTypeId: type?.id?.toString() || '',
                        clientTypeName: type?.name?.toString() || '',
                    })) || [],
                    phone: initialData?.phone?.toString() || '',
                    fax: initialData?.fax?.toString() || '',
                    website: initialData?.website?.toString() || '',
                },
                addressInformation: {
                    billingCountryCode: initialData?.billingCountry?.countryCode?.toString() || '',
                    billingCountry: initialData?.billingCountry?.countryName?.toString() || '',
                    billingState: initialData?.billingState?.toString() || '',
                    billingCity: initialData?.billingCity?.toString() || '',
                    billingStreet: initialData?.billingStreet?.toString() || '',
                    billingPostCode: initialData?.billingPostCode?.toString() || '',
                    shippingCountryCode: initialData?.shippingCountry?.countryCode?.toString() || '',
                    shippingCountry: initialData?.shippingCountry?.countryName?.toString() || '',
                    shippingState: initialData?.shippingState?.toString() || '',
                    shippingCity: initialData?.shippingCity?.toString() || '',
                    shippingStreet: initialData?.shippingStreet?.toString() || '',
                    shippingPostCode: initialData?.shippingPostCode?.toString() || '',
                },
                segmentation: {
                    industrialType: initialData?.industrialType?.name?.toString() || '',
                    subIndustrialId: initialData?.subIndustrial?.id?.toString() || '',
                    subIndustrial: initialData?.subIndustrial?.name?.toString() || '',
                    headquarterCountry: initialData?.headQuarter?.countryName?.toString() || '',
                    commercialNumber: initialData?.commercialNumber?.toString() || '',
                },
                additionalInformation: {
                    taxType: initialData?.taxType?.toString() || '',
                    taxId: initialData?.taxId?.toString() || '',
                    description: initialData?.description?.toString() || '',
                },
                systemInformation: {
                    accountOwner: initialData?.accountOwner?.map(owner => owner?.employee?.id?.toString()) || [],
                    status: initialData?.status?.toString() || '',
                    inactivationDate: initialData?.inactivationDate?.toString() || '',
                    reasonForInactivating: initialData?.reasonForInactivating?.toString() || '',
                    userId: '', // Assuming this is set elsewhere, keeping it empty
                },
            });
            
        }
    }, [initialData, isEditing]);

    useEffect(() => {
        toggleBodyOverflow(true);
        return () => {
            toggleBodyOverflow(false);
        };
    }, []);

    const handleAccountAction = async (event, { isNew = false, navigateTo = null, showDialog = false }) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("formData : ", formData);

        if (showDialog) {
            setConfirmationDialogVisible(true);
            setIsLoading(false);
            return;
        }

        setConfirmationDialogVisible(false);
        console.log('Processing data');

        try {
            let result;
            if (isEditing) {
                result = await handleEdit(event);
            } else {
                result = await handleSubmit(event);
            }

            if (result.statusCode === "401" || result.statusDescription.message === "Session expired or invalid") {
                console.log("Session invalid, regenerating token...");
                await generateAndSetToken();

                // Retry the operation with the new token
                if (isEditing) {
                    result = await handleEdit(event);
                } else {
                    result = await handleSubmit(event);
                }
            }

            if (result.statusCode === "00") {
                if (isEditing) {
                    showNotification("Account updated successfully!", 'success');
                    if (navigateTo) {
                        navigate(navigateTo);
                    } else {
                        // Optionally navigate to a details page or stay on the same page
                        // navigate(`details/${accountId}`);
                    }
                } else {
                    if (result.resultSet && result.resultSet.accountId) {
                        const accountId = result.resultSet.accountId;
                        showNotification("Account created successfully!", 'success');
                        if (isNew) {
                            resetData();
                        } else if (navigateTo) {
                            navigate(navigateTo, { state: { openModal: true } });
                        } else {
                            navigate(`details/${accountId}`);
                        }
                    } else {
                        console.error('Unexpected response format for new account:', result);
                        showNotification("Account created, but no ID returned. Please check the account list.", 'warning');
                    }
                }
            } else {
                console.error('Unexpected response format:', result);
                showNotification(`Failed to ${isEditing ? 'update' : 'create'} account. Please try again.`, 'error');
            }
        } catch (error) {
            console.error('Error during submission:', error);
            showNotification(`Failed to ${isEditing ? 'update' : 'create'} account. Please try again.`, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    // Usage examples:
    const handleSave = (event) => handleAccountAction(event, { showDialog: !isEditing, navigateTo: isEditing ? `details/${accountId}` : null });
    const handleSaveNew = (event) => handleAccountAction(event, { isNew: true });
    const handleConfirmSave = (event) => handleAccountAction(event, { navigateTo: '/property/contacts' });

    const handleCancelSave = () => {
        setConfirmationDialogVisible(false);
        setIsLoading(false);
    };

    const handleSubmit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/`, {
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
            return result; // Return the result
        } catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error so it can be caught in handleAccountAction
        }
    }

    const handleEdit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.ACCOUNT_SERVICE}/`, {
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
            return result; // Return the result
        } catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error so it can be caught in handleAccountAction
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
        setFormData({
            accountDetails: {
                accountId: '',
                accountName: '',
                parentAccount: '',
                localAccountName: '',
                clientType: [
                    {
                        clientTypeId: '',
                        clientTypeName: ''
                    }
                ],
                phone: '',
                fax: '',
                website: '',
            },
            addressInformation: {
                billingCountry: '',
                billingState: '',
                billingCity: '',
                billingStreet: '',
                billingPostCode: '',
                shippingCountry: '',
                shippingState: '',
                shippingCity: '',
                shippingStreet: '',
                shippingPostCode: '',
            },
            segmentation: {
                industryType: '',
                subIndustry: '',
                headquarterCountry: '',
                commercialNumber: '',
            },
            additionalInformation: {
                taxType: '',
                taxId: '',
                description: '',
            },
            systemInformation: {
                accountOwner: [],
                createdBy: systemValues.createdBy,
                createdDate: systemValues.createdDate,
                lastModifiedBy: '',
                lastModifiedDate: '',
                status: '',
                inactivationDate: '',
                reasonForInactivating: '',
                userId: '',
                saveToSFDC: true,
                salesforceId: '',
            },
            // associateInformation: {
            //     accountSource: 'One App',
            //     accountId: '',
            //     parentAccountSource: '',
            //     parentAccountId: '',
            //     topParentAccountSource: '',
            //     topParentAccountId: '',
            // },
        });
    };

    const copyBillingToShipping = () => {
        setFormData({
            ...formData,
            addressInformation: {
                ...formData.addressInformation,
                shippingCountry: formData.addressInformation.billingCountry,
                shippingPostCode: formData.addressInformation.billingPostCode,
                shippingCity: formData.addressInformation.billingCity,
                shippingState: formData.addressInformation.billingState,
                shippingStreet: formData.addressInformation.billingStreet,
            },
        });
    };

    const toggleVisibility = (section) => {
        setSectionVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleBodyOverflow = (isModalOpen) => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    // if (!initialData && isEditing) {
    //     return <p>Loading...</p>;
    // }

    const [isFormValid, setIsFormValid] = useState(true);

    const validateAccountDetails = () => {
        // Check if each field in accountDetails is filled
        const isAccountNameFilled = formData.accountDetails.accountName.trim() !== '';
        const isParentAccountFilled = formData.accountDetails.parentAccount.trim() !== '';
        const isLocalAccountNameFilled = formData.accountDetails.localAccountName.trim() !== '';
        const isPhoneFilled = formData.accountDetails.phone.trim() !== '';
        const isFaxFilled = formData.accountDetails.fax.trim() !== '';
        const isWebsiteFilled = formData.accountDetails.website.trim() !== '';
        
        // Check if clientType array is valid (e.g., at least one item with non-empty fields)
        // const isClientTypeValid = formData.accountDetails.clientType.some(clientType =>
        //     clientType.clientTypeId.trim() !== '' && clientType.clientTypeName.trim() !== ''
        // );
    
        // Combine all checks
        const allFieldsFilled = isAccountNameFilled &&
                                isParentAccountFilled && isLocalAccountNameFilled &&
                                isPhoneFilled && isFaxFilled && isWebsiteFilled;
    
        setIsFormValid(allFieldsFilled);
    };
    
    useEffect(() => {
        validateAccountDetails();
    }, [formData]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 h-3/4 bg-white shadow-lg rounded-lg">
                {(isLoading || !initialData) && (
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
                        <AccountFormSection
                            formData={formData}
                            setFormData={setFormData}
                            toggleVisibility={toggleVisibility}
                            sectionVisibility={sectionVisibility}
                            copyBillingToShipping={copyBillingToShipping}
                            isEditing={isEditing}
                        />
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
                        disabled={!isFormValid}
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        {isEditing ? 'Update & New' : 'Save & New'}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className="px-4 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                    >
                        {isEditing ? 'Update' : 'Save'}
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
                                <p className="mt-2 text-center">Do you want to proceed to create new contact with this set of Account data?</p>
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
