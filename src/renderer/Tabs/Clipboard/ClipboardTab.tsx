import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Grid, TextField, Zoom } from '@mui/material';
import {
  CopyAll as CopyAllIcon,
  ClearAll as ClearAllIcon,
} from '@mui/icons-material';

export default function ClipboardTab() {
  const [clipboardText, setClipboardText] = useState('');
  const [onToastAlert, setOnToastAlert] = useState(false);

  const onFocus = () => {
    navigator.clipboard.readText().then((text) => setClipboardText(text));
  };

  const copy = () => {
    navigator.clipboard.writeText(clipboardText).then(setOnToastAlert(true));
  };

  const clear = () => {
    navigator.clipboard.writeText('');
    setClipboardText('');
  };

  const handleKeyPress = useCallback(
    (e) => {
      console.log(e.key);
      if (e.key === 'Enter') {
        copy();
      }
      if (e.key === 'Delete') {
        clear();
      }
    },
    [copy]
  );

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onFocus, handleKeyPress]);

  useEffect(() => {
    if (onToastAlert) {
      setTimeout(() => {
        setOnToastAlert(false);
      }, 1500);
    }
  }, [onToastAlert]);

  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      <Grid item xs={10}>
        <TextField
          id="outlined-multiline-static"
          label="Ctrl + C"
          multiline
          rows={26}
          sx={{ width: 1, backgroundColor: 'white' }}
          value={clipboardText}
          onChange={(e) => setClipboardText(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          onClick={copy}
          color="success"
          sx={{ width: 1, mb: 1, backgroundColor: 'white' }}
          startIcon={<CopyAllIcon />}
        >
          copy
        </Button>
        <Button
          variant="outlined"
          onClick={clear}
          color="error"
          sx={{ width: 1, backgroundColor: 'white' }}
          startIcon={<ClearAllIcon />}
        >
          clear
        </Button>
      </Grid>
      <Zoom in={onToastAlert}>
        <Alert
          severity="success"
          color="success"
          style={{
            position: 'fixed',
            top: 0,
            left: 435,
            zIndex: 99,
          }}
        >
          Copy Success!
        </Alert>
      </Zoom>
    </Grid>
  );
}
