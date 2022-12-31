import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonRouter} from '@ionic/react';
import {RouteComponentProps} from "react-router";
import styles from "./login.module.scss";
import React, {useState} from "react";
import {arrowBackOutline} from "ionicons/icons";
import {publicAccountsApi} from "../../tools/client";
import {useAuth} from "../../hooks/use-auth";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import HeaderWithCenteredTitle from "../../components/headers/header-with-centered-title/header-with-centered-title";

interface LoginProps {
}

interface State {
    username: string;
    password: string;
}

const Login: React.FC<LoginProps> = (props) => {
    console.log('login page render fn');
    const authHook = useAuth();

    const [state, setState] = useState<State>({
        username: '',
        password: '',
    })

    const valid = state.username && state.password;
    const router = useIonRouter();
    const handleLoginButtonClick = () => {
        authHook.login({
            username: state.username,
            password: state.password
        });
    }
    const handleUserNameInputEvent = (event: any) => {
        const value = event.target.value;
        setState({
            ...state,
            username: value
        });
    }

    const handlePasswardInputEvent = (event: any) => {
        const value = event.target.value;
        setState({
            ...state,
            password: value
        });
    }
    return (
        <IonPage>
            <IonHeader>
                <HeaderWithCenteredTitle title=""/>
            </IonHeader>
            <IonContent
                className={styles.ionContent}
                fullscreen
            >
                <div className={`${styles.loginFormInput} ${styles.userNameInput}`}>
                    <p className={styles.inputTitle}>Username</p>
                    <input
                        className={styles.input}
                        value={state.username}
                        onChange={(event) => handleUserNameInputEvent(event)}
                    />
                </div>
                <div className={`${styles.loginFormInput} ${styles.passwordInput}`}>
                    <p className={styles.inputTitle}>Password</p>
                    <input
                        className={styles.input}
                        value={state.password}
                        onChange={(event) => handlePasswardInputEvent(event)}
                    />
                </div>

                <RegularButton
                    className={styles.loginButton}
                    title="Log in"
                    isDisabled={!valid}
                    onClick={() => handleLoginButtonClick()}
                />
            </IonContent>
        </IonPage>
    );
};

export default Login;
