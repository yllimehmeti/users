import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, selectUsers } from '../features/userSlice';

const UsersList: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const loading = useAppSelector(state => state.users.loading);
    const error = useAppSelector(state => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> ({user.email})<br />
                        <small>{user.company.name} - {user.address.city}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
