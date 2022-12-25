import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonRouter} from '@ionic/react';
import {RouteComponentProps} from "react-router";
import styles from "./login.module.scss";
import React, {useState} from "react";
import {arrowBackOutline} from "ionicons/icons";
import {publicAccountsApi} from "../../tools/client";

interface LoginProps extends RouteComponentProps {
}

interface State {
    username: string;
    password: string;
}

const Login: React.FC<LoginProps> = (props) => {
    const [state, setState] = useState<State>({
        username: '',
        password: '',
    })

    const valid = state.username && state.password;
    const router = useIonRouter();
    const handleLoginButtonClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!event
            || !valid
        ) {
            return;
        }
        const f = async () => {
            const response = await publicAccountsApi.accountsLoginPost({
                deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                username: state.username,
                password: state.password
            })
            const token = response.data as unknown as string;
            console.log(token);
            if (!token) {
                return;
            }
            localStorage.setItem('jwt', token);
            router.push(`/home/tab1`, 'root', "replace");
        }
        f();
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
                <IonToolbar className={styles.ionToolbar}>
                    <div className={styles.ionToolbar__header}>
                        <IonIcon
                            className={styles.ionToolbar__header__backButton}
                            icon={arrowBackOutline}
                            onClick={() => router.goBack()}
                        />
                    </div>
                </IonToolbar>
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

                <div
                    className={`${styles.loginButton} ${valid ? '' : styles.loginDisable}`}
                    onClick={event => handleLoginButtonClick(event)}
                >
                    <p className={styles.loginButton__inner}>Log in</p>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default Login;
