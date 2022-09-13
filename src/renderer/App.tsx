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
  CssBaseline,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { red, green } from '@mui/material/colors';

// Tabs
import TodoListTab from './Tabs/TodoListTab/TodoListTab';
import ClipboardTab from './Tabs/Clipboard/ClipboardTab';

// Components
import Dialog from './Components/Dialog';

// Initial value
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFBC00',
      contrastText: '#60584C',
    },
    secondary: {
      main: '#FFCC00',
      contrastText: '#545045',
    },
    error: {
      main: red[600],
    },
    success: {
      main: green[500],
    },
    action: {
      selected: 'rgba(255,188,0,0.08)',
      hover: 'rgba(255,188,0,0.04)',
      active: 'rgba(255,188,0,0.54)',
      disabled: 'rgba(255,188,0,0.26)',
      disabledBackground: 'rgba(255,188,0,0.12)',
    },
    text: {
      primary: '#60584C',
      secondary: '#545045',
      disabled: '#8a8d8f',
    },
  },
});

const gridRatio = [2, 10];
const tabs = [
  { name: 'To-do List', path: '/', element: <TodoListTab /> },
  { name: 'Clipboard', path: 'clipboard', element: <ClipboardTab /> },
];

// App
export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectTabCode, setSelectTabCode] = useState(0);

  const selectTab = (tabIdx: number) => {
    setSelectTabCode(tabIdx);
  };

  const test = () => {
    setOpenModal(true);
  };

  const getRgba = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r},${g},${b},0.08)`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={gridRatio[0]}>
          <List sx={{ padding: 0 }}>
            {tabs.map((tab, idx) => (
              <Fragment key={tab.name}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={tab.path}
                    onClick={() => selectTab(idx)}
                    selected={idx === selectTabCode}
                  >
                    <ListItemText primary={tab.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Fragment>
            ))}

            {/* preparation */}
            <ListItem disablePadding>
              <ListItemButton onClick={test}>
                <ConstructionIcon color="primary" />
                <ListItemText primary="In preparation" />
              </ListItemButton>
            </ListItem>
            {/* preparation end */}
          </List>
        </Grid>
        <Grid item xs={gridRatio[1]}>
          <Box
            sx={{
              width: 1,
              height: '100vh',
              background: `linear-gradient(to left, white, ${theme.palette.action.selected})`,
            }}
          >
            <Routes>
              {tabs.map((tab, idx) =>
                idx === 0 ? (
                  <Route index element={tab.element} />
                ) : (
                  <Route path={tab.path} element={tab.element} />
                )
              )}
            </Routes>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={openModal}
        setOpen={setOpenModal}
        title="Comming Soon"
        text="Working on this page..."
      />
    </ThemeProvider>
  );
}
