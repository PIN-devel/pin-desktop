import { Dispatch, SetStateAction } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

export interface ITodo {
  id: number;
  text: string;
  state: number;
}

interface ICardState {
  code: number;
  title: string;
}

interface IProps {
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
  cardState: ICardState;
}

export function TodoListCard({ todoList, setTodoList, cardState }: IProps) {
  const handleChange = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, state: todo.state + 1 } : todo
      )
    );
  };

  return (
    <Card>
      <CardHeader title={cardState.title} />
      <CardActions>
        <FormGroup>
          {todoList.map(
            (todo) =>
              todo.state === cardState.code && (
                <FormControlLabel
                  key={todo.id}
                  control={
                    <Checkbox
                      onChange={() => {
                        handleChange(todo.id);
                      }}
                    />
                  }
                  label={todo.text}
                />
              )
          )}
        </FormGroup>
      </CardActions>
    </Card>
  );
}
