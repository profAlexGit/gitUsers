import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {userAPI} from "../../API/user";

export interface IUser {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
    email?: string;
    name?: string;
    blog?: string;
}

export interface UserState {
    users: IUser[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    users: [],
    status: 'idle',
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await userAPI.getUsers()
    }
)

export const fetchUserByLogin = createAsyncThunk(
    'users/fetchByLogin',
    async (login: string) => {
        return await userAPI.getUsersByLogin(login)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, payload: PayloadAction<IUser>) => {
            const userIdx = state.users.findIndex((u) => u.id === payload.payload.id);
            if (userIdx >= 0) {
                state.users[userIdx] = payload.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        builder.addCase(fetchUserByLogin.fulfilled, () => {

        })
    }
})

export const {updateUser} = userSlice.actions;

export const getUsers = (state: RootState) => state.user.users;

export default userSlice.reducer
