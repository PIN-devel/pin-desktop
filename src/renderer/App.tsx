import { Fragment } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import DummyTab from './Tabs/DummyTab';
import TodoListTab from './Tabs/TodoListTab/TodoListTab';

export default function App() {
  const gridRatio = [2, 10];
  const tabs = [
    { name: 'To-do List', path: '/' },
    { name: 'Example1', path: '/dd' },
    { name: 'Example2', path: '/dd' },
  ];
  return (
    <Grid container>
      <Grid item xs={gridRatio[0]}>
        <List>
          {tabs.map((tab) => (
            <Fragment key={tab.name}>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to={tab.path}>
                  <ListItemText primary={tab.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Grid>

      <Grid item xs={gridRatio[1]}>
        <Routes>
          <Route index element={<TodoListTab />} />
          <Route path="dd" element={<DummyTab />} />
        </Routes>
      </Grid>
    </Grid>
  );
}
