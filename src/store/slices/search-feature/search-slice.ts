import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {searchApi} from "../../../tools/client";
import {SearchResultDto} from "../../../api";
import {MyState} from "../../store";


export interface SearchSliceState {
    results?: SearchResultDto;
}

const initialState: SearchSliceState = {}


export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (arg: { q: string }, thunkAPI) => {
    if (!arg.q.trim()) {
        return undefined;
    }
    try {
        const response = await searchApi.searchSearchGet(arg.q);
        return response.data.result;
    } catch (e: any) {
        console.error(e);
        if (e?.response?.status == '401') {
            throw new Error("unauthorized")
        }
        throw e;
    }
}, {
    condition: (userId, {getState, extra}) => {
        const {currentUser} = getState() as MyState;
        return !!currentUser.data;
    }
});


const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = action.payload;
        });
    }
});

const selectSelf = (state: MyState) => state;
export const getSearchResults = createSelector(selectSelf, (state) => state.search.results);

export const {} = searchSlice.actions;

export default searchSlice.reducer;
