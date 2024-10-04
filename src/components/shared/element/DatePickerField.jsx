import React, { useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material';

const currentYear = dayjs();

export default function DatePickerField({ label }) {
  const darkGreen = '#5a8184';
  const [availableDate, setAvailableDate] = useState(null);

  const newTheme = (theme) =>
    createTheme({
      ...theme,
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiInputBase-root': {
                fontSize: '14px',
                padding: '5px 16px 5px 4px',

                '& .MuiInputAdornment-root': {
                  '& .MuiSvgIcon-root': {
                    fontSize: '18px',
                  },
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                padding: '5px 8px',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: darkGreen,
                },
                '&.Mui-focused fieldset': {
                  borderColor: darkGreen,
                },
              },
              '& .MuiInputLabel-root': {
                // Center the label vertically by adjusting its transform property
                transform: 'translate(30%, 50%)',
                // Adjust font-size if necessary
                fontSize: '14px',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: darkGreen,
                transform: 'translate(30%, -50%) scale(0.75)', // Adjust label when focused
              },
            },
          },
        },
      },
    });


  const cusInput = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: darkGreen,
      },
      '&.Mui-focused fieldset': {
        borderColor: darkGreen,
      },
    },
    // '& .MuiInputLabel-root': { color: red, },
    '& .MuiInputLabel-root.Mui-focused': {
      color: darkGreen,
    },
  };
  return (
    <ThemeProvider theme={newTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          sx={{ width: 1, bgcolor: 'white' }}
          maxDate={currentYear}
          openTo="year"
          views={['year']}
          yearsOrder="desc"
          value={availableDate}
          onChange={(date) => setAvailableDate(date)}
          fullWidth={true}
        />
      </LocalizationProvider>
    </ThemeProvider >
  );
}
