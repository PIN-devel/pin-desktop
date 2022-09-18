import { useCallback, useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { ITodo } from 'renderer/Interface/todoInterface';

import TodoListCard from 'renderer/Tabs/TodoListTab/TodoListCard';
import TodoListInput from './TodoListInput';
import TodoListHeader from './TodoListHeader';
import DoneList from './DoneList';

export default function TodoListTab() {
  const [todoData, setTodoData] = useState<{ [key: string]: ITodo }>({});

  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [doingList, setDoingList] = useState<ITodo[]>([]);
  const [doneList, setDoneList] = useState<ITodo[]>([]);

  const [updateData, setUpdateData] = useState<ITodo>({});

  const [progress, setProgress] = useState(0);

  // Modal
  const [openInputModal, setOpenInputModal] = useState<boolean>(false);
  const [openDoneListModal, setOpenDoneListModal] = useState<boolean>(false);

  const handleModal = (modalName, isOpen) => {
    switch (modalName) {
      case 'Input':
        setOpenInputModal(isOpen);
        break;
      case 'DoneList':
        setOpenDoneListModal(isOpen);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = useCallback((e) => {
    // console.log(e.key);
    if (e.key === ' ') {
      handleModal('Input', true);
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

  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      <TodoListHeader handleModal={handleModal} progress={progress} />

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
      {/* modal */}
      <TodoListInput
        open={openInputModal}
        handleClose={() => handleModal('Input', false)}
        setUpdateData={setUpdateData}
      />
      <DoneList
        open={openDoneListModal}
        handleClose={() => handleModal('DoneList', false)}
      />
      {/* modal end */}
    </Grid>
  );
}
