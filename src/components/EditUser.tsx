import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { editUser, fetchUsersIfNeeded } from '../features/userSlice';
import type { User } from '../types';
import { UsersApi } from '../api/api';
import styles from './EditUser.module.css';

import userIcon from './icons/user.svg';
import idCardIcon from './icons/id-card.svg';
import mailIcon from './icons/mail.svg';
import mapPinIcon from './icons/map-pin.svg';
import globeIcon from './icons/globe.svg';
import phoneIcon from './icons/phone.svg';
import buildingIcon from './icons/building.svg';

const iconPath = {
    name: userIcon,
    username: idCardIcon,
    email: mailIcon,
    address: mapPinIcon,
    website: globeIcon,
    phone: phoneIcon,
    company: buildingIcon,
};

const EditUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        UsersApi.getUserById(Number(id)).then(
            user => {
                setUser(user);
                reset(user);
            }
        ).catch(console.error);
    }, [id]);



    useEffect(() => {
        if (!user) {
            dispatch(fetchUsersIfNeeded());
        }
    }, [user, dispatch]);


    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({
        defaultValues: user,
    });

    if (!user) return <div className={styles.editUserContainer}><p>User not found.</p></div>;

    const onSubmit = (data: User) => {
        dispatch(editUser(data));
        setTimeout(() => {
            navigate('/users');
        }, 1000);
    };

    return (
        <div className={styles.editUserContainer}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit User</h2>
            <form className={styles.editUserForm} onSubmit={handleSubmit(onSubmit)}>
                {/* Name (Required) */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">
                        <img src={iconPath.name} alt="Name" className={styles.icon} />
                        Name<span style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input id="name" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
                </div>

                {/* Username */}
                <div className={styles.formGroup}>
                    <label htmlFor="username">
                        <img src={iconPath.username} alt="Username" className={styles.icon} />
                        Username
                    </label>
                    <input id="username" {...register('username')} />
                </div>

                {/* Email (Required) */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">
                        <img src={iconPath.email} alt="Email" className={styles.icon} />
                        Email<span style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input id="email" type="email" {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })} />
                    {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
                </div>

                {/* Address */}
                <fieldset>
                    <legend>
                        <img src={iconPath.address} alt="Address" className={styles.icon} /> Address
                    </legend>
                    <div className={styles.formGroup}>
                        <input placeholder="Street" {...register('address.street')} />
                        <input placeholder="Suite" {...register('address.suite')} />
                        <input placeholder="City" {...register('address.city')} />
                        <input placeholder="Zipcode" {...register('address.zipcode')} />
                        <input placeholder="Lat" {...register('address.geo.lat')} />
                        <input placeholder="Lng" {...register('address.geo.lng')} />
                    </div>
                </fieldset>

                {/* Phone */}
                <div className={styles.formGroup}>
                    <label htmlFor="phone">
                        <img src={iconPath.phone} alt="Phone" className={styles.icon} />
                        Phone
                    </label>
                    <input id="phone" {...register('phone')} />
                </div>

                {/* Website */}
                <div className={styles.formGroup}>
                    <label htmlFor="website">
                        <img src={iconPath.website} alt="Website" className={styles.icon} />
                        Website
                    </label>
                    <input id="website" {...register('website')} />
                </div>

                {/* Company */}
                <fieldset>
                    <legend>
                        <img src={iconPath.company} alt="Company" className={styles.icon} /> Company
                    </legend>
                    <div className={styles.formGroup}>
                        <input placeholder="Name" {...register('company.name')} />
                        <input placeholder="Catch Phrase" {...register('company.catchPhrase')} />
                        <input placeholder="BS" {...register('company.bs')} />
                    </div>
                </fieldset>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUser;