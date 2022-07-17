import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { ITodo } from 'renderer/Interface/todoInterface';

import TodoListCard from 'renderer/Tabs/TodoListTab/TodoListCard';

export default function TodoListTab() {
  const [todoData, setTodoData] = useState<{ [key: string]: ITodo }>({});

  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [doingList, setDoingList] = useState<ITodo[]>([]);
  const [doneList, setDoneList] = useState<ITodo[]>([]);

  const [updateData, setUpdateData] = useState<ITodo>({});

  useEffect(() => {
    window.electron.ipcRenderer.once('read-save', (result: any) => {
      // console.log(result);
      // console.log(JSON.parse(result));
      // console.log(JSON.parse(JSON.parse(result)));
      // setTodoData(JSON.parse(result));
      setTodoData(JSON.parse(result));
    });
    window.electron.ipcRenderer.readSave();
  }, []);

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

  return (
    <Grid container spacing={0.5}>
      <Grid item xs>
        <TodoListCard
          cardData={todoList}
          title="Todo"
          setUpdateData={setUpdateData}
        />
      </Grid>
      <Grid item xs>
        <TodoListCard
          cardData={doingList}
          title="Doing"
          setUpdateData={setUpdateData}
        />
      </Grid>
      <Grid item xs>
        <TodoListCard
          cardData={doneList}
          title="Done"
          setUpdateData={setUpdateData}
        />
      </Grid>
    </Grid>
  );
}
