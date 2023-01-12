import {useSelector} from 'react-redux';
import {selectCurrentUser, selectCurrentUserStatus} from '../store/slices/current-user/current-user-slice';
import {useCallback} from 'react';
import {Redirect} from 'react-router-dom';

export const useNotAuthGuard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const status = useSelector(selectCurrentUserStatus);

    const callback = useCallback((children: JSX.Element | JSX.Element[]) => {
        if (status === 'loading') {
            return (<>loading...</>);
        }
        if (currentUser) {
            return (
                <Redirect to="/home"/>
            );
        }
        console.log('useNotAuthGuard -> child')
        return children;
    }, [status, currentUser]);
    return callback;
}
