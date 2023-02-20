import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MyState} from '../../store';

export interface LikeBase {
    id: string;
    updatedAt: number;
}

export interface SongLike {
    id: string;
    title: string;
    artist: string
    thumbnailUrl?: string;
}

export interface AlbumLike extends LikeBase {
    title: string;
    artistName: string,
    type: string;
}

export interface ArtistLike extends LikeBase {
    name: string
}

export interface LibraryItemsResults {
    albums: AlbumLike[];
    artists: ArtistLike[];
    offset: number;
    limit: number;
}

export interface fetchLikedSongsOptions {
    doesLoadMore: boolean;
}

export interface LibraryState {
    loadedlikedSongs: SongLike[];
    likedSongsCount: number;
    itemsResults?: LibraryItemsResults;
}

const initialState: LibraryState = {
    loadedlikedSongs: [],
    likedSongsCount: 0,
    itemsResults: undefined,
};

export const fetchLikedSongs = createAsyncThunk('library/fetchLikedSongs', async (arg: fetchLikedSongsOptions, thunkAPI) => {
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

export const fetchLibrary = createAsyncThunk('library/fetch', (arg, thunkAPI) => {
    const itemsResults: LibraryItemsResults = {
        offset: 0,
        limit: 10,
        albums: [
            {
                id: '2noRn2Aes5aoNVsU6iWThc',
                title: 'Discovery',
                artistName: 'Daft Punk',
                type: 'Album',
                updatedAt: new Date().getTime()
            }
        ],
        artists: [
            {
                id: '4tZwfgrHOc3mvqYlEYSvVi',
                name: 'Daft Punk',
                updatedAt: new Date().getTime()
            }
        ]
    };
    return {
        likedSongsCount: 42,
        itemsResults: itemsResults
    };
});

const librarySliceSlice = createSlice({
    name: 'likedSongSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLikedSongs.fulfilled, (state, action) => {
            if (!action.meta.arg.doesLoadMore) {
                state.loadedlikedSongs = action.payload;
                return;
            }
            state.loadedlikedSongs = [
                ...state.loadedlikedSongs,
                ...action.payload
            ];
        });
        builder.addCase(fetchLibrary.fulfilled, (state, action) => {
            state.likedSongsCount = action.payload.likedSongsCount;
            state.itemsResults = action.payload.itemsResults;
        });
    }
});

export const selectLikedSongs = (state: MyState) => state.library.loadedlikedSongs;
export const selectItemsResults = (state: MyState) => state.library.itemsResults;
export const selectLikedSongsCount = (state: MyState) => state.library.likedSongsCount;

export default librarySliceSlice.reducer;
