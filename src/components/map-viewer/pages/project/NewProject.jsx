import React, { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { CONTACTDATADUMMY } from '../../../lib/const/DummyData';

const darkGreen = '#5a8184';
const cusInput = {
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: darkGreen,
        },
        '&.Mui-focused fieldset': {
            borderColor: darkGreen,
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: darkGreen,
    },
};


export default function NewProject({ onClose }) {
    const [email, setEmail] = useState('');
    const [contactName, setContactName] = useState('');
    const [alertElement, setAlertElement] = useState(null);

    const handleSendEmail = () => {
        if (email) {
            const subject = encodeURIComponent('Project Notification');
            const body = encodeURIComponent(`Hi ${contactName}\n\nYou have an incoming project assignment. Please check the URL below to view the project(s). Thanks.\n\nURL:\n\n\nFrom: ONE APP`);
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            setAlertElement(
                <div className='w-full h-8 px-4 text-xs bg-green-100 flex items-center text-neutral-600'>
                    <p>Email sent to {contactName} ({email})</p>
                </div>

            );
        } else {
            setAlertElement(
                <div className='w-full h-8 px-4 text-xs bg-red-100 flex items-center text-neutral-600'>
                    <p>Please select a contact first.</p>
                </div>

            );
        }

        setTimeout(() => {
            setAlertElement(null);
        }, 5000);

    };

    const handleCopyLink = () => {
        const linkToCopy = "http://localhost:5173/map";
        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                setAlertElement(
                    <div className='w-full h-8 px-4 text-xs bg-green-100 flex items-center text-neutral-600'>
                        <p>Link copied to clipboard!</p>
                    </div>
                );
                setTimeout(() => {
                    setAlertElement(null);
                }, 5000);
            })
            .catch(err => {
                <div className='w-full h-8 px-4 text-xs bg-green-100 flex items-center text-neutral-600'>
                    <p>Failed to copy the link.</p>
                </div>
                setTimeout(() => {
                    setAlertElement(null);
                }, 5000);
            });

    };

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96 max-w-md">
                <div
                    onClick={onClose}
                    className='absolute right-2 top-2 cursor-pointer'>
                    <RiCloseLine className='text-lg' />
                </div>
                <div className="flex flex-col items-center">
                    <div className='w-full border-b my-2'>
                        <h3 className="text-md font-semibold text-neutral-700 text-center py-2">Add to New Project</h3>
                    </div>

                    {/* Radio Buttons for Broker's Option */}
                    <div className="space-y-2 px-4 py-2 w-full">
                        <label className="block text-sm font-medium text-neutral-700 w-40">Project Name</label>
                        <div className='w-full'>
                            <Stack spacing={2} width={'100%'}>

                                <TextField
                                    required
                                    id="outlined-required"
                                    label=""
                                    size="small"
                                    margin="dense"
                                    sx={cusInput}
                                    width={'100%'}
                                />
                            </Stack>
                        </div>

                    </div>

                    <div className='mb-2 w-full'>
                        <div className="flex items-center space-x-2 px-4 w-full">
                            <Stack spacing={2} width={'100%'}>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={CONTACTDATADUMMY}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setEmail(newValue.email);
                                            setContactName(newValue.name);
                                        } else {
                                            setEmail('');
                                            setContactName('');
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose Account"
                                            margin="dense"
                                            sx={cusInput}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2} width={'100%'}>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={CONTACTDATADUMMY}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setEmail(newValue.email);
                                            setContactName(newValue.name);
                                        } else {
                                            setEmail('');
                                            setContactName('');
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose Contact"
                                            margin="dense"
                                            sx={cusInput}
                                        />
                                    )}
                                />
                            </Stack>
                        </div>
                    </div>

                    <div className="h-10 w-full ">
                        {alertElement}
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t py-2 px-4 flex justify-center w-full justify-center">
                        <div className='items-center flex gap-2'>
                            <button
                                onClick={onClose}
                                className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                            >
                                Close
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs hover:text-white hover:bg-c-weldon-blue"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
