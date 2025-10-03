import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, removeUser, selectUsers } from '../features/userSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const UsersList: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const loading = useAppSelector(state => state.users.loading);
    const error = useAppSelector(state => state.users.error);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const [search, setSearch] = useState<string>("");
    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h2>User List</h2>
            <TextField style={{ width: "100%" }} id="search" label="Search" variant="outlined" onChange={(event) => {
                setSearch(event.target.value);
            }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.filter((usr => {
                            if (search) {
                                return usr.name.toLowerCase().includes(search) || usr.email.toLowerCase().includes(search)
                            }
                            return true;
                        })).map(user => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                                <TableCell>{user.address.city}</TableCell>
                                <TableCell>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Button onClick={() => {
                                            navigate(`/users/${user.id}`);
                                        }} variant="outlined" endIcon={<ChevronRightIcon />}>
                                            Details
                                        </Button>
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {
                                            dispatch(removeUser(user.id));
                                        }}>Delete</Button>
                                        <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> ({user.email})<br />
                        <small>{user.company.name} - {user.address.city}</small>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default UsersList;
