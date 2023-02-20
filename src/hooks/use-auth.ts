import {publicAccountsApi} from '../tools/client';
import {useDispatch} from 'react-redux';
import {performLogout} from '../store/logout';
import {fetchInitialAppData} from '../store/slices/app-slice/app-slice';

export const useAuth = () => {
    const dispatch = useDispatch();
    return {
        login: async (credentials: { username: string, password: string }) => {
            const response = await publicAccountsApi.accountsLoginPost({
                username: credentials.username,
                password: credentials.password
            });
            const token = response.data;
            if (!token?.accessToken) {
                return;
            }
            localStorage.setItem('jwt', token.accessToken);
            await dispatch(fetchInitialAppData());
        },
        logout: async () => {
            await dispatch(performLogout());
        }
    };
};
