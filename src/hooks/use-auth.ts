import {publicAccountsApi} from '../tools/client';
import {useDispatch} from 'react-redux';
import {fetechCurrentUser} from '../store/slices/current-user/current-user-slice';
import {performLogout} from '../store/logout';

export const useAuth = () => {
    const dispatch = useDispatch();
    return {
        login: async (credentials: { username: string, password: string }) => {
            const response = await publicAccountsApi.accountsLoginPost({
                username: credentials.username,
                password: credentials.password
            })
            const token = response.data;
            if (!token?.accessToken) {
                return;
            }
            localStorage.setItem('jwt', token.accessToken);
            await dispatch(fetechCurrentUser());
        },
        logout: async () => {
            await dispatch(performLogout());
        }
    };
}
