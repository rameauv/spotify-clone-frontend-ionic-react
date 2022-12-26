import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonModal} from '@ionic/react';
import styles from './song.module.scss';
import {arrowBackOutline, ellipsisVertical, heart, heartOutline, playCircle} from 'ionicons/icons'
import {useEffect, useState} from "react";
import SongMoreMenuModal from "../../components/song-more-menu-modal/song-more-menu-modal";
import {useHistory, useParams} from "react-router-dom";
import {fetchTrack, selectById} from '../../features/track-slice/track-slice';
import {useDispatch, useSelector} from "react-redux";
import {MyState} from "../../store/store";
import {CachedTrack} from "../../features/track-slice/models/cachedTrack";
import {
    addTrackLikeThunk,
    CachedLike,
    deleteLikeThunk,
    selectLikeByAssociatedId
} from "../../features/like-slise/like-slice";

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const Song: React.FC = () => {
    const [isLiked, setIsLiked] = useState<boolean>();
    const history = useHistory();
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const cachedTrack = useSelector<MyState, CachedTrack | undefined>(state => selectById(state, id));
    const cachedLike = useSelector<MyState, CachedLike | undefined>(state => selectLikeByAssociatedId(state, id));
    const status = cachedTrack?.status;
    const track = cachedTrack?.track;
    const [present, dismiss] = useIonModal(SongMoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: {
            thumbnailUrl: track?.thumbnailUrl ?? defaultImage,
            title: track?.title,
            artist: track?.artistName
        }
    });
    useEffect(() => {
        // if (!cachedTrack || status === "idle") {
        dispatch<any>(fetchTrack({id}));
        // }
    }, [id, dispatch]);
    const handleLikeButtonEvent = () => {
        if (cachedLike) {
            dispatch<any>(deleteLikeThunk({id: cachedLike.id, associatedId: id}));
        } else {
            dispatch<any>(addTrackLikeThunk({id}));
        }
    };
    const content = !track ?
        undefined :
        (<>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={track.thumbnailUrl ?? defaultImage}
                />
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>{track.title}</h1>
                <p className={styles.artist}>{track.artistName}</p>
                <p className={styles.type}>Song</p>
                <div className={styles.buttons}>
                    {
                        cachedLike ?
                            <IonIcon
                                className={`${styles.heartButtonActivated}`}
                                icon={heart}
                                onClick={() => handleLikeButtonEvent()}
                            ></IonIcon> :
                            <IonIcon
                                className={styles.heartButton}
                                icon={heartOutline}
                                onClick={() => handleLikeButtonEvent()}
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
        </>);
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
                {content}
            </IonContent>
        </IonPage>
    );
};

export default Song;
