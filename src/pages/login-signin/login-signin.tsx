import {IonContent, IonPage} from '@ionic/react';
import {RouteComponentProps} from "react-router";
import styles from "./login-signin.module.scss";
import React from "react";

interface LoginSigninProps extends RouteComponentProps {
}

const LoginSignin: React.FC<LoginSigninProps> = (props) => {
    console.log('login signin page')

    const handleDiscardEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!event) {
            return;
        }
        props.history.push(`${props.match.url}login`);
    }
    console.log(props);
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
                    onClick={event => handleDiscardEvent(event)}
                >Login</p>
            </IonContent>
        </IonPage>
    );
};

export default LoginSignin;
