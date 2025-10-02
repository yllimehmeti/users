import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks';
import { addUser } from '../features/userSlice';
import type { CreateUserFormValues, User } from '../types';
import { useNavigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormValues>();

    const onSubmit = (data: CreateUserFormValues) => {
        const newUser: User = {
            id: new Date().getTime(), // Simple unique ID
            name: data.name,
            username: '',
            email: data.email,
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: { lat: '', lng: '' },
            },
            phone: '',
            website: '',
            company: { name: '', catchPhrase: '', bs: '' },
        };
        dispatch(addUser(newUser));
        navigate('/users');
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default CreateUser;