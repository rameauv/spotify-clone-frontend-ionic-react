import {useSelector} from 'react-redux';
import {createAnimation, useIonRouter, useIonViewWillEnter} from '@ionic/react';
import {selectAppStatus} from '../../store/slices/app-slice/app-slice';

interface NotAuthGuardProps {
    children: any,
}

const animationBuilder = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .fromTo('opacity', 0, 1)
        .duration(250);

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .fromTo('opacity', 1, 0)
        .duration(250);

    const animation = createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);

    return animation;
};


const NotAuthGuard: React.FC<NotAuthGuardProps> = ({children}) => {
    const status = useSelector(selectAppStatus);
    const router = useIonRouter();

    useIonViewWillEnter(() => {
        if (status === 'succeeded') {
            router.push('/home', 'root', 'replace', undefined, animationBuilder);
        }
    });
    if (status === 'loading') {
        return (<>NotAuthGuard loading...</>);
    }
    return children;
};

export default NotAuthGuard;
