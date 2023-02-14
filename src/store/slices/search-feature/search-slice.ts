import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {searchApi} from '../../../tools/client';
import {SearchResultDto} from '../../../api';
import {MyState} from '../../store';
import {AxiosError} from 'axios';
import {performLogout} from '../../logout';


export interface SearchSliceState {
    results?: SearchResultDto;
}

const initialState: SearchSliceState = {};


export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (arg: { q: string }, {dispatch}) => {
    if (!arg.q.trim()) {
        return undefined;
    }
    try {
        const response = await searchApi.searchSearchGet(arg.q);
        return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            console.log(e.response);
            if (e.response?.status === 401) {
                dispatch(performLogout());
            }
        }
        throw e;
    }
}, {
    condition: (userId, {getState}) => {
        const {currentUser} = getState() as MyState;
        return !!currentUser.data;
    }
});


const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = action.payload;
        });
    }
});

const selectSelf = (state: MyState) => state;
export const getSearchResults = createSelector(selectSelf, (state) => state.search.results);

export default searchSlice.reducer;
