import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import useHooks from './hooks';

export default function SelectLanguage() {
  const { states: { appLanguage }, handlers: { handleLanguageOnChange } } = useHooks();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={appLanguage}
          label="Language"
          onChange={handleLanguageOnChange}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'vi'}>Vietnamese</MenuItem>
          <MenuItem value={'ko'}>Korean</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
