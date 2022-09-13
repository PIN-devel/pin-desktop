import { Box, Typography } from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function License() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 1,
        bottom: 0,
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        zIndex: 9,
      }}
    >
      <span>
        <Typography variant="caption" display="block" gutterBottom>
          MIT License https://github.com/PIN-devel/pin-desktop
        </Typography>
      </span>
    </Box>
  );
}
