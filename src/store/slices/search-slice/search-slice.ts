import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {searchApi} from '../../../tools/client';
import {SearchResultDto} from '../../../api';
import {MyState} from '../../store';
import {AxiosError} from 'axios';
import {performLogout} from '../../logout';

export enum SearchType {
    SONGS,
    ARTISTS,
    ALBUMS
}

export interface FetchSearchResultOptions {
    q: string;
    limit: number;
    offset: number;
    doesLoadMore: boolean;
    searchType?: SearchType
}

export interface SearchSliceState {
    results?: SearchResultDto;
}

const initialState: SearchSliceState = {};

function searchFilterToSearchTypesQueryParams(args: FetchSearchResultOptions) {
    function converType(searchType: SearchType | undefined) {
        if (searchType === undefined) {
            return undefined;
        }
        switch (searchType) {
            case SearchType.ARTISTS:
                return 'artist';
            case SearchType.ALBUMS:
                return 'album';
            case SearchType.SONGS:
                return 'track';
        }
        console.error('could not convert this filter:', searchType);
        return undefined;
    }

    return {
        q: args.q,
        limit: args.limit === 0 ? undefined : args.limit,
        offset: args.offset === 0 ? undefined : args.offset,
        types: converType(args.searchType)
    };
}

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (arg: FetchSearchResultOptions, {dispatch}) => {
    console.log(arg.searchType);
    if (!arg.q.trim()) {
        return undefined;
    }
    try {
        const queryParams = searchFilterToSearchTypesQueryParams(arg);
        const response = await searchApi.searchSearchGet(queryParams.q, queryParams.offset, queryParams.limit, queryParams.types);
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
    reducers: {
        reset: state => {
            return initialState;
        }
    },
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
            const albumResult = [...pastResults?.albumResult ?? [], ...currentResults.albumResult];
            const songResult = [...pastResults?.songResult ?? [], ...currentResults.songResult];
            state.results = {
                artistResult: filterResults(artistResult),
                albumResult: filterResults(albumResult),
                songResult: filterResults(songResult)
            };
        });
    }
});

const selectSelf = (state: MyState) => state;
export const getSearchResults = createSelector(selectSelf, (state) => state.search.results);

export const {reset} = searchSlice.actions;
export default searchSlice.reducer;
