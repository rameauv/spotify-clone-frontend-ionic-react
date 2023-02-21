import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MyState} from '../../store';
import {
    addAlbumLikeThunk,
    addArtistLikeThunk,
    addTrackLikeThunk,
    deleteAlbumLikeThunk,
    deleteArtistLikeThunk,
    deleteTrackLikeThunk
} from '../../like/like-thunks';

export interface LikeBase {
    id: string;
    updatedAt: number;
    thumbnailUrl?: string;
    likeId: string;
}

export interface TrackLike extends LikeBase {
    title: string;
    artist: string;
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

export interface LibraryItems {
    albums: AlbumLike[];
    artists: ArtistLike[];
    lastRequestOptions?: {
        limit: number;
        offset: number;
    }
}

export interface fetchLikedSongsOptions {
    doesLoadMore: boolean;
}

export interface LibraryState {
    loadedlikedSongs: TrackLike[];
    likedSongsCount: number;
    itemsResults: LibraryItems;
}

const initialState: LibraryState = {
    loadedlikedSongs: [],
    likedSongsCount: 0,
    itemsResults: {
        albums: [],
        artists: []
    },
};

export const fetchLikedSongs = createAsyncThunk('library/fetchLikedSongs', async (arg: fetchLikedSongsOptions, thunkAPI) => {
    return [
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
            likeId: '',
            updatedAt: new Date().getTime()
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
            likeId: '',
            updatedAt: new Date().getTime()
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
            likeId: '',
            updatedAt: new Date().getTime()
        },
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
            likeId: '',
            updatedAt: new Date().getTime()
        },
    ];
});

export const fetchLibrary = createAsyncThunk('library/fetch', (arg, thunkAPI) => {
    const itemsResults: LibraryItems = {
        albums: [
            {
                id: '2noRn2Aes5aoNVsU6iWThc',
                title: 'Discovery',
                artistName: 'Daft Punk',
                type: 'Album',
                updatedAt: new Date().getTime(),
                likeId: ''
            }
        ],
        artists: [
            {
                id: '4tZwfgrHOc3mvqYlEYSvVi',
                name: 'Daft Punk',
                updatedAt: new Date().getTime(),
                likeId: ''
            }
        ]
    };
    return {
        likedSongsCount: 42,
        itemsResults: itemsResults
    };
});

function addItemOrderByAddedRecently<T extends LikeBase>(item: T, list: T[]) {
    const newListWithoutItem = list
        .filter(itemItteration => itemItteration.id !== item.id);
    return [item, ...newListWithoutItem];
}

const librarySlice = createSlice({
    name: 'likedSongSlice',
    initialState,
    reducers: {
        addArtistLike: (state, action: PayloadAction<ArtistLike>) => {
            const newList = addItemOrderByAddedRecently(action.payload, state.itemsResults?.artists ?? []);
            state.itemsResults.artists = newList;
        },
        addAlbumLike: (state, action: PayloadAction<AlbumLike>) => {
            const newList = addItemOrderByAddedRecently(action.payload, state.itemsResults?.albums ?? []);
            state.itemsResults.albums = newList;
        },
        addTrackLike: (state, action: PayloadAction<TrackLike>) => {
            const newList = addItemOrderByAddedRecently(action.payload, state.loadedlikedSongs);
            state.loadedlikedSongs = newList;
        },
        deleteArtistLike: (state, {payload}: PayloadAction<{ likeId: string }>) => {
            state.itemsResults.artists = state.itemsResults.artists.filter(item => item.likeId !== payload.likeId);
        },
        deleteAlbumLike: (state, {payload}: PayloadAction<{ likeId: string }>) => {
            state.itemsResults.albums = state.itemsResults.albums.filter(item => item.likeId !== payload.likeId);
        },
        deleteTrackLike: (state, {payload}: PayloadAction<{ likeId: string }>) => {
            state.loadedlikedSongs = state.loadedlikedSongs.filter(item => item.likeId !== payload.likeId);
        }
    },
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
        builder.addCase(addTrackLikeThunk.fulfilled, (state, {payload, meta}) => {
            const item: TrackLike = {
                id: payload.item.id,
                artist: payload.item.artist,
                title: payload.item.title,
                thumbnailUrl: payload.item.thumbnailUrl,
                updatedAt: payload.updatedAt,
                likeId: payload.likeId
            };
            const newList = addItemOrderByAddedRecently(item, state.loadedlikedSongs);
            state.loadedlikedSongs = newList;
        });
        builder.addCase(addAlbumLikeThunk.fulfilled, (state, {payload, meta}) => {
            const item: AlbumLike = {
                id: payload.item.id,
                artistName: payload.item.artistName,
                title: payload.item.title,
                thumbnailUrl: payload.item.thumbnailUrl,
                type: payload.item.type,
                updatedAt: payload.updatedAt,
                likeId: payload.likeId
            };
            const newList = addItemOrderByAddedRecently(item, state.itemsResults.albums);
            state.itemsResults.albums = newList;
        });
        builder.addCase(addArtistLikeThunk.fulfilled, (state, {payload}) => {
            const item: ArtistLike = {
                id: payload.item.id,
                name: payload.item.name,
                thumbnailUrl: payload.item.thumbnailUrl,
                updatedAt: payload.updatedAt,
                likeId: payload.likeId
            };
            const newList = addItemOrderByAddedRecently(item, state.itemsResults.artists);
            state.itemsResults.artists = newList;
        });
        builder.addCase(deleteTrackLikeThunk.fulfilled, (state, {payload}) => {
            state.loadedlikedSongs = state.loadedlikedSongs.filter(item => item.likeId !== payload.id);
        });
        builder.addCase(deleteAlbumLikeThunk.fulfilled, (state, {payload}) => {
            state.itemsResults.albums = state.itemsResults.albums.filter(item => item.likeId !== payload.id);
        });
        builder.addCase(deleteArtistLikeThunk.fulfilled, (state, {payload}) => {
            state.itemsResults.artists = state.itemsResults.artists.filter(item => item.likeId !== payload.id);
        });
    }
});

export const selectLikedSongs = (state: MyState) => state.library.loadedlikedSongs;
export const selectItemsResults = (state: MyState) => state.library.itemsResults;
export const selectLikedSongsCount = (state: MyState) => state.library.likedSongsCount;

export const {
    addArtistLike,
    addAlbumLike,
    addTrackLike,
    deleteArtistLike,
    deleteAlbumLike,
    deleteTrackLike
} = librarySlice.actions;

export default librarySlice.reducer;
