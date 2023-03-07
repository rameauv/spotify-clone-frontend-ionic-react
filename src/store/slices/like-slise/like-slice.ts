import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit';
import {MyState} from '../../store';
import {likeAddedActionCreator} from '../../like/like-added-action-creator';
import {LikeAddedAction as LikeAddedAction1} from '../../like/like-added-action';
import {likeDeletedActionCreator} from '../../like/like-deleted-action-creator';
import {LikeDeletedAction} from '../../like/like-deleted-action';

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
        },
    },
    extraReducers: builder => {
        builder.addCase(likeAddedActionCreator.actionType, (state, action: LikeAddedAction1) => {
            likeAdapter.setOne(state, {
                id: action.payload.id,
                associatedId: action.payload.associatedId
            });
        });
        builder.addCase(likeDeletedActionCreator.actionType, (state, action: LikeDeletedAction) => {
            likeAdapter.removeOne(state, action.payload.associatedId);
        });
    }
});

export const {
    selectById: selectLikeByAssociatedId,
    selectAll: selectAllLikes
} = likeAdapter.getSelectors<MyState>(state => state.likes);


export const {addLike, deleteLike} = likeSlice.actions;

export default likeSlice.reducer;
