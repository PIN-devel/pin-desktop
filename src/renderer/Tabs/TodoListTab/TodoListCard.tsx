import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import { ITodo } from 'renderer/Interface/todoInterface';
import { ContentPasteOffSharp } from '@mui/icons-material';

interface IProps {
  cardData: ITodo[];
  title: string;
  setUpdateData: Dispatch<SetStateAction<ITodo>>;
  // cardState: ICardState;
}

export default function TodoListCard({
  cardData,
  title,
  setUpdateData,
}: IProps) {
  const updateState = (state: string) => {
    if (state === 'todo') {
      return 'doing';
    }
    return 'done';
  };
  const handleChange = (data: ITodo) => {
    console.log('change');
    console.log(data);
    // setCardData(
    //   cardData.map((data, id) =>
    //     id === idx ? { ...data, state: updateState(data.state) } : data
    //   )
    // );
    setUpdateData({ ...data, state: updateState(data.state) });
  };
  // useEffect(() => {
  //   console.log(title);
  //   console.log(cardData);
  // }, [cardData]);

  return (
    <Card>
      <CardHeader title={title} />
      <CardActions>
        <FormGroup>
          {!!cardData.length &&
            cardData.map((data) => (
              <FormControlLabel
                key={data.id}
                control={
                  <Checkbox
                    onChange={() => {
                      handleChange(data);
                    }}
                  />
                }
                label={data.task}
              />
            ))}
        </FormGroup>
      </CardActions>
    </Card>
  );
}
