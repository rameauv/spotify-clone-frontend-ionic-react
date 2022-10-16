import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonModal} from '@ionic/react';
import styles from './song.module.scss';
import {arrowBackOutline, ellipsisVertical, heart, heartOutline, playCircle} from 'ionicons/icons'
import {useState} from "react";
import SongMoreMenuModal, {SongMoreMenuModalSong} from "../../components/song-more-menu-modal/song-more-menu-modal";
import {useHistory} from "react-router-dom";

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const Song: React.FC = () => {
    const song: SongMoreMenuModalSong = {
        thumbnailUrl: defaultImage,
        title: 'Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit',
        artist: 'Daft punk'
    };
    const [isLiked, setIsLiked] = useState<boolean>();
    const [present, dismiss] = useIonModal(SongMoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: song
    });
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonIcon
                        className={`${styles.backButton}`}
                        icon={arrowBackOutline}
                        onClick={() => history.goBack()}
                    ></IonIcon>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.image}
                        src={defaultImage}
                    />
                </div>
                <div className={styles.container}>
                    <h1 className={styles.title}>Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit</h1>
                    <p className={styles.artist}>Daft punk</p>
                    <p className={styles.type}>Song</p>
                    <div className={styles.buttons}>
                        {
                            isLiked ?
                                <IonIcon
                                    className={`${styles.heartButtonActivated}`}
                                    icon={heart}
                                    onClick={() => setIsLiked(false)}
                                ></IonIcon> :
                                <IonIcon
                                    className={styles.heartButton}
                                    icon={heartOutline}
                                    onClick={() => setIsLiked(true)}
                                ></IonIcon>
                        }
                        <IonIcon
                            className={styles.moreMenuButton}
                            icon={ellipsisVertical}
                            onClick={() => present()}
                        ></IonIcon>
                        <IonIcon className={styles.playbutton} icon={playCircle}></IonIcon>
                    </div>
                    <div className={styles.addToPlaylistButtonContainer}>
                        <div className={styles.addToPlaylistButton}>
                            <p>Add to playlist</p>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Song;
