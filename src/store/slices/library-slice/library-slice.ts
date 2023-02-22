import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
        offset: number;
    }
}

export interface FetchLikedSongsOptions {
    doesLoadMore: boolean;
}

export interface FetchLibraryOptions {
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

export const fetchLikedSongs = createAsyncThunk('library/fetchLikedSongs', async (options: FetchLikedSongsOptions, thunkAPI) => {
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
        {
            id: '',
            title: 'Aerodynamic',
            artist: 'Daft punk',
            likeId: '',
            updatedAt: new Date().getTime()
        },
    ];
});

let i = 0;

export const fetchLibrary = createAsyncThunk('library/fetch', (arg: FetchLibraryOptions, thunkAPI) => {
    const limit = 10;
    const state = thunkAPI.getState() as MyState;
    const lastRequestOffset = state.library.itemsResults.lastRequestOptions?.offset ?? 0;
    const offset = !arg.doesLoadMore ? 0 : lastRequestOffset + limit;
    const itemsResults: LibraryItems = {
        albums: [
            {
                id: (i++).toString(),
                title: 'Discovery',
                artistName: 'Daft Punk',
                type: 'Album',
                updatedAt: new Date().getTime(),
                likeId: ''
            }
        ],
        artists: [
            {
                id: (i++).toString(),
                name: 'Daft Punk',
                updatedAt: new Date().getTime(),
                likeId: (i++).toString()
            },
        ]
    };
    return {
        likedSongsCount: 42,
        itemsResults: itemsResults,
        offset: offset,
        limit: limit
    };
});

function addItemOrderByAddedRecently<T extends LikeBase>(item: T, list: T[]): T[] {
    const newListWithoutItem = list
        .filter(itemItteration => itemItteration.id !== item.id);
    return [item, ...newListWithoutItem];
}

function addNewItemsAtTheEnd<T extends LikeBase>(currentItems: T[], newItems: T[]): T[] {
    const newItemsIds = newItems.map(item => item.id);
    const newItemsIdsSet = new Set(newItemsIds);
    const filteredCurrentItems = currentItems.filter(item => !newItemsIdsSet.has(item.id));

    return [...filteredCurrentItems, ...newItems];
}

const librarySlice = createSlice({
    name: 'likedSongSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLikedSongs.fulfilled, (state, action) => {
            if (!action.meta.arg.doesLoadMore) {
                state.loadedlikedSongs = action.payload;
                return;
            }
            state.loadedlikedSongs = addNewItemsAtTheEnd(state.loadedlikedSongs, action.payload);
        });
        builder.addCase(fetchLibrary.fulfilled, (state, {payload, meta}) => {
            if (!meta.arg.doesLoadMore) {
                state.likedSongsCount = payload.likedSongsCount;
                state.itemsResults = payload.itemsResults;
            }
            const newAlbums = addNewItemsAtTheEnd(state.itemsResults.albums, payload.itemsResults.albums);
            const newArtists = addNewItemsAtTheEnd(state.itemsResults.artists, payload.itemsResults.artists);
            state.itemsResults = {
                albums: newAlbums,
                artists: newArtists,
                lastRequestOptions: {
                    offset: payload.offset
                }
            };
        });
        builder.addCase(addTrackLikeThunk.fulfilled, (state, {payload}) => {
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
        builder.addCase(addAlbumLikeThunk.fulfilled, (state, {payload}) => {
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

export default librarySlice.reducer;
