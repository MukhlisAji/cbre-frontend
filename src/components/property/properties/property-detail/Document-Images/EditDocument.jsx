import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function EditDocument({ onClose }) {
    const [type, setType] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');

    // Dummy data for file details
    const [fileDetails, setFileDetails] = useState([
        {
            name: "bldg 2.JPG",
            description: "",
            highPriority: false,
            webPublished: false,
            floor: ''
        },
        {
            name: "bldg 1.JPG",
            description: "",
            highPriority: false,
            webPublished: false,
            floor: ''
        }
    ]);

    const handleBackdropClick = (e) => {
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    const handleDetailChange = (index, field, value) => {
        setFileDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index][field] = value;
            return updatedDetails;
        });
    };

    const handleDeleteFile = (index) => {
        setFileDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
    };

    const handleFloorChange = (index, value) => {
        setFileDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index]['floor'] = value;
            return updatedDetails;
        });
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Edit Document</span>
                    <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
                        &times;
                    </span>
                </div>

                {/* Modal Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="relative p-4">
                        {fileDetails.map((file, index) => (
                            <Box key={index}>
                                <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            {/* Image Section */}
                                            <Grid item xs={12} sm={3}>
                                                <Box sx={{ border: '1px solid green', borderRadius: '8px', padding: '4px', height: '100%' }}>
                                                    <img
                                                        src={URL.createObjectURL(new Blob())} // Replace with your image source
                                                        alt={file.name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            borderRadius: '8px',
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="caption" color="textSecondary">
                                                    {file.name}
                                                </Typography>
                                            </Grid>

                                            {/* Form Section */}
                                            <Grid item xs={12} sm={9}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Document Name"
                                                            size="small"
                                                            value={file.name}
                                                            fullWidth
                                                            InputProps={{ readOnly: true }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Description"
                                                            value={file.description}
                                                            onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                                                            multiline
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id={`fileType-label`}>Choose File Type</InputLabel>
                                                            <Select
                                                                label="Choose File Type"
                                                                labelId={`fileType-label`}
                                                                id={`fileType`}
                                                                value={type}
                                                                onChange={(e) => setType(e.target.value)}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value="Image">Image</MenuItem>
                                                                <MenuItem value="Floor Plan">Floor Plan</MenuItem>
                                                                <MenuItem value="Flyer">Flyer</MenuItem>
                                                                <MenuItem value="Brochure">Brochure</MenuItem>
                                                                <MenuItem value="External Appearance">External Appearance</MenuItem>
                                                                <MenuItem value="Facilities">Facilities</MenuItem>
                                                                <MenuItem value="Layout">Layout</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel>Floor</InputLabel>
                                                            <Select
                                                                value={file.floor}
                                                                onChange={(e) => handleFloorChange(index, e.target.value)}
                                                                label="Floor"
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value="1">1</MenuItem>
                                                                <MenuItem value="2">2</MenuItem>
                                                                <MenuItem value="3">3</MenuItem>
                                                                {/* Add more floor options as needed */}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} sm={4}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={file.highPriority}
                                                                    onChange={(e) => handleDetailChange(index, "highPriority", e.target.checked)}
                                                                    size="small"
                                                                />
                                                            }
                                                            label="High Priority"
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={file.webPublished}
                                                                    onChange={(e) => handleDetailChange(index, "webPublished", e.target.checked)}
                                                                    size="small"
                                                                />
                                                            }
                                                            label="Web Published"
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={2}>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleDeleteFile(index)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </div>
                </main>

                <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Close
                    </button>
                    <button
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Save
                    </button>
                </footer>
            </div>
        </div>
    );
}
