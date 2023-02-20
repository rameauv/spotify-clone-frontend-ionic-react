import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {selectAppStatus} from '../../store/slices/app-slice/app-slice';

export interface AuthGuardProps {
    children: JSX.Element;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const status = useSelector(selectAppStatus);

    if (status === 'loading') {
        return (<>loading...</>);
    }
    if (status !== 'succeeded') {
        return (
            <Redirect to="/"/>
        );
    }
    return children;
};


export default AuthGuard;
