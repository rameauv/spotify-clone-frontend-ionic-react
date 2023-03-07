import {useSelector} from 'react-redux';
import {useIonRouter, useIonViewWillEnter} from '@ionic/react';
import {selectAppStatus} from '../../store/slices/app-slice/app-slice';

interface NotAuthGuardProps {
    children: any,
}

const NotAuthGuard: React.FC<NotAuthGuardProps> = ({children}) => {
    const status = useSelector(selectAppStatus);
    const router = useIonRouter();

    useIonViewWillEnter(() => {
        if (status === 'succeeded') {
            router.push('/home', 'root', 'replace', undefined);
        }
    });
    if (status === 'loading') {
        return (<>NotAuthGuard loading...</>);
    }
    return children;
};

export default NotAuthGuard;
