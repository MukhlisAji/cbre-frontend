import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import MultipleSelect from "../../../shared/element/MultipleSelect";
import { DatePicker } from "@mui/x-date-pickers";

export default function Agency({ agency }) {
    const [formData, setFormData] = useState({
        appointmentType: null,
        thirdPartyAgent: [],
        cbreBusinessLine: [],
        assignmentStatus: null,
        assignmentStartDate: null,
        assignmentEndDate: null,
    });

    useEffect(() => {
        if (agency) {
            const endDate = agency.assignmentEndDate ? new Date(agency.assignmentEndDate) : null;
            const isExpired = endDate && endDate < new Date();
            setFormData({
                appointmentType: agency.appointmentType || null,
                thirdPartyAgent: agency.thirdPartyAgent ? [agency.thirdPartyAgent] : [],
                cbreBusinessLine: [],
                assignmentStatus: isExpired ? 'expired' : 'active',
                assignmentStartDate: agency.assignmentStartDate ? new Date(agency.assignmentStartDate) : null,
                assignmentEndDate: endDate,
            });
        }
    }, [agency]);

    useEffect(() => {
        // Check if assignmentEndDate is in the past and update assignmentStatus accordingly
        if (formData.assignmentEndDate) {
            const isExpired = formData.assignmentEndDate < new Date();
            setFormData((prevData) => ({
                ...prevData,
                assignmentStatus: isExpired ? 'expired' : 'active',
            }));
        }
    }, [formData.assignmentEndDate]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const appointmentTypeOptions = [
        { value: 'sole', label: 'Sole Appointment' },
        { value: 'joint', label: 'Joint Appointment' },
    ];

    const thirdPartyAgentOptions = [
        { value: 'cbre', label: 'CBRE' },
        { value: 'jll', label: 'JLL' },
        { value: 'etc', label: 'Etc' },
    ];

    const cbreBusinessLineOptions = [
        { value: 'office', label: 'Office Services' },
        { value: 'industrial', label: 'Industrial and Logistics Services' },
    ];

    const assignmentStatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'expired', label: 'Expired' }, // Add "expired" option
    ];

    const darkGreen = '#5a8184';
    const cusInput = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
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
        <div className="relative h-full mx-auto bg-white shadow-md rounded-md p-4 border border-gray-200" style={{ maxWidth: "100%" }}>
            <h2 className="text-c-teal text-lg font-semibold mb-4">Agency</h2>
            <form>
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MultipleSelect
                                label="Appointment Type"
                                options={appointmentTypeOptions}
                                isMulti={false}
                                labelKey="label"
                                value={formData.appointmentType || null}
                                onChange={(value) => handleChange('appointmentType', value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                label="Assignment Start Date"
                                value={formData.assignmentStartDate}
                                onChange={(value) => handleChange('assignmentStartDate', value)}
                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                sx={cusInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MultipleSelect
                                label="Third Party Agent"
                                options={thirdPartyAgentOptions}
                                isMulti={true}
                                labelKey="label"
                                value={formData.thirdPartyAgent || []}
                                onChange={(value) => handleChange('thirdPartyAgent', value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                label="Assignment End Date"
                                value={formData.assignmentEndDate}
                                onChange={(value) => handleChange('assignmentEndDate', value)}
                                slotProps={{ textField: { size: 'small', shrink: true } }}
                                sx={cusInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MultipleSelect
                                label="CBRE Business Line"
                                options={cbreBusinessLineOptions}
                                isMulti={true}
                                labelKey="label"
                                value={formData.cbreBusinessLine || []}
                                onChange={(value) => handleChange('cbreBusinessLine', value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <MultipleSelect
                                label="Assignment Status"
                                options={assignmentStatusOptions}
                                isMulti={false}
                                labelKey="label"
                                value={formData.assignmentStatus || null}
                                onChange={(value) => handleChange('assignmentStatus', value)}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <div className="col-span-2 mt-6">
                    <button className="bg-c-teal text-white py-1 px-4 text-sm rounded hover:bg-c-teal/80">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
}
