import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const SearchBar = (props) => {
    const { onSearch, onOrderChange,searchText,displayOrder,onAddHandler } = props;
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={11.5}>
        <TextField
          fullWidth
          placeholder="Search..."
          sx={{ width: '100%',marginY:5 }}
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={0.5}>
        <ButtonGroup>
          <IconButton onClick={onOrderChange}>
            {displayOrder ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
 