import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TextField, Zoom } from '@mui/material';

export default function ClipboardTab() {
  const [clipboardText, setClipboardText] = useState('');
  const [onToastAlert, setOnToastAlert] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(clipboardText).then(setOnToastAlert(true));
  };

  const onFocus = () => {
    navigator.clipboard.readText().then((text) => setClipboardText(text));
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        copy();
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
    <>
      <TextField
        id="outlined-multiline-static"
        label="Ctrl + C"
        multiline
        rows={26}
        sx={{ m: 1, width: 0.8 }}
        value={clipboardText}
        onChange={(e) => setClipboardText(e.target.value)}
      />
      <button onClick={copy}>copy</button>
      <Zoom in={onToastAlert}>
        <Alert
          severity="success"
          color="info"
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
    </>
  );
}
