import { useCallback, useEffect, useState } from 'react';

import { Grid, Fab, Box, LinearProgress, Typography } from '@mui/material';
import {
  Add as AddIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';

import { ITodo } from 'renderer/Interface/todoInterface';

import TodoListCard from 'renderer/Tabs/TodoListTab/TodoListCard';
import TodoListInput from './TodoListInput';

export default function TodoListTab() {
  const [todoData, setTodoData] = useState<{ [key: string]: ITodo }>({});

  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [doingList, setDoingList] = useState<ITodo[]>([]);
  const [doneList, setDoneList] = useState<ITodo[]>([]);

  const [updateData, setUpdateData] = useState<ITodo>({});

  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleKeyPress = useCallback((e) => {
    // console.log(e.key);
    if (e.key === ' ') {
      openModal();
    }
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.once('read-save', (result: any) => {
      setTodoData(JSON.parse(result));
    });
    window.electron.ipcRenderer.readSave();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    console.log(todoData);
    if (Object.keys(todoData).length) {
      const tmpTodoList: Array<ITodo> = [];
      const tmpDoingList: Array<ITodo> = [];
      const tmpDoneList: Array<ITodo> = [];

      Object.keys(todoData).forEach((key: string) => {
        if (todoData[key].state === 'todo') {
          tmpTodoList.push(todoData[key]);
        } else if (todoData[key].state === 'doing') {
          tmpDoingList.push(todoData[key]);
        } else {
          tmpDoneList.push(todoData[key]);
        }
        setTodoList(tmpTodoList);
        setDoingList(tmpDoingList);
        setDoneList(tmpDoneList);
      });
      window.electron.ipcRenderer.once('update-save', (result) => {
        console.log(result);
      });
      window.electron.ipcRenderer.updateSave(todoData);
      setProgress((tmpDoneList.length / Object.keys(todoData).length) * 100);
    }
  }, [todoData]);

  useEffect(() => {
    if (Object.keys(updateData).length) {
      setTodoData((prev) => {
        return { ...prev, [updateData.id]: updateData };
      });
    }
  }, [updateData]);

  const deleteTodo = (id) => {
    setTodoData((prev) => {
      const tmp = { ...prev };
      delete tmp[id];
      return tmp;
    });
  };

  const handleDelete = () => {
    console.log('click handleDelete');
  };

  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      <Grid item xs={1}>
        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          onClick={openModal}
        >
          <AddIcon />
        </Fab>
        {/* <Fab color="error" aria-label="add" size="small" onClick={handleDelete}>
          <DeleteForeverIcon />
        </Fab> */}
      </Grid>
      <Grid item xs={11}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      <Grid item xs={4}>
        <TodoListCard
          cardData={todoList}
          title="Todo"
          setUpdateData={setUpdateData}
          deleteTodo={deleteTodo}
        />
      </Grid>
      <Grid item xs={4}>
        <TodoListCard
          cardData={doingList}
          title="Doing"
          setUpdateData={setUpdateData}
          deleteTodo={deleteTodo}
        />
      </Grid>
      <Grid item xs={4}>
        <TodoListCard
          cardData={doneList}
          title="Done"
          setUpdateData={setUpdateData}
          deleteTodo={deleteTodo}
        />
      </Grid>
      <TodoListInput
        open={open}
        handleClose={closeModal}
        setUpdateData={setUpdateData}
      />
    </Grid>
  );
}
