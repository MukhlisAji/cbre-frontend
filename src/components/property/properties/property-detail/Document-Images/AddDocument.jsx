import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function AddDocument({ onClose }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileDetails, setFileDetails] = useState([]);
    const [type , setType] = useState('');

    const handleBackdropClick = (e) => {
        // Close modal when clicking on the backdrop
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        // Prevent the modal from closing when clicking inside the modal
        e.stopPropagation();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setFileDetails(files.map(file => ({
            name: file.name,
            description: "",
            highPriority: false,
            webPublished: false
        })));
    };

    const handleDetailChange = (index, field, value) => {
        setFileDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index][field] = value;
            return updatedDetails;
        });
    };

    const handleDeleteFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setFileDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${onClose ? 'animate-fade-in' : 'animate-fade-out'}`} onClick={handleBackdropClick}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col w-1/2 bg-white shadow-lg rounded-lg" onClick={handleModalContentClick}>
                {/* Header */}
                <div className="flex bg-c-teal justify-between items-center p-4 border-b rounded-t-lg">
                    <span className="text-lg text-white font-semibold">Add Document</span>
                    <span onClick={onClose} className="cursor-pointer text-white text-lg hover:text-white/80">
                        &times;
                    </span>
                </div>

                {/* Modal Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="relative p-4">
                        <div className="mb-4">
                            <FormControl fullWidth size="small">
                                <InputLabel id={`fileType-label`}>Choose File Type</InputLabel>
                                <Select
                                    label="Choose File Type"
                                    labelId={`fileType-label`}
                                    id={`fileType`}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                // onChange={handleChange}
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
                        </div>
                        <div className="mb-4">
                            <input
                                id="fileInput"
                                type="file"
                                multiple
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* File Previews */}
                        {selectedFiles.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-bold mb-2">Selected Files:</h3>
                                <div className="grid grid-cols-1 gap-4 h-[calc(100vh-400px)] overflow-y-auto">
                                    <Box>
                                        {selectedFiles.map((file, index) => (
                                            <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                                                <CardContent>
                                                    <Grid container spacing={2} alignItems="center">
                                                        {/* Image Section */}
                                                        <Grid item xs={12} sm={3}>
                                                            <Box sx={{ border: '1px solid green', borderRadius: '8px', padding: '4px', height: '100%' }}>
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={file.name}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'contain',  // Ensures the image fits the space
                                                                        borderRadius: '8px',
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Typography variant="caption" color="textSecondary">
                                                                ({file.type})
                                                            </Typography>
                                                        </Grid>

                                                        {/* Form Section */}
                                                        <Grid item xs={12} sm={9}>
                                                            <Grid container spacing={2}>

                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        label="Document Name"
                                                                        size="small"
                                                                        value={fileDetails[index].name}
                                                                        fullWidth
                                                                    />


                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        label="Description"
                                                                        value={fileDetails[index].description}
                                                                        onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                                                                        multiline
                                                                        // rows={2}
                                                                        fullWidth
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <FormControl fullWidth size="small">
                                                                        <InputLabel id={`fileType-label-${index}`}>Choose File Type</InputLabel>
                                                                        <Select
                                                                            label="Choose File Type"
                                                                            labelId={`fileType-label-${index}`}
                                                                            id={`fileType-${index}`}
                                                                            defaultValue={type}
                                                                            value={fileDetails[index].fileType || ""}
                                                                            onChange={(e) => handleDetailChange(index, "fileType", e.target.value)}
                                                                        // onChange={handleChange}
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

                                                                <Grid item xs={12} sm={4}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={fileDetails[index].highPriority}
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
                                                                                checked={fileDetails[index].webPublished}
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
                                        ))}
                                    </Box>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Cancel
                    </button>
                    <button
                        // onClick={handleSave}
                        // disabled={!isFormValid}
                        className="py-2 text-sm bg-c-teal text-white rounded-md hover:bg-c-teal/80"
                    >
                        Upload
                    </button>
                </footer>
            </div>
        </div>
    );
}