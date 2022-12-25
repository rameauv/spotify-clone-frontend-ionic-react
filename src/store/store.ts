import {configureStore} from "@reduxjs/toolkit";
import postReducer, {PostsState} from '../features/posts/posts-slice'
import currentUserSliice, {CurrentUserSliiceState} from "../features/current-user/current-user-slice";
import trackSlice, {TrackSliceState} from "../features/track-slice/track-slice";
import albumSlice, {AlbumSliceState} from "../features/album-slice/album-slice";

export interface MyState {
    posts: PostsState;
    home: {
        feed: {
            items: [];
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: string | undefined;
        }
    };
    search: {
        history: [],
        results: {
            items: [];
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: string | undefined;
        }
    };
    currentUser: CurrentUserSliiceState;
    albums: AlbumSliceState;
    artists: {
        ['']: {
            mainData: {
                data: {};
                status: 'idle' | 'loading' | 'succeeded' | 'failed';
                error: string | undefined;
            },
            albums: {
                items: [];
                status: 'idle' | 'loading' | 'succeeded' | 'failed';
                error: string | undefined;
            }
        }
    };
    tracks: TrackSliceState;
    likes: {
        ['']: true
    };
}


export const store = configureStore({
    reducer: {
        posts: postReducer,
        currentUser: currentUserSliice,
        tracks: trackSlice,
        albums: albumSlice
    }
});
