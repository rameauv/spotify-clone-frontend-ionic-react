import {configureStore} from "@reduxjs/toolkit";
import postReducer, {PostsState} from '../features/posts/posts-slice'
import currentUserSliice, {CurrentUserSliiceState} from "../features/current-user/current-user-slice";
import trackSlice, {TrackSliceState} from "../features/track-slice/track-slice";
import albumSlice, {AlbumSliceState} from "../features/album-slice/album-slice";
import artistSlice, {ArtistSliceState} from "../features/artist-slice/artist-slice";
import likeSlice, {LikeSlideState} from "../features/like-slise/like-slice";
import searchSlice, {SearchSliceState} from "../features/search-feature/search-slice";

export interface MyState {
    posts: PostsState;
    home: {
        feed: {
            items: [];
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: string | undefined;
        }
    };
    search: SearchSliceState,
    currentUser: CurrentUserSliiceState;
    albums: AlbumSliceState;
    artists: ArtistSliceState;
    tracks: TrackSliceState;
    likes: LikeSlideState;
}


export const store = configureStore({
    reducer: {
        posts: postReducer,
        currentUser: currentUserSliice,
        tracks: trackSlice,
        albums: albumSlice,
        artists: artistSlice,
        likes: likeSlice,
        search: searchSlice
    }
});
