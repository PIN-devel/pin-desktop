// React
import { Fragment, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

// MUI
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

// Tabs
import TodoListTab from './Tabs/TodoListTab/TodoListTab';
import ClipboardTab from './Tabs/Clipboard/ClipboardTab';

// Components
import Dialog from './components/Dialog';

// App
export default function App() {
  const gridRatio = [2, 10];
  const tabs = [
    { name: 'To-do List', path: '/', element: <TodoListTab /> },
    { name: 'Clipboard', path: 'clipboard', element: <ClipboardTab /> },
  ];
  const [openModal, setOpenModal] = useState(false);

  const test = () => {
    setOpenModal(true);
  };

  return (
    <>
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

            {/* preparation */}
            <ListItem disablePadding>
              <ListItemButton onClick={test}>
                <ListItemText primary="In preparation" />
              </ListItemButton>
            </ListItem>
            {/* preparation end */}
          </List>
        </Grid>

        <Grid item xs={gridRatio[1]}>
          <Routes>
            {tabs.map((tab, idx) =>
              idx === 0 ? (
                <Route index element={tab.element} />
              ) : (
                <Route path={tab.path} element={tab.element} />
              )
            )}
          </Routes>
        </Grid>
      </Grid>

      <Dialog
        open={openModal}
        setOpen={setOpenModal}
        title="Comming Soon"
        text="Working on this page..."
      />
    </>
  );
}
