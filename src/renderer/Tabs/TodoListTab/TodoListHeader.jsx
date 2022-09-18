import { Box, Fab, Grid, LinearProgress, Typography } from '@mui/material';
import {
  PlaylistAdd as PlaylistAddIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  PlaylistRemove as PlaylistRemoveIcon,
} from '@mui/icons-material';
import React from 'react';

export default function TodoListHeader({ handleModal, progress }) {
  return (
    <>
      <Grid
        item
        xs={3}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <Fab
          color="info"
          aria-label="add"
          size="small"
          onClick={() => handleModal('Input', true)}
        >
          <PlaylistAddIcon />
        </Fab>
        <Fab color="error" aria-label="add" size="small" disabled>
          <PlaylistRemoveIcon />
        </Fab>
        <Fab
          color="success"
          aria-label="add"
          size="small"
          onClick={() => handleModal('DoneList', true)}
        >
          <PlaylistAddCheckIcon />
        </Fab>
      </Grid>
      <Grid item xs={9}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              progress
            )}%`}</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="secondary"
              sx={{ height: 15, borderRadius: 5 }}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
}
