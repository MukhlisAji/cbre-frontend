import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../AppContext';
import { BsQuestionCircle } from 'react-icons/bs';
import { generateTransactionId, useUtils } from '../../lib/api/Authorization';
import ContactFormSection from './ContactFormSection';
import { CONFIG } from '../../../config';

const generateSystemValues = () => {
    const currentUser = "System User"; // Replace with actual user info if available
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return {
        createdBy: currentUser,
        createdDate: currentDate,
    };
};

export default function ContactForm({ onClose, isEditing, contactId }) {
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
        contactInformationVisible: true,
        communicationPreferencesVisible: true,
    });

    const toggleVisibility = (section) => {
        setSectionVisibility((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({
        contactInformation: {
            salutation: '',
            firstName: '',
            middleName: '',
            lastName: '',
            title: '',
            department: '',
            email: '',
            businessPhone: '',
            mobilePhone: '',
            mainPhone: '',
            fax: '',
            linkedin: '',
            accountName: {
                accountId: null,
                salesforceAccountId: '',
                relationshipTypeId: null,
                relationshipType: '',
                isPrimary: 'No'
            },
            contactProfile: [],
            influenceLevel: ''
        },
        addressInformation: {
            mailingCountryCode: '',
            mailingCountry: '',
            mailingState: '',
            mailingCity: '',
            mailingStreet: '',
            mailingPostCode: ''
        },
        communicationPreference: {
            communicationMethod: '',
            emailOptions: '',
            mailOptions: '',
            callOptions: '',
            smsOptions: '',
            excludeReason: '',
            excludeOn: '',
            excludeBy: {
                excludeById: null,
                excludeBySalesforceId: ''
            }
        },
        additionalInformation: {
            nickName: '',
            assistantName: '',
            assistantPhone: '',
            assistantEmail: '',
            reportsTo: {
                reportsToId: null,
                reportsToSalesforceId: ''
            },
            description: '',
            cbreEmployee: false
        },
        systemInformation: {
            contactOwner: [],
            // createdBy: generateSystemValues().createdBy,
            // createdDate: generateSystemValues().createdDate,
            status: '',
            inactivationDate: '',
            reasonForInactivating: '',
            saveToSFDC: true,
            userId: ''
        }
    });

    const url = `${CONFIG.CONTACT_SERVICE}/${contactId}`;

    useEffect(() => {
        if (isEditing) {
            console.log("url is ", url);
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
                    console.log('Fetched contact data:', data);
                } catch (error) {
                    console.error('Error fetching contact data:', error);
                }
            };
            fetchAccountData();
        }
    }, [isEditing, url]);
    useEffect(() => {
        if (initialData) {
            setFormData({
                contactInformation: {
                    contactId: initialData.id || '',
                    salutation: initialData.salutation || '',
                    firstName: initialData.firstname || '',
                    middleName: initialData.middlename || '',
                    lastName: initialData.lastname || '',
                    title: initialData.title || '',
                    department: initialData.department || '',
                    email: initialData.email || '',
                    businessPhone: initialData.businessPhone || '',
                    mobilePhone: initialData.mobilePhone || '',
                    mainPhone: initialData.mainPhone || '',
                    fax: initialData.fax || '',
                    linkedin: initialData.linkedin || '',
                    accountName: initialData.accountContact ? {
                        accountId: initialData.accountContact.accountId || '',
                        salesforceAccountId: initialData.accountContact.accountSalesforceId || '',
                        relationshipTypeId: initialData.accountContact.relationshipType.id || '',
                        relationshipType: initialData.accountContact.relationshipType.name || '',
                        isPrimary: 'Yes' // Assuming it's primary if it's the only one provided
                    } : {},
                    contactProfile: initialData.contactProfile.map(profile => ({
                        contactProfileId: profile.contactProfileList.id,
                        contactProfileName: profile.contactProfileList.name
                    })) || [],
                    influenceLevel: initialData.influenceLevel || '',
                },
                addressInformation: {
                    mailingCountry: initialData.mailingCountry ? initialData.mailingCountry.countryName : '',
                    mailingCountryCode: initialData.mailingCountry ? initialData.mailingCountry.countryCode : '',
                    mailingState: initialData.mailingState || '',
                    mailingCity: initialData.mailingCity || '',
                    mailingStreet: initialData.mailingStreet || '',
                    mailingPostCode: initialData.mailingPostCode || '',
                },
                communicationPreference: {
                    communicationMethod: initialData.communicationMethod || '',
                    emailOptions: initialData.emailOptions || '',
                    mailOptions: initialData.mailOptions || '',
                    callOptions: initialData.callOptions || '',
                    smsOptions: initialData.smsOptions || '',
                    excludeReason: initialData.excludeReason || '',
                    excludeOn: initialData.excludeOn || '',
                    excludeBy: initialData.excludeBy ? {
                        excludeById: initialData.excludeBy.id,
                        excludeBySalesforceId: initialData.excludeBy.salesforceId || '',
                    } : {},
                },
                additionalInformation: {
                    nickName: initialData.nickName || '',
                    assistantName: initialData.assistantName || '',
                    assistantPhone: initialData.assistantPhone || '',
                    assistantEmail: initialData.assistantEmail || '',
                    reportsTo: initialData.reportsTo ? {
                        reportsToId: initialData.reportsTo.id,
                        reportsToSalesforceId: initialData.reportsTo.salesforceId || '',
                    } : {},
                    description: initialData.description || '',
                    cbreEmployee: initialData.cbreEmployee || false,
                },
                systemInformation: {
                    contactOwner: initialData.contactOwner.map(owner =>
                        owner.employee.employeeId,
                    ) || [],
                    status: initialData.status || '',
                    inactivationDate: initialData.inactiveDate || '',
                    reasonForInactivating: initialData.reasonForInactivating || '',
                    userId: '',
                },
            });
        }
        console.log("this is the data : ", formData);
    }, [initialData, isEditing]);


    useEffect(() => {
        toggleBodyOverflow(true);
        return () => {
            toggleBodyOverflow(false);
        };
    }, []);

    // useEffect(() => {
    //     if (formData) {
    //         console.log("this is the data : ", formData);
    //     }
    // })

    const handleAccountAction = async (event, { isNew = false, navigateTo = null, showDialog = false }) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("formData : ", formData);
        console.log('Processing data');
        // console.log('Set to invalid session');


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
                    showNotification("Contact updated successfully!", 'success');
                    if (navigateTo) {
                        navigate(navigateTo);
                    }
                } else {
                    if (result.resultSet && result.resultSet.contactId) {
                        const contactId = result.resultSet.contactId;
                        showNotification("Contact created successfully!", 'success');
                        if (isNew) {
                            resetData();
                        } else if (navigateTo) {
                            navigate(navigateTo, { state: { openModal: true } });
                        } else {
                            navigate(`details/${contactId}`);
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

    const handleSave = (event) => handleAccountAction(event, { navigateTo: isEditing ? `details/${contactId}` : null });
    const handleSaveNew = (event) => handleAccountAction(event, { isNew: true });
    // const handleConfirmSave = (event) => handleAccountAction(event, { navigateTo: '/property/contacts' });
    const handleCancelSave = () => {
        setConfirmationDialogVisible(false);
        setIsLoading(false);
    };

    const handleSubmit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.CONTACT_SERVICE}/`, {
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
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleEdit = async (event) => {
        const transactionId = generateTransactionId();
        event.preventDefault();

        try {
            const response = await fetch(`${CONFIG.CONTACT_SERVICE}/`, {
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
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
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
            contactInformation: {
                salutation: '',
                firstName: '',
                middleName: '',
                lastName: '',
                title: '',
                department: '',
                email: '',
                businessPhone: '',
                mobilePhone: '',
                mainPhone: '',
                fax: '',
                linkedin: '',
                accountName: '',
                relationshipType: '',
                contactProfile: [],
                influenceLevel: '',
            },
            addressInformation: {
                mailingCountryCode: '',
                mailingCountry: '',
                mailingbillingState: '',
                mailingbillingCity: '',
                mailingbillingStreet: '',
                mailingbillingPostCode: '',
            },
            communicationPreferences: {
                communicationmethod: '',
                emailOptions: '',
                mailOptions: '',
                callOptions: '',
                smsOptions: '',
                excludeReason: '',
                excludeOn: '',
                excludeBy: '',
            },
            additionalInformation: {
                nickName: '',
                assistantName: '',
                assistantPhone: '',
                assistantEmail: '',
                reportsTo: '',
                description: '',
                cbreEmployee: false,
            },
            systemInformation: {
                contactOwner: [],
                // createdBy: generateSystemValues().createdBy,
                // createdDate: generateSystemValues().createdDate,
                status: 'Active',
                inactivationDate: '',
                reasonForInactivating: '',
                saveToSFDC: true,
            },
        });
    };

    const copyBillingToShipping = () => {
        setFormData((prevData) => ({
            ...prevData,
            addressInformation: {
                ...prevData.addressInformation,
                shippingCountry: prevData.addressInformation.mailingCountry,
                shippingPostalCode: prevData.addressInformation.mailingPostCode,
                shippingCity: prevData.addressInformation.mailingCity,
                shippingState: prevData.addressInformation.mailingState,
                shippingStreet: prevData.addressInformation.mailingStreet,
            },
        }));
    };

    const toggleBodyOverflow = (isModalOpen) => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (!initialData && isEditing) {
        return <p>Loading...</p>;
    }

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
                    <h2 className="text-lg font-bold text-c-dark-grayish text-align-center">NEW CONTACT</h2>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="bg-white relative p-4">
                        <ContactFormSection
                            formData={formData}
                            setFormData={setFormData}
                            toggleVisibility={toggleVisibility}
                            sectionVisibility={sectionVisibility}
                            copyBillingToShipping={copyBillingToShipping}
                            initialData={initialData}
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
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                    >
                        Save & New
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white rounded-lg bg-c-teal text-xs text-white hover:text-white hover:bg-c-weldon-blue"
                    >
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </footer>

                {confirmationDialogVisible && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 max-w-md">
                            <div className="flex flex-col items-center">
                                <BsQuestionCircle className="text-yellow-500 text-4xl mb-4" />
                                <h3 className="text-lg font-bold text-center">Confirm Save</h3>
                                <p className="mt-2 text-center">Do you want to proceed to create new contact with this set of data?</p>
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



