import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState} from '@reduxjs/toolkit';
import {trackApi} from '../../../tools/client';
import {CachedTrack, Track} from './models/cachedTrack';
import {MyState} from '../../store';
import {addLike, deleteLike} from '../like-slise/like-slice';

export interface TrackSliceState extends EntityState<any> {
}

const trackAdapter = createEntityAdapter<CachedTrack>({});

const initialState: TrackSliceState = trackAdapter.getInitialState({});


export const fetchTrack = createAsyncThunk<Track, { id: string }>('track/fetch', async (arg, thunkAPI) => {
    const {id} = arg;
    const response = await trackApi.trackIdGet(id);
    const track = response.data;
    const mappedTrack: Track = {
        id: track.id,
        title: track.title,
        artistName: track.artistName,
        thumbnailUrl: track.thumbnailUrl ?? undefined,
        likeId: track.likeId ?? undefined
    }
    if (mappedTrack.likeId) {
        thunkAPI.dispatch(addLike({
            id: mappedTrack.likeId,
            associatedId: id
        }));
    } else {
        thunkAPI.dispatch(deleteLike({
            associatedId: id
        }));
    }
    return mappedTrack;
});

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        initialize: (state, action) => {
            console.log(action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTrack.fulfilled, (state, action) => {
            const track = action.payload;
            trackAdapter.setOne(state, {
                id: track.id,
                track: track,
                status: 'succeeded',
                error: undefined
            });
        });
        builder.addCase(fetchTrack.pending, (state, action) => {
            const id = action.meta.arg.id;
            trackAdapter.setOne(state, {
                id: id,
                track: undefined,
                status: 'loading',
                error: undefined
            });
        });
        builder.addCase(fetchTrack.rejected, (state, action) => {
            const id = action.meta.arg.id;
            trackAdapter.setOne(state, {
                id: id,
                track: undefined,
                status: 'failed',
                error: undefined
            });
        });
    }
});

export const {
    selectById
} = trackAdapter.getSelectors<MyState>(state => state.tracks);

export const getTrackStatus = createSelector(
    [selectById, (state, trackId) => trackId],
    (track) => track?.status
)

export default trackSlice.reducer;
