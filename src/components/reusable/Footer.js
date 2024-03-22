import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
<Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 2,
        marginTop:5
      }}
    >
      <Typography variant='body1'>
        &copy; 2024 Website for Migratech.
      </Typography>
    </Box>
  );
};

export default Footer;