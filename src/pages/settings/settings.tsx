import {IonContent, IonHeader, IonIcon, IonPage} from '@ionic/react';
import styles from './settings.module.scss';
import React from 'react';
import {chevronForward} from 'ionicons/icons';
import {useHistory} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {useAuth} from '../../hooks/use-auth';
import HeaderWithCenteredTitle from '../../components/headers/header-with-centered-title/header-with-centered-title';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../store/slices/current-user/current-user-slice';

interface SettingsProps extends RouteComponentProps {
}


const Settings: React.FC<SettingsProps> = (props) => {
    const authHook = useAuth();
    const history = useHistory();
    const currentUser = useSelector(selectCurrentUser);
    const _handleProfileSettingsButtonEvent = () => {
        history.push(`${props.match.url}/profile-settings`);
    };
    const handleLogoutEvent = () => {
        authHook.logout();
    };
    const profileTitle = currentUser?.name ?? '';
    return (
        <IonPage>
            <IonHeader>
                <HeaderWithCenteredTitle title="Settings"/>
            </IonHeader>
            <IonContent className={styles.ionContent} forceOverscroll={false}>
                <div className={styles.container}>
                    <div
                        className={styles.profileSettingsButton}
                        onClick={() => _handleProfileSettingsButtonEvent()}
                    >
                        <div className={styles.profileSettingsButton__profileIcon}>
                            <p>{profileTitle[0]}</p>
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
                <div
                    className={styles.button}
                    onClick={() => handleLogoutEvent()}
                >
                    <div className="app-min-w-0">
                        <p
                            className={styles.button__title}
                        >Logout</p>
                        <p className={styles.button__subtitle}>You are logged in as {profileTitle}</p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
