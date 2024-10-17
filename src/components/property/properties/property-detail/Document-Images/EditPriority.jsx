import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function EditPriority({ onClose, onSave }) {
    // Dummy data for file details
    const [fileDetails, setFileDetails] = useState([
        {
            name: "bldg 2.JPG",
            description: "Description of building 2",
            floor: "2",
        },
        {
            name: "bldg 1.JPG",
            description: "Description of building 1",
            floor: "1",
        },
    ]);

    const handleBackdropClick = (e) => {
        if (onClose) onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    // Handle drag end and update the order
    const handleDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside the list

        const items = Array.from(fileDetails);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFileDetails(items);
    };

    // Function to handle saving of priority
    const handleSave = () => {
        // You can either send `fileDetails` back to the parent or make an API call here
        if (onSave) onSave(fileDetails);
        onClose(); // Optionally close the modal after saving
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
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="fileDetails">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {fileDetails.map((file, index) => (
                                            <Draggable key={file.name} draggableId={file.name} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                                                            <CardContent>
                                                                <Grid container spacing={2} alignItems="center">
                                                                    {/* Number Section */}
                                                                    <Grid item xs={1}>
                                                                        <Typography variant="h6">
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </Grid>

                                                                    {/* Image Section */}
                                                                    <Grid item xs={12} sm={3}>
                                                                        <Box
                                                                            sx={{
                                                                                border: '1px solid green',
                                                                                borderRadius: '8px',
                                                                                padding: '4px',
                                                                                height: '100%',
                                                                            }}
                                                                        >
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

                                                                    {/* Information Section */}
                                                                    <Grid item xs={12} sm={8}>
                                                                        <Typography variant="subtitle1">
                                                                            Name: {file.name}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            Description: {file.description}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            Floor: {file.floor}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </main>

                <footer className="px-4 sticky bottom-0 bg-neutral-100 py-3 flex items-center gap-2 justify-end border-t border-neutral-500 shadow-md z-10 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="py-2 text-sm bg-white border text-gray-600 rounded-md hover:white/80"
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
