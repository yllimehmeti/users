import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from './userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserForm = ({ user }) => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        return errors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const result = await dispatch(editUser({ id: user.id, userData: formData })).unwrap();
            toast.success('User updated successfully!');
        } catch (err) {
            toast.error(error?.message || 'Failed to update user');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full p-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        placeholder="Enter name"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full p-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        placeholder="Enter email"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed`}
                >
                    {status === 'loading' ? 'Updating...' : 'Update User'}
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default EditUserForm;