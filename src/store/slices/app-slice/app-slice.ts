import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetechCurrentUser} from '../current-user/current-user-slice';
import {fetchLibrary} from '../library-slice/library-slice';
import {MyState} from '../../store';

export interface AppSliceState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'loggedOut';
}

export const fetchInitialAppData = createAsyncThunk('app/fetchInitialAppData', async (arg, {dispatch}) => {
    await Promise.all([
        dispatch(fetechCurrentUser()).unwrap(),
        dispatch(fetchLibrary()).unwrap()
    ]);
});

const initialState: AppSliceState = {
    status: 'idle'
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchInitialAppData.fulfilled, state => {
            state.status = 'succeeded';
        });
        builder.addCase(fetchInitialAppData.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(fetchInitialAppData.rejected, state => {
            state.status = 'failed';
        });
    }
});

export const selectAppStatus = (state: MyState) => state.app.status;

export default appSlice.reducer;
