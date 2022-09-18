import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { lightFormat } from 'date-fns';

import { ITodo } from 'renderer/Interface/todoInterface';

interface IProps {
  cardData: ITodo[];
  title: string;
  setUpdateData: Dispatch<SetStateAction<ITodo>>;
  deleteTodo: (id: string) => void;
  // cardState: ICardState;
}

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

export default function TodoListCard({
  cardData,
  title,
  setUpdateData,
  deleteTodo,
}: IProps) {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [detail, setDetail] = useState({});
  const updateState = (state: string) => {
    if (state === 'todo') return 'doing';
    return 'done';
  };

  const undoState = (state: string) => {
    if (state === 'done') return 'doing';
    return 'todo';
  };

  const handleClick = (data) => {
    console.log(data);
    if (data.state !== 'done') {
      setUpdateData({
        ...data,
        state: updateState(data.state),
        updatedAt: Date.now(),
      });
    } else {
      setDetail(data);
      setOpenDetail(true);
    }
  };

  const handleRightClick = (e, data) => {
    e.preventDefault();
    console.log(data);
    if (data.state !== 'todo') {
      setUpdateData({ ...data, state: undoState(data.state) });
    } else {
      deleteTodo(data.id);
    }
  };

  return (
    <>
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

      <Modal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {detail.task}
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`시작: ${lightFormat(
                  new Date(detail.id ?? 0),
                  'yy년MM월dd일 H시m분'
                )}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={`종료: ${lightFormat(
                  new Date(detail.updatedAt ?? 0),
                  'yy년MM월dd일 H시m분'
                )}`}
              />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  );
}
