import './App.css'
import UsersList from './components/usersList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import NotFound from './components/404';
import CreateUser from './components/CreateUser';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';



function App() {
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const routes = [
    {
      path: "/users/create",
      name: "Create user",
      element: <CreateUser />
    },
    {
      path: "/users/:id",
      name: "User details",
      element: <UserDetails />
    },
    {
      path: "/users",
      name: "Users List",
      element: <UsersList />
    },
    {
      path: "/",
      name: "Users List",
      element: <UsersList />
    }
  ];
  useEffect(() => {
    console.log("location", window.location);
    const current = routes.find(rt => rt.path === window.location.pathname);
    if (current) setCurrentRoute(current.name);
  }, [])

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Link IT Plus - {currentRoute}
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <nav>
        <Link to="/users">Users</Link>
      </nav> */}
      <br />
      <Routes>
        {routes.map(route => {
          return <Route path={route.path} element={route.element} />
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
