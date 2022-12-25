import {createAsyncThunk, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {MyState} from "../../store/store";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
    id: string;
    title: string;
    body: string;
    date: string;
}

export interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}

const initialState: PostsState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: undefined
};

export const fetchPosts = createAsyncThunk('posts/fetechPosts', async (arg, thunkAPI) => {
    // try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
    // } catch (e: any) {
    //     return e.message;
    // }
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload);
            },
            prepare: (title: string, content: string) => {
                const payload: Post = {
                    id: nanoid(),
                    title,
                    body: content,
                    date: new Date().toISOString()
                }
                return {
                    payload: payload,
                }
            }
        },
        reset(state) {
            state.posts.splice(0);
            state.status = 'idle';
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // adding date and reactions
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = new Date().toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eye: 0
                };
                return post;
            });
            // add any fetched posts to the array
            state.posts = state.posts.concat(loadedPosts);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export const {postAdded, reset} = postSlice.actions;

export const selectAllPosts = (state: MyState) => state.posts.posts;
export const getPostStatus = (state: MyState) => state.posts.status;
export const getPostError = (state: MyState) => state.posts.error;

export default postSlice.reducer;
