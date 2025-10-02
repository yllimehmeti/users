import './App.css'
import UsersList from './components/usersList'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import NotFound from './components/404';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/" element={<UsersList />} />
        <Route path="/" element={<UsersList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
