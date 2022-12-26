import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {userApi} from "../../tools/client";
import {MyState} from "../../store/store";


export interface CurrentUser {
    id: string,
    userName: string,
    name: string
}

export interface CurrentUserSliiceState extends EntityState<any> {
    data: CurrentUser | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}

const postsAdapter = createEntityAdapter({})

const initialState: CurrentUserSliiceState = postsAdapter.getInitialState({
    data: undefined,
    status: "idle",
    error: undefined
})

export const fetechCurrentUser = createAsyncThunk('currentUser/featch', async (arg, thunkAPI) => {
    const response = await userApi.userCurrentUserGet();
    return response.data.result;
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
            state.data = {
                id: action.payload?.id,
                userName: action.payload.username,
                name: action.payload.name
            };
            state.status = 'succeeded';
        });
        builder.addCase(fetechCurrentUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'failed';
        });
        builder.addCase(fetechCurrentUser.pending, (state, action) => {
            state.status = 'loading';
        });
    }
});

export const selectCurrentUser = (state: MyState) => state.currentUser.data;
export const selectCurrentUserStatus = (state: MyState) => state.currentUser.status;
export const selectCurrentUserError = (state: MyState) => state.currentUser.error;

export const {resetCurrentUser} = currentUserSlide.actions;

export default currentUserSlide.reducer;