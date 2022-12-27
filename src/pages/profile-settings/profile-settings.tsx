import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import styles from './profile-settings.module.scss';
import React, {useState} from "react";
import {arrowBackOutline} from 'ionicons/icons';
import {useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import SmallPlaylistWithfollow from "../../components/thumbnails/small-playlist-with-follow/small-playlist-withfollow";
import EditProfileModalController from "../../components/edit-profile-modal/edit-profile-modal-controller";
import {useSelector} from "react-redux";
import {MyState} from "../../store/store";
import {CurrentUser, selectCurrentUser} from "../../features/current-user/current-user-slice";

interface ProfileSettingsProps extends RouteComponentProps {
}

function limitOpacity(min: number, max: number, value: number) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

const seeButtonProvider = (label: string) => {
    return (
        <div className={styles.editButton}>
            <p>{label}</p>
        </div>
    )
}

const ProfileSettings: React.FC<ProfileSettingsProps> = (props) => {
    const accentColor = 'brown';
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [bgOpacity, setBgOpacity] = useState(0);
    const [titleOpacity, setTitleOpacity] = useState(0);
    const handleScrollEvent = (e: any) => {
        const scrollTop = e.detail.scrollTop;
        const tempBgOpacity = ((scrollTop / 44));
        const tempTitleOpacity = (((scrollTop - 37) / 80));
        setBgOpacity(limitOpacity(0, 1, tempBgOpacity));
        setTitleOpacity(limitOpacity(0, 1, tempTitleOpacity));
    }
    console.log(bgOpacity);
    const profileTitle = useSelector<MyState, CurrentUser | undefined>(selectCurrentUser)?.name ?? '';
    return (
        <IonPage
            style={{
                "--backgroundOpacity": bgOpacity,
                "--titleOpacity": titleOpacity,
                "--accentColor": accentColor
            }}
        >
            <EditProfileModalController isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <IonHeader>
                <IonToolbar className={styles.ionToolbar}>
                    <div className={styles.headerBg}>
                        <div className={styles.headerBgGradiant}/>
                    </div>
                    <div className={styles.header}>
                        <IonIcon
                            className={styles.header__backButton}
                            icon={arrowBackOutline}
                            onClick={() => history.goBack()}
                        />
                        <p className={styles.header__title}>{profileTitle}</p>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent
                className={styles.ionContent}
                forceOverscroll={false}
                fullscreen
                scrollEvents
                onIonScroll={(e) => handleScrollEvent(e)}
            >
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div
                            className={styles.profileInfos}
                        >
                            <div
                                className={styles.profileSettingsButton__profileIcon}
                                onClick={event => setIsOpen(true)}
                            >
                                <p>V</p>
                            </div>
                            <div className={styles.profileSettingsButton__centerSlot}>
                                <p
                                    className={styles.profileSettingsButton__profileTitle}
                                    onClick={event => setIsOpen(true)}
                                >{profileTitle}</p>
                                <p className={styles.profileSettingsButton__follow}>0 <span
                                    className={styles.profileSettingsButton__followLabel}>followers</span> . 0 <span
                                    className={styles.profileSettingsButton__followLabel}>following</span></p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.buttonsContainer}
                        onClick={event => setIsOpen(true)}
                    >
                        <div className={styles.editButton}>
                            <p>Edit</p>
                        </div>
                    </div>
                    <p className={styles.playlistsLabel}>Playlists</p>
                    <ul className={styles.playlistsList}>
                        <li><SmallPlaylistWithfollow
                            title="test jmqlskdjfmlqksdjfmlqksdjfmlqksjdfmlqksjdfmlqksjdfmlqksjdfmlqksdjfmlqksdjfmlksqjdfmlk"
                            followers={0}/></li>
                        <li><SmallPlaylistWithfollow
                            title="test jmqlskdjfmlqksdjfmlqksdjfmlqksjdfmlqksjdfmlqksjdfmlqksjdfmlqksdjfmlqksdjfmlksqjdfmlk"
                            followers={0}/></li>
                    </ul>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ProfileSettings;
