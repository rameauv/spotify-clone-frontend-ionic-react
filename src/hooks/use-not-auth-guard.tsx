import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentUserStatus} from "../store/slices/current-user/current-user-slice";
import {useCallback} from "react";
import {Redirect} from "react-router-dom";

export const useNotAuthGuard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const status = useSelector(selectCurrentUserStatus);

    const callback = useCallback((children: JSX.Element) => {
        console.log('not auth guard hook')
        console.log('current user');
        console.log(currentUser);
        console.log('status', status);
        if (status === "loading") {
            return (<>loading...</>);
        }
        if (currentUser) {
            return (
                <Redirect to="/home"/>
            );
        }
        return children;
    }, [status, currentUser]);
    return callback;
}
