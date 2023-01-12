import {IonContent, IonPage, useIonRouter} from '@ionic/react';
import styles from './login-signin.module.scss';
import React from 'react';
import {useRouteMatch} from 'react-router-dom';

interface LoginSigninProps {
}

const LoginSignin: React.FC<LoginSigninProps> = () => {
    const router = useIonRouter();
    const match = useRouteMatch();

    const handleDiscardEvent = () => {
        router.push(`${match.url}login`);
    }
    return (
        <IonPage>
            <IonContent
                className={styles.ionContent}
                fullscreen
            >
                <p className={styles.title}>
                    <span>Discover your next</span>
                    <br/>
                    <span>favorite playlist.</span>
                </p>
                <p
                    className={styles.loginButton}
                    onClick={() => handleDiscardEvent()}
                >Login</p>
            </IonContent>
        </IonPage>
    );
};

export default LoginSignin;
