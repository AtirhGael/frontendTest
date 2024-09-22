import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get<User[]>('/users');
  return response.data;
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
  const response = await api.get<User>(`/api/users/${id}`);
  return response.data;
});

// Create a new user
export const createUser = createAsyncThunk('users/createUser', async (userData: Partial<User>) => {
  const response = await api.post<User>('/api/users', userData);
  return response.data;
});

// Update user by ID
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }: { id: string, userData: Partial<User> }) => {
  const response = await api.patch<User>(`/api/users/${id}`, userData);
  return response.data;
});

// Delete user by ID
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await api.delete(`/api/users/${id}`);
  return id;
});

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user by ID';
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })

      // Update user by ID
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })

      // Delete user by ID
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

export default userSlice.reducer;
