import React from 'react';
import { useParams } from 'react-router-dom';
import { UsersApi } from '../api/api';
import type { User } from '../types';

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log("id:", id);
    const [user, setUser] = React.useState<User>();
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        UsersApi.getUserById(Number(id))
            .then(userRes => setUser(userRes))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);
    console.log("user:", user);

    if (!user) return <p>User not found.</p>;
    if (loading) return <p>Loading user details...</p>;
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Company: {user.company.name}</p>
            <p>Address: {user.address.street}, {user.address.city}</p>
        </div>
    );
};

export default UserDetails;