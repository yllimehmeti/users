import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { User, UsersState } from '../types';

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
    lastLoadedAt: null
};

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        return (await response.json()) as User[];
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.list = [action.payload].concat(state.list);
        },
        editUser: (state, action: PayloadAction<User>) => {
            const index = state.list.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        },
        removeUser: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(u => u.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;

                // Build an index of current users (keep local additions)
                const byId = new Map<string | number, User>();
                for (const u of state.list) byId.set(u.id, u);

                // Upsert server users (server fields overwrite local ones with same id)
                for (const u of action.payload) {
                    const existing = byId.get(u.id);
                    byId.set(u.id, { ...(existing ?? {}), ...u });
                }

                state.list = Array.from(byId.values());
                state.lastLoadedAt = Date.now();
            })

    },
});

export const { addUser, editUser, removeUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.list;
export const selectUserById = (id: number) => (state: RootState) =>
    state.users.list.find(user => user.id == id);

export default usersSlice.reducer;