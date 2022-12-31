import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState} from "@reduxjs/toolkit";
import {albumkApi} from "../../../tools/client";
import {Album, CachedAlbum} from "./models/cachedAlbum";
import {MyState} from "../../store";
import {addLike, deleteLike} from "../like-slise/like-slice";

export interface AlbumSliceState extends EntityState<any> {
}

const albumAdapter = createEntityAdapter<CachedAlbum>({});

const initialState: AlbumSliceState = albumAdapter.getInitialState({});


export const fetchAlbum = createAsyncThunk('album/fetch', async (arg: { id: string }, thunkAPI) => {
    const {id} = arg;
    const response = await albumkApi.albumIdGet(id);
    const albumDto = response.data.result!;
    const mappedAlbum: Album = {
        id: albumDto.id!,
        title: albumDto.title!,
        artistName: albumDto.artistName!,
        thumbnailUrl: albumDto.thumbnailUrl ?? undefined,
        albumType: albumDto.albumType!,
        artistId: albumDto.artistId!,
        artistThumbnailUrl: albumDto.artistThumbnailUrl!,
        releaseDate: albumDto.releaseDate!,
        likeId: albumDto.likeId ?? undefined
    }
    if (mappedAlbum.likeId) {
        thunkAPI.dispatch(addLike({
            id: mappedAlbum.likeId,
            associatedId: id
        }));
    } else {
        thunkAPI.dispatch(deleteLike({
            associatedId: id
        }));
    }
    return mappedAlbum;
});

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAlbum.fulfilled, (state, action) => {
            const album = action.payload;
            albumAdapter.setOne(state, {
                id: album.id!,
                album: album,
                status: 'succeeded',
                error: undefined
            });
        });
        builder.addCase(fetchAlbum.pending, (state, action) => {
            const id = action.meta.arg.id;
            albumAdapter.setOne(state, {
                id: id,
                album: undefined,
                status: 'loading',
                error: undefined
            });
        });
        builder.addCase(fetchAlbum.rejected, (state, action) => {
            const id = action.meta.arg.id;
            albumAdapter.setOne(state, {
                id: id,
                album: undefined,
                status: 'failed',
                error: undefined
            });
        });
    }
});

export const {
    selectById: selectAlbumById
} = albumAdapter.getSelectors<MyState>(state => state.albums);

export const getAlbumStatus = createSelector(
    [selectAlbumById, (state, albumId) => albumId],
    (album, albumId) => album?.status
)

export const {} = albumSlice.actions;

export default albumSlice.reducer;
