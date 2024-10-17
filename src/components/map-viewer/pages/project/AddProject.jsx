import { Box, TextField } from '@mui/material'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

export default function AddProject({ onClose }) {

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

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* <div className="absolute w-screen h-screen inset-0 bg-black opacity-50"></div> */}
            <div className="relative bg-white rounded-lg shadow-lg w-80 max-w-md">
                <div
                    onClick={onClose}
                    className='absolute right-2 top-2 cursor-pointer'>
                    <RiCloseLine className='text-lg' />
                </div>
                <div className="flex flex-col items-center">
                    <div className='w-full border-b my-2'>
                        <h3 className="text-md font-semibold text-neutral-700 text-center py-2">Add to New Project</h3>
                    </div>

                    <div className="px-4 w-full mb-4">
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
                                label="Project Name"
                                size="small"
                                margin="dense"
                                sx={cusInput}
                            />
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
                    <div className="border-t py-2 px-4 flex justify-center space-x-2 w-full justify-center">
                        <div className='itemx-center flex gap-2'>
                            <button
                                className="px-4 py-1.5 rounded-lg bg-white text-blue-600 border border-neutral-500 text-xs hover:text-neutral-700 hover:bg-neutral-100"
                            >
                                Save
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={onClose}
                                className="px-4 py-1.5 text-white rounded-lg bg-c-teal text-xs hover:text-white hover:bg-c-weldon-blue"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
