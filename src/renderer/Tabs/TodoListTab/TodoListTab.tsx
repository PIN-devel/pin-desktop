import { useCallback, useEffect, useState } from 'react';

import { Grid, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { ITodo } from 'renderer/Interface/todoInterface';

import TodoListCard from 'renderer/Tabs/TodoListTab/TodoListCard';
import TodoListInput from './TodoListInput';

export default function TodoListTab() {
  const [todoData, setTodoData] = useState<{ [key: string]: ITodo }>({});

  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [doingList, setDoingList] = useState<ITodo[]>([]);
  const [doneList, setDoneList] = useState<ITodo[]>([]);

  const [updateData, setUpdateData] = useState<ITodo>({});

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

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Fab color="primary" aria-label="add" size="small" onClick={openModal}>
          <AddIcon />
        </Fab>
      </Grid>
      <Grid item xs>
        <TodoListCard
          cardData={todoList}
          title="Todo"
          setUpdateData={setUpdateData}
          deleteTodo={deleteTodo}
        />
      </Grid>
      <Grid item xs>
        <TodoListCard
          cardData={doingList}
          title="Doing"
          setUpdateData={setUpdateData}
          deleteTodo={deleteTodo}
        />
      </Grid>
      <Grid item xs>
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
