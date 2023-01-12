import {createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit';
import {albumkApi, artistApi, likeApi, trackApi} from '../../../tools/client';
import {MyState} from '../../store';
import {LikeDto, SetLikeRequest} from '../../../api';
import {AxiosError} from 'axios';
import {performLogout} from '../../logout';

export interface CachedLike {
    id: string;
    associatedId: string
}

export interface LikeSlideState extends EntityState<any> {
}

const likeAdapter = createEntityAdapter<CachedLike>({
    selectId: model => model.associatedId
});

const initialState: LikeSlideState = likeAdapter.getInitialState({});

const createAddLike = (request: (setLikeRequest: SetLikeRequest) => Promise<LikeDto>) => {
    return createAsyncThunk<string, { id: string }>('like/add', async (arg, {dispatch}) => {
        const {id} = arg;
        try {
            const res = await request({
                associatedId: id
            });
            return res.id;
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                dispatch(performLogout());
            }
            throw e;
        }
    });
};

export const addTrackLikeThunk = createAddLike((setLikeRequest => trackApi.trackLikePatch(setLikeRequest).then(res => res.data)));
export const addAlbumLikeThunk = createAddLike((setLikeRequest => albumkApi.albumLikePatch(setLikeRequest).then(res => res.data)));
export const addArtistLikeThunk = createAddLike((setLikeRequest => artistApi.artistLikePatch(setLikeRequest).then(res => res.data)));
export const deleteLikeThunk = createAsyncThunk('like/delete', async (arg: { id: string, associatedId: string }, {dispatch}) => {
    try {
        await likeApi.likeDeleteDelete({
            id: arg.id
        })
    } catch (e: unknown) {
        if (e instanceof AxiosError && e.response?.status === 401) {
            dispatch(performLogout());
        }
        throw e;
    }
});

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        addLike: (state, action: PayloadAction<{ id: string, associatedId: string }>) => {
            likeAdapter.setOne(state, {
                id: action.payload.id,
                associatedId: action.payload.associatedId
            });
        },
        deleteLike: (state, action: PayloadAction<{ associatedId: string }>) => {
            likeAdapter.removeOne(state, action.payload.associatedId);
        }
    },
    extraReducers: builder => {
        builder.addCase(addTrackLikeThunk.fulfilled, (state, action) => {
            likeAdapter.setOne(state, {
                id: action.payload,
                associatedId: action.meta.arg.id
            });
        });
        builder.addCase(deleteLikeThunk.fulfilled, (state, action) => {
            likeAdapter.removeOne(state, action.meta.arg.associatedId);
        });
    }
});

export const {
    selectById: selectLikeByAssociatedId,
} = likeAdapter.getSelectors<MyState>(state => state.likes);


export const {addLike, deleteLike} = likeSlice.actions;

export default likeSlice.reducer;
