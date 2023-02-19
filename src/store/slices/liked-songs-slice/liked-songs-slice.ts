import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MyState} from '../../store';

export interface Song {
    id: string;
    title: string;
    artist: string
    thumbnailUrl?: string;
}

export interface fetchLikedSongsOptions {
    doesLoadMore: boolean;
}

export interface LikedSongsState {
    items: Song[];
}

const initialState: LikedSongsState = {
    items: []
};

export const fetchLikedSongs = createAsyncThunk('likedSongs/fetch', async (arg: fetchLikedSongsOptions, thunkAPI) => {
    return [
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
        },
    ];
});

const likedSongsSlice = createSlice({
    name: 'likedSongSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLikedSongs.fulfilled, (state, action) => {
            if (!action.meta.arg.doesLoadMore) {
                state.items = action.payload;
                return;
            }
            state.items = [
                ...state.items,
                ...action.payload
            ];
        });
    }
});

export const selectLikedSongs = (state: MyState) => state.likedSongs.items;

export default likedSongsSlice.reducer;
