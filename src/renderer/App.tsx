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
  const test = () => {
    console.log('test');
    window.electron.ipcRenderer.once('update-save', (result) => {
      console.log(result);
    });
    window.electron.ipcRenderer.updateSave([
      { id: 1, text: '할일1', state: 0 },
      { id: 2, text: '할일2', state: 1 },
      { id: 3, text: '할일3', state: 0 },
    ]);
  };

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

          {/* test */}
          <ListItem disablePadding>
            <ListItemButton onClick={test}>
              <ListItemText primary="test" />
            </ListItemButton>
          </ListItem>
          {/* test end */}
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
