import { type User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class UsersApi {
    static async getUsers(): Promise<User[]> {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    }

    static async getUserById(id: number): Promise<User> {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
    }
}