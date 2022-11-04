import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonModal} from '@ionic/react';
import styles from './album.module.scss';
import {arrowBackOutline, ellipsisVerticalSharp, heart, heartOutline, playCircle} from 'ionicons/icons'
import {useContext, useState} from "react";
import SongMoreMenuModal, {SongMoreMenuModalSong} from "../../components/song-more-menu-modal/song-more-menu-modal";
import {Link, useHistory} from "react-router-dom";
import {ArtistPathContext} from "../../App";

const defaultImage = 'https://upload.wikimedia.org/wikipedia/en/d/dc/Orelsan_-_Civilisation.png';
const artistImage = 'https://i0.wp.com/standvibes.com/wp-content/uploads/2022/10/da5745a80a2d85bdf37ec6cf4c44a06c.1000x1000x1.jpg?w=662&ssl=1';

const Album: React.FC = () => {
    const song: SongMoreMenuModalSong = {
        thumbnailUrl: defaultImage,
        title: 'Civilisation',
        artist: 'Orelsan'
    };
    const [isLiked, setIsLiked] = useState<boolean>();
    const [present, dismiss] = useIonModal(SongMoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: song
    });
    const history = useHistory();
    const artistPath = useContext(ArtistPathContext);

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
                    <h1 className={styles.title}>Civilisation</h1>
                    <Link className={styles.artistContainer} to={artistPath}>
                        <img className={styles.artistThumbnail} src={artistImage}/>
                        <p className={styles.artist}>Orelsan</p>
                    </Link>
                    <p className={styles.type}>Album . 2021</p>
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
                            icon={ellipsisVerticalSharp}
                            onClick={() => present()}
                        ></IonIcon>
                        <IonIcon className={styles.playbutton} icon={playCircle}></IonIcon>
                    </div>
                    <div className={styles.songListContainer}>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span className={styles.songListContainer__song__songTitle}>Du propre</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span
                                className={styles.songListContainer__song__songTitle}>Rêves bizzares (feat. Damso)</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span className={styles.songListContainer__song__songTitle}>La Quête</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span className={styles.songListContainer__song__songTitle}>CP_009_Évidemment</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span className={styles.songListContainer__song__songTitle}>L'odeur de l'essence</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__artist}>Orelsan </p>
                        <p>
                            <span className={styles.songListContainer__song__songTitle}>Dernier verre</span>
                            <span className={styles.songListContainer__song__separator}>.</span>
                        </p>
                        <p className={styles.songListContainer__song__more}>and more</p>
                    </div>
                    <p className={styles.releaseDate}>August 30, 2022</p>
                    <Link className={styles.bigArtistContainer} to={artistPath}>
                        <img className={styles.artistThumbnail} src={artistImage}/>
                        <p className={styles.artist}>Orelsan</p>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Album;
