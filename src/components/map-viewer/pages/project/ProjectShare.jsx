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


export default function ProjectShare({ onClose }) {
    const [isInternal, setIsInternal] = useState(false);
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
            <div className="relative bg-white rounded-lg shadow-lg w-80 max-w-md">
                <div
                    onClick={onClose}
                    className='absolute right-2 top-2 cursor-pointer'>
                    <RiCloseLine className='text-lg' />
                </div>
                <div className="flex flex-col items-center">
                    <div className='w-full border-b my-2'>
                        <h3 className="text-md font-semibold text-neutral-700 text-center py-2">Share with other Broker</h3>
                    </div>

                    {/* Radio Buttons for Broker's Option */}
                    <div className="px-4 py-2 w-full">
                        <label className="block text-sm font-medium text-neutral-700">For Broker's</label>
                        <div className="mt-2 flex items-center space-x-4">
                            <label className="flex items-center">
                                <input onClick={() => setIsInternal(false)}
                                    type="radio" name="brokerType" value="internal" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                                <span className="ml-2 text-sm text-neutral-700">Internal</span>
                            </label>
                            <label className="flex items-center">
                                <input onClick={() => setIsInternal(true)}
                                    type="radio" name="brokerType" value="external" className="text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-neutral-700">External</span>
                            </label>
                        </div>
                    </div>

                    <div className='mb-2 w-full'>
                        <div className="px-4 w-full">
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
                                {/* <TextField
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="dense"
                                    sx={cusInput}
                                /> */}
                            </Stack>
                        </div>

                        {isInternal && (
                            <div className="px-4 w-full">
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    size="small"
                                >
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Account"
                                        size="small"
                                        margin="dense"
                                        sx={cusInput}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Contact"
                                        size="small"
                                        margin="dense"
                                        sx={cusInput}
                                    />
                                </Box>
                            </div>
                        )}
                    </div>

                    <div className="h-10 w-full ">
                        {alertElement}
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t py-2 px-4 flex justify-between w-full justify-center">
                        <div className='itemx-center flex gap-2'>
                            <button
                                onClick={handleCopyLink}
                                className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                            >
                                Copy Link
                            </button>
                            <button
                                onClick={handleSendEmail}
                                className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                            >
                                Email
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={onClose}
                                className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs hover:text-white hover:bg-c-weldon-blue"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
