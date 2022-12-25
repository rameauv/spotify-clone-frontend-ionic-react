import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState} from "@reduxjs/toolkit";
import {artistApi} from "../../tools/client";
import {Artist, CachedArtist} from "./models/cachedArtist";
import {MyState} from "../../store/store";

export interface ArtistSliceState extends EntityState<any> {
}

const artistAdapter = createEntityAdapter<CachedArtist>({});

const initialState: ArtistSliceState = artistAdapter.getInitialState({});


export const fetchArtist = createAsyncThunk<Artist, { id: string }>('artist/fetch', async (arg, thunkAPI) => {
    const {id} = arg;
    const response = await artistApi.artistIdGet(id);
    const artistDto = response.data.result!;
    const mappedArtist: Artist = {
        id: artistDto.id!,
        monthlyListeners: artistDto.monthlyListeners!,
        name: artistDto.name!,
        thumbnailUrl: artistDto.thumbnailUrl ?? undefined,
    }
    return mappedArtist;
});

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchArtist.fulfilled, (state, action) => {
            const artist = action.payload;
            artistAdapter.setOne(state, {
                id: artist.id!,
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
    (artist, artistId) => artist?.status
)

export const {} = artistSlice.actions;

export default artistSlice.reducer;
