import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function MultipleSelect({ label = 'Select Options', options = defaultOptions, isMulti = true, labelKey = 'title', valueKey = 'title', value, onChange = () => {} }) {
  // Rest of your code
  const darkGreen = '#5a8184';

  const cusInput = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white', // Set background color to white
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
    <Stack spacing={3} sx={cusInput}>
      <Autocomplete
        multiple={isMulti}
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option[labelKey]}
        filterSelectedOptions
        size='small'
        value={ value}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size='small'
          />
        )}
      />
    </Stack>
  );
}

// Default options if none are provided
const defaultOptions = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
];