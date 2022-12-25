import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState} from "@reduxjs/toolkit";
import {trackApi} from "../../tools/client";
import {CachedTrack, Track} from "./models/cachedTrack";
import {MyState} from "../../store/store";

export interface TrackSliceState extends EntityState<any> {
}

const trackAdapter = createEntityAdapter<CachedTrack>({});

const initialState: TrackSliceState = trackAdapter.getInitialState({});


export const fetchTrack = createAsyncThunk<Track, { id: string }>('track/fetch', async (arg, thunkAPI) => {
    const {id} = arg;
    const response = await trackApi.trackIdGet(id);
    const track = response.data.result!;
    const mappedTrack: Track = {
        id: track.id!,
        title: track.title!,
        artistName: track.artistName!,
        thumbnailUrl: track.thumbnailUrl ?? undefined
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
    (track, trackId) => track?.status
)

export const {} = trackSlice.actions;

export default trackSlice.reducer;
