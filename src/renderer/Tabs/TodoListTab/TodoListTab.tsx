import { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import TodoListCard from './TodoListCard';

export default function TodoListTab() {
  const cardStateList = [
    { code: 0, title: 'To do' },
    { code: 1, title: 'Doing' },
    { code: 2, title: 'Done' },
  ];
  const [todoList, setTodoList] = useState([
    { id: 1, text: '할일1', state: 0 },
    { id: 2, text: '할일2', state: 1 },
    { id: 3, text: '할일3', state: 0 },
  ]);

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
