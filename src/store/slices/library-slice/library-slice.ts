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
import {libraryApi} from '../../../tools/client';

export interface LikeBase {
    id: string;
    likeCreatedAt: number;
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

export interface LikedTracksitems {
    items: TrackLike[];
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
    loadedlikedSongs: LikedTracksitems;
    likedSongsCount: number;
    itemsResults: LibraryItems;
}

const initialState: LibraryState = {
    loadedlikedSongs: {
        items: []
    },
    likedSongsCount: 0,
    itemsResults: {
        albums: [],
        artists: []
    },
};

export const fetchLikedSongs = createAsyncThunk('library/fetchLikedSongs', async (arg: FetchLikedSongsOptions, thunkAPI) => {
    const limit = 10;
    const state = thunkAPI.getState() as MyState;
    const lastRequestOffset = state.library.itemsResults.lastRequestOptions?.offset ?? 0;
    const offset = !arg.doesLoadMore ? 0 : lastRequestOffset + limit;
    const res = await libraryApi.libraryFindLikedTracksGet(offset, limit);
    return res.data;
});

export const fetchLibrary = createAsyncThunk('library/fetch', async (arg, thunkAPI) => {
    const {data: resData} = await libraryApi.libraryCurrentUserLibraryGet();
    const {items, likedTracksCount} = resData;
    return {
        likedSongsCount: likedTracksCount,
        itemsResults: items,
    };
});

export const fetchLibraryItems = createAsyncThunk('library/fetchLibraryItems', async (arg: FetchLibraryOptions, thunkAPI) => {
    const limit = 10;
    const state = thunkAPI.getState() as MyState;
    const lastRequestOffset = state.library.itemsResults.lastRequestOptions?.offset ?? 0;
    const offset = !arg.doesLoadMore ? 0 : lastRequestOffset + limit;
    const res = await libraryApi.libraryFindLibraryItemsGet(offset, limit);
    return res.data;
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
        builder.addCase(fetchLikedSongs.fulfilled, (state, {payload, meta}) => {
            const items: TrackLike[] = payload.items.map(track => ({
                id: track.item.id,
                likeId: track.likeId,
                likeCreatedAt: new Date(track.likeCreatedAt).getTime(),
                title: track.item.title,
                thumbnailUrl: track.item.thumbnailUrl,
                artist: track.item.artistName
            }));
            const lastRequestOptions = {
                offset: payload.offset
            };

            if (!meta.arg.doesLoadMore) {
                state.loadedlikedSongs = {
                    items: items,
                    lastRequestOptions: lastRequestOptions
                };
                return;
            }
            state.loadedlikedSongs = {
                items: addNewItemsAtTheEnd(state.loadedlikedSongs.items, items),
                lastRequestOptions: lastRequestOptions
            };
        });
        builder.addCase(fetchLibrary.fulfilled, (state, {payload, meta}) => {
            state.likedSongsCount = payload.likedSongsCount;
            const albums: AlbumLike[] = payload.itemsResults.albums.map(album => ({
                id: album.item.id,
                likeId: album.likeId,
                type: album.item.albumType,
                likeCreatedAt: new Date(album.likeCreatedAt).getTime(),
                thumbnailUrl: album.item.thumbnailUrl,
                title: album.item.title,
                artistName: album.item.artistName
            }));
            const artists: ArtistLike[] = payload.itemsResults.artists.map(artist => ({
                id: artist.item.id,
                likeId: artist.likeId,
                likeCreatedAt: new Date(artist.likeCreatedAt).getTime(),
                thumbnailUrl: artist.item.thumbnailUrl,
                name: artist.item.name
            }));

            state.itemsResults = {
                albums: albums,
                artists: artists,
                lastRequestOptions: {
                    offset: payload.itemsResults.offset
                }
            };
        });
        builder.addCase(fetchLibraryItems.fulfilled, (state, {payload, meta}) => {
            const albums: AlbumLike[] = payload.albums.map(album => ({
                id: album.item.id,
                likeId: album.likeId,
                type: album.item.albumType,
                likeCreatedAt: new Date(album.likeCreatedAt).getTime(),
                thumbnailUrl: album.item.thumbnailUrl,
                title: album.item.title,
                artistName: album.item.artistName
            }));
            const artists: ArtistLike[] = payload.artists.map(artist => ({
                id: artist.item.id,
                likeId: artist.likeId,
                likeCreatedAt: new Date(artist.likeCreatedAt).getTime(),
                thumbnailUrl: artist.item.thumbnailUrl,
                name: artist.item.name
            }));
            const lastRequestOptions = {
                offset: payload.offset
            };

            if (!meta.arg.doesLoadMore) {
                state.itemsResults = {
                    albums: albums,
                    artists: artists,
                    lastRequestOptions: lastRequestOptions
                };
                return;
            }
            const newAlbums = addNewItemsAtTheEnd(state.itemsResults.albums, albums);
            const newArtists = addNewItemsAtTheEnd(state.itemsResults.artists, artists);
            state.itemsResults = {
                albums: newAlbums,
                artists: newArtists,
                lastRequestOptions: lastRequestOptions
            };
        });
        builder.addCase(addTrackLikeThunk.fulfilled, (state, {payload}) => {
            const item: TrackLike = {
                id: payload.item.id,
                artist: payload.item.artist,
                title: payload.item.title,
                thumbnailUrl: payload.item.thumbnailUrl,
                likeCreatedAt: payload.updatedAt,
                likeId: payload.likeId
            };
            const newList = addItemOrderByAddedRecently(item, state.loadedlikedSongs.items);
            state.loadedlikedSongs.items = newList;
        });
        builder.addCase(addAlbumLikeThunk.fulfilled, (state, {payload}) => {
            const item: AlbumLike = {
                id: payload.item.id,
                artistName: payload.item.artistName,
                title: payload.item.title,
                thumbnailUrl: payload.item.thumbnailUrl,
                type: payload.item.type,
                likeCreatedAt: payload.updatedAt,
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
                likeCreatedAt: payload.updatedAt,
                likeId: payload.likeId
            };
            const newList = addItemOrderByAddedRecently(item, state.itemsResults.artists);
            state.itemsResults.artists = newList;
        });
        builder.addCase(deleteTrackLikeThunk.fulfilled, (state, {payload}) => {
            state.loadedlikedSongs.items = state.loadedlikedSongs.items.filter(item => item.likeId !== payload.id);
        });
        builder.addCase(deleteAlbumLikeThunk.fulfilled, (state, {payload}) => {
            state.itemsResults.albums = state.itemsResults.albums.filter(item => item.likeId !== payload.id);
        });
        builder.addCase(deleteArtistLikeThunk.fulfilled, (state, {payload}) => {
            state.itemsResults.artists = state.itemsResults.artists.filter(item => item.likeId !== payload.id);
        });
    }
});

export const selectLikedSongs = (state: MyState) => state.library.loadedlikedSongs.items;
export const selectItemsResults = (state: MyState) => state.library.itemsResults;
export const selectLikedSongsCount = (state: MyState) => state.library.likedSongsCount;

export default librarySlice.reducer;
