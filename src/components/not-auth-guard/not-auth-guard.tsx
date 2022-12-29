import {useDispatch, useSelector} from "react-redux";
import {
    fetechCurrentUser,
    selectCurrentUser,
    selectCurrentUserStatus
} from "../../features/current-user/current-user-slice";
import {useEffect} from "react";
import {Redirect} from "react-router-dom";

interface NotAuthGuardProps {
    children: any
}

const NotAuthGuard: React.FC<NotAuthGuardProps> = ({children}) => {
    console.log('not auth guard render fn')
    const currentUser = useSelector(selectCurrentUser);
    const status = useSelector(selectCurrentUserStatus);
    const dispatch = useDispatch();
    console.log('current user');
    console.log(currentUser);
    console.log('status', status);
    useEffect(() => {
        console.log('useEffect')
        if (!currentUser || status === "loading") {
            return;
        }
        console.log('dispatch')
        dispatch(fetechCurrentUser());
    }, []);
    if (status === "loading") {
        return (<></>);
    }
    if (currentUser) {
        return (
            <Redirect to="/home"/>
        );
    }
    return children;
};

export default NotAuthGuard;
