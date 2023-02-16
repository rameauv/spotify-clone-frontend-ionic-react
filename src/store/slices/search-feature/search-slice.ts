import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {searchApi} from '../../../tools/client';
import {SearchResultDto} from '../../../api';
import {MyState} from '../../store';
import {AxiosError} from 'axios';
import {performLogout} from '../../logout';

export interface FetchSearchResultArgs {
    q: string;
    limit: number;
    offset: number;
    doesLoadMore: boolean
}

export interface SearchSliceState {
    results?: SearchResultDto;
}

const initialState: SearchSliceState = {};

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (arg: FetchSearchResultArgs, {dispatch}) => {
    if (!arg.q.trim()) {
        return undefined;
    }
    try {
        const response = await searchApi.searchSearchGet(arg.q, arg.offset, arg.limit);
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

const filterResults = <T extends { id: string }>(results: T[]) => Array.from(new Map(results.map(value => [value.id, value])).values());

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            if (!action.meta.arg.doesLoadMore) {
                state.results = action.payload;
                return;
            }
            const pastResults = state.results;
            const currentResults = action.payload;
            if (!currentResults) {
                return;
            }
            const artistResult = [...pastResults?.artistResult ?? [], ...currentResults.artistResult];
            const releaseResults = [...pastResults?.releaseResults ?? [], ...currentResults.releaseResults];
            const songResult = [...pastResults?.songResult ?? [], ...currentResults.songResult];
            state.results = {
                artistResult: filterResults(artistResult),
                releaseResults: filterResults(releaseResults),
                songResult: filterResults(songResult)
            };
        });
    }
});

const selectSelf = (state: MyState) => state;
export const getSearchResults = createSelector(selectSelf, (state) => state.search.results);

export default searchSlice.reducer;
