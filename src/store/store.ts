import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentUserSliice, {CurrentUserSliiceState} from './slices/current-user/current-user-slice';
import trackSlice, {TrackSliceState} from './slices/track-slice/track-slice';
import albumSlice, {AlbumSliceState} from './slices/album-slice/album-slice';
import artistSlice, {ArtistSliceState} from './slices/artist-slice/artist-slice';
import likeSlice, {LikeSlideState} from './slices/like-slise/like-slice';
import searchSlice, {SearchSliceState} from './slices/search-slice/search-slice';
import likedSongsSlice, {LibraryState} from './slices/library-slice/library-slice';
import appSlice, {AppSliceState} from './slices/app-slice/app-slice';

export interface MyState {
    app: AppSliceState,
    search: SearchSliceState,
    currentUser: CurrentUserSliiceState;
    albums: AlbumSliceState;
    artists: ArtistSliceState;
    tracks: TrackSliceState;
    likes: LikeSlideState;
    library: LibraryState;
}

const combinedReducer = combineReducers({
    app: appSlice,
    currentUser: currentUserSliice,
    tracks: trackSlice,
    albums: albumSlice,
    artists: artistSlice,
    likes: likeSlice,
    search: searchSlice,
    library: likedSongsSlice,
});

const rootReducer: (state: any, action: any) => MyState = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        const state = combinedReducer(undefined, action);
        return {
            ...state,
            app: {
                status: 'loggedOut'
            }
        };
    }
    return combinedReducer(state, action);
};

export const store = configureStore<MyState>({
    reducer: rootReducer
});
