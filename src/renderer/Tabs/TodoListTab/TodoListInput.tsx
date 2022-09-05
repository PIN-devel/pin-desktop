import { Box, Modal, TextField, Typography } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
function TodoListInput({ open, handleClose, setUpdateData }) {
  const addTodo = (todo) => {
    console.log(todo);
    setUpdateData(todo);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const todo = {
        id: Date.now(),
        state: 'todo',
        task: e.target.value.trim(),
      };
      if (todo.task) {
        addTodo(todo);
      }
      handleClose();
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Todo 추가
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Todo 입력"
          fullWidth
          variant="standard"
          onKeyDown={handleKeyPress}
        />
      </Box>
    </Modal>
  );
}

export default TodoListInput;
