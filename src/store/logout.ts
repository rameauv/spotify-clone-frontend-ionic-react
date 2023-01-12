import {createAsyncThunk} from '@reduxjs/toolkit';
import {accountsApi} from '../tools/client';

export const performLogout = createAsyncThunk('logout', async (arg, {dispatch}) => {
    try {
        await accountsApi.accountsLogoutPost();
    } catch (e) {
        console.error(e);
    }
    localStorage.clear();
    dispatch({name: '', type: 'USER_LOGOUT'});
});
