import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentUserSliice, {CurrentUserSliiceState} from "./slices/current-user/current-user-slice";
import trackSlice, {TrackSliceState} from "./slices/track-slice/track-slice";
import albumSlice, {AlbumSliceState} from "./slices/album-slice/album-slice";
import artistSlice, {ArtistSliceState} from "./slices/artist-slice/artist-slice";
import likeSlice, {LikeSlideState} from "./slices/like-slise/like-slice";
import searchSlice, {SearchSliceState} from "./slices/search-feature/search-slice";

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
