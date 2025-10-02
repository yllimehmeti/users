import { useEffect, useState } from 'react'
import './App.css'
import { UsersApi } from './api/api'
import UsersList from './components/usersList'

function App() {
  useEffect(() => {
    UsersApi.getUsers().then(users => {
      console.log('users', users);
    })
  }, []);
  return (
    <>
      <UsersList />
    </>
  )
}

export default App
