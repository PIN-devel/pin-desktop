import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { ITodo } from 'renderer/Interface/todoInterface';

interface IProps {
  cardData: ITodo[];
  title: string;
  setUpdateData: Dispatch<SetStateAction<ITodo>>;
  deleteTodo: (id: string) => void;
  // cardState: ICardState;
}

export default function TodoListCard({
  cardData,
  title,
  setUpdateData,
  deleteTodo,
}: IProps) {
  const updateState = (state: string) => {
    if (state === 'todo') {
      return 'doing';
    }
    return 'done';
  };

  const undoState = (state: string) => {
    if (state === 'done') {
      return 'doing';
    }
    return 'todo';
  };

  const handleClick = (data) => {
    console.log(data);
    setUpdateData({ ...data, state: updateState(data.state) });
  };

  const handleRightClick = (e, data) => {
    console.log(data);
    e.preventDefault();
    if (data.state !== 'todo') {
      setUpdateData({ ...data, state: undoState(data.state) });
    } else {
      deleteTodo(data.id);
    }
  };

  return (
    <Card>
      <CardHeader title={title} />
      <CardActions>
        <List sx={{ width: 1 }}>
          {cardData.map((data) => (
            <ListItem
              button
              divider
              key={data.id}
              onClick={() => handleClick(data)}
              onContextMenu={(e) => handleRightClick(e, data)}
            >
              <ListItemText primary={data.task} />
            </ListItem>
          ))}
        </List>
      </CardActions>
    </Card>
  );
}
