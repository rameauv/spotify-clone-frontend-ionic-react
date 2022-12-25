import {configureStore} from "@reduxjs/toolkit";
import postReducer, {PostsState} from '../features/posts/posts-slide'
import currentUserSliice, {CurrentUserSliiceState} from "../features/current-user/current-user-sliice";

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
    albums: {
        ['']: {
            data: {};
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: string | undefined;
        }
    },
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
    tracks: {
        ['']: {
            data: {};
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            error: string | undefined;
        }
    };
    likes: {
        ['']: true
    };
}


export const store = configureStore({
    reducer: {
        posts: postReducer,
        currentUser: currentUserSliice
    }
});
