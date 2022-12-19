import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import styles from './settings.module.scss';
import React from "react";
import {arrowBackOutline, chevronForward} from 'ionicons/icons';
import {useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";

interface SettingsProps extends RouteComponentProps {
}

const Settings: React.FC<SettingsProps> = (props) => {
    console.log(props);
    const history = useHistory();
    const _handleProfileSettingsButtonEvent = () => {
        history.push(`${props.match.url}/profile-settings`);
    };
    const profileTitle = 'ValentinValentinVale ntinVale ntinVal entinV alentinVale ntinVa lentin Valent inVal entinValent inValentinV alentinV alenti nVale ntin';
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className={styles.ionToolbar}>
                    <div className={styles.ionToolbar__header}>
                        <IonIcon
                            className={styles.ionToolbar__header__backButton}
                            icon={arrowBackOutline}
                            onClick={() => history.goBack()}
                        />
                        <p className={styles.ionToolbar__header__title}>Settings</p>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className={styles.ionContent} forceOverscroll={false}>
                <div className={styles.container}>
                    <div
                        className={styles.profileSettingsButton}
                        onClick={() => _handleProfileSettingsButtonEvent()}
                    >
                        <div className={styles.profileSettingsButton__profileIcon}>
                            <p>V</p>
                        </div>
                        <div className={styles.profileSettingsButton__centerSlot}>
                            <p className={styles.profileSettingsButton__profileTitle}>{profileTitle}</p>
                            <p className={styles.profileSettingsButton__viewProfile}>View Profile</p>
                        </div>
                        <IonIcon className={styles.profileSettingsButton__icon} icon={chevronForward}></IonIcon>
                    </div>
                </div>
                <div className={styles.category}>
                    <p className={styles.category__title}>Other</p>
                </div>
                <div className={styles.button}>
                    <div className="app-min-w-0">
                        <p className={styles.button__title}>Logout</p>
                        <p className={styles.button__subtitle}>You are logged in as {profileTitle}</p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
