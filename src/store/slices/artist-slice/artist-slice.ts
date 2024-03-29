import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState} from '@reduxjs/toolkit';
import {artistApi} from '../../../tools/client';
import {Artist, CachedArtist} from './models/cachedArtist';
import {MyState} from '../../store';
import {addLike, deleteLike} from '../like-slise/like-slice';
import {AxiosError} from 'axios';
import {performLogout} from '../../logout';

export interface ArtistSliceState extends EntityState<any> {
}

const artistAdapter = createEntityAdapter<CachedArtist>({});

const initialState: ArtistSliceState = artistAdapter.getInitialState({});


export const fetchArtist = createAsyncThunk('artist/fetch', async (arg: { id: string }, thunkAPI) => {
    const {id} = arg;
    try {
        const response = await artistApi.artistIdGet(id);
        const artistDto = response.data;
        const mappedArtist: Artist = {
            id: artistDto.id,
            monthlyListeners: artistDto.monthlyListeners,
            name: artistDto.name,
            thumbnailUrl: artistDto.thumbnailUrl ?? undefined,
            likeId: artistDto.likeId ?? undefined
        };
        if (artistDto.likeId) {
            thunkAPI.dispatch(addLike({
                id: artistDto.likeId,
                associatedId: id
            }));
        } else {
            thunkAPI.dispatch(deleteLike({
                associatedId: id
            }));
        }
        return mappedArtist;
    } catch (e: unknown) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            thunkAPI.dispatch(performLogout());
        }
        throw e;
    }
});

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchArtist.fulfilled, (state, action) => {
            const artist = action.payload;
            artistAdapter.setOne(state, {
                id: artist.id,
                artist: artist,
                status: 'succeeded',
                error: undefined
            });
        });
        builder.addCase(fetchArtist.pending, (state, action) => {
            const id = action.meta.arg.id;
            artistAdapter.setOne(state, {
                id: id,
                artist: undefined,
                status: 'loading',
                error: undefined
            });
        });
        builder.addCase(fetchArtist.rejected, (state, action) => {
            const id = action.meta.arg.id;
            artistAdapter.setOne(state, {
                id: id,
                artist: undefined,
                status: 'failed',
                error: undefined
            });
        });
    }
});

export const {
    selectById: selectArtistById
} = artistAdapter.getSelectors<MyState>(state => state.artists);

export const getArtistStatus = createSelector(
    [selectArtistById, (state, artistId) => artistId],
    (artist) => artist?.status
);

export default artistSlice.reducer;
