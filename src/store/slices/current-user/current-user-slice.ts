import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../../tools/client";
import {MyState} from "../../store";
import {AxiosError} from "axios";


export interface CurrentUser {
    id: string,
    userName: string,
    name: string
}

export interface CurrentUserSliiceState {
    data?: CurrentUser;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}


const initialState: CurrentUserSliiceState = {
    data: undefined,
    status: "idle",
    error: undefined
};

export const fetechCurrentUser = createAsyncThunk('currentUser/featch', async (arg, thunkAPI) => {
    try {
        const response = await userApi.userCurrentUserGet();
        return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            return undefined;
        }
        throw e;
    }
});

export const setCurrnetUseProfileTitle = createAsyncThunk('currentUser/setName', async (arg: { profileTitle: string }, thunkAPI) => {
    await userApi.userNamePatch({
        name: arg.profileTitle
    });
});

const currentUserSlide = createSlice({
    name: 'current-user',
    initialState,
    reducers: {
        resetCurrentUser: state => {
            state.status = initialState.status;
            state.data = undefined;
            state.error = undefined;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetechCurrentUser.fulfilled, (state, action) => {
            const user = action.payload;
            if (user) {
                state.data = {
                    id: user.id,
                    userName: user.username,
                    name: user.name
                };
            } else {
                state.data = undefined;
            }
            state.status = 'succeeded';
        });
        builder.addCase(fetechCurrentUser.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error.message;
            state.status = 'failed';
        });
        builder.addCase(fetechCurrentUser.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(setCurrnetUseProfileTitle.fulfilled, (state, action) => {
            if (state.data) {
                state.data.name = action.meta.arg.profileTitle;
            } else {
                console.log('trying to set the profile name while the current user\'s data is not set');
            }
        });
    }
});

export const selectCurrentUser = (state: MyState) => state.currentUser.data;
export const selectCurrentUserStatus = (state: MyState) => state.currentUser.status;
export const selectCurrentUserError = (state: MyState) => state.currentUser.error;

export const {resetCurrentUser} = currentUserSlide.actions;

export default currentUserSlide.reducer;
