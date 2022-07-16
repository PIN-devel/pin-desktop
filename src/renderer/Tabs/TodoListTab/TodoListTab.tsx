import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { TodoListCard, ITodo } from './TodoListCard';

export default function TodoListTab() {
  const cardStateList = [
    { code: 0, title: 'To do' },
    { code: 1, title: 'Doing' },
    { code: 2, title: 'Done' },
  ];
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.once('read-save', (result: any) => {
      setTodoList(JSON.parse(JSON.parse(result)));
    });
    window.electron.ipcRenderer.readSave();
  }, []);

  useEffect(() => {
    if (todoList.length) {
      window.electron.ipcRenderer.once('update-save', (result) => {
        console.log(result);
      });
      window.electron.ipcRenderer.updateSave(todoList);
    }
  }, [todoList]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs>
        <TodoListCard
          todoList={todoList}
          setTodoList={setTodoList}
          cardState={cardStateList[0]}
        />
      </Grid>

      <Grid item xs>
        <TodoListCard
          todoList={todoList}
          setTodoList={setTodoList}
          cardState={cardStateList[1]}
        />
      </Grid>
      <Grid item xs>
        <TodoListCard
          todoList={todoList}
          setTodoList={setTodoList}
          cardState={cardStateList[2]}
        />
      </Grid>
    </Grid>
  );
}
