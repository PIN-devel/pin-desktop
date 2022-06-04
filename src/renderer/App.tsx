import { Routes, Route, NavLink } from 'react-router-dom';

import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import TodoListTab from './Tabs/TodoListTab/TodoListTab';
import DummyTab from './Tabs/DummyTab';

export default function App() {
  const tabs = [
    { name: 'To-do List', path: '/' },
    { name: 'Example1', path: '/dd' },
    { name: 'Example2', path: '/dd' },
  ];
  return (
    <Container
      fixed
      style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}
    >
      <Grid container>
        <Grid item xs={3}>
          <List>
            {tabs.map((tab) => (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to={tab.path}>
                    <ListItemText primary={tab.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Grid>

        <Grid item xs={9}>
          <Routes>
            <Route index element={<TodoListTab />} />
            <Route path="dd" element={<DummyTab />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
}
