import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentUserStatus} from "../../features/current-user/current-user-slice";
import {createAnimation, useIonRouter} from "@ionic/react";
import {Redirect} from "react-router-dom";

export interface AuthGuardProps {
    children: JSX.Element;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const currentUser = useSelector(selectCurrentUser);
    const status = useSelector(selectCurrentUserStatus);

    if (status === "loading") {
        return (<>loading...</>);
    }
    if (!currentUser) {
        return (
            <Redirect to="/"/>
        );
    }
    return children;
};


export default AuthGuard;
