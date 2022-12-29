import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentUserSliice, {CurrentUserSliiceState} from "../features/current-user/current-user-slice";
import trackSlice, {TrackSliceState} from "../features/track-slice/track-slice";
import albumSlice, {AlbumSliceState} from "../features/album-slice/album-slice";
import artistSlice, {ArtistSliceState} from "../features/artist-slice/artist-slice";
import likeSlice, {LikeSlideState} from "../features/like-slise/like-slice";
import searchSlice, {SearchSliceState} from "../features/search-feature/search-slice";

export interface MyState {
    search: SearchSliceState,
    currentUser: CurrentUserSliiceState;
    albums: AlbumSliceState;
    artists: ArtistSliceState;
    tracks: TrackSliceState;
    likes: LikeSlideState;
}

const combinedReducer = combineReducers({
    currentUser: currentUserSliice,
    tracks: trackSlice,
    albums: albumSlice,
    artists: artistSlice,
    likes: likeSlice,
    search: searchSlice
});

const rootReducer: (state: any, action: any) => MyState = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        const state = combinedReducer(undefined, action);
        return {
            ...state, currentUser: {
                status: 'succeeded'
            }
        }
    }
    return combinedReducer(state, action);
};

export const store = configureStore<MyState>({
    reducer: rootReducer
});
