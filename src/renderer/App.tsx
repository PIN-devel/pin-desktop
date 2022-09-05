import { Fragment, useState } from 'react';
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
import Dialog from './components/Dialog';
import Portal from './components/Portal';

export default function App() {
  const gridRatio = [2, 10];
  const tabs = [{ name: 'To-do List', path: '/' }];
  const [openModal, setOpenModal] = useState(false);

  const test = () => {
    console.dir(document.getElementById('portal'));
    setOpenModal(true);
    // console.log('test');
    // window.electron.ipcRenderer.once('update-save', (result) => {
    //   console.log(result);
    // });
    // window.electron.ipcRenderer.updateSave([
    //   { id: 1, text: '할일1', state: 0 },
    //   { id: 2, text: '할일2', state: 1 },
    //   { id: 3, text: '할일3', state: 0 },
    // ]);
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

            {/* test */}
            <ListItem disablePadding>
              <ListItemButton onClick={test}>
                <ListItemText primary="In preparation" />
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
      {/* <Portal> */}
      <Dialog
        open={openModal}
        setOpen={setOpenModal}
        title="Comming Soon"
        text="Working on this page..."
      />
      {/* </Portal> */}
    </>
  );
}
