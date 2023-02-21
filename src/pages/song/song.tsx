import {IonContent, IonHeader, IonIcon, IonPage, useIonModal} from '@ionic/react';
import styles from './song.module.scss';
import {ellipsisVertical} from 'ionicons/icons';
import {useEffect} from 'react';
import MoreMenuModal from '../../components/more-menu-modal/more-menu-modal';
import {useParams} from 'react-router-dom';
import {fetchTrack, selectById} from '../../store/slices/track-slice/track-slice';
import {useDispatch, useSelector} from 'react-redux';
import {MyState} from '../../store/store';
import {CachedTrack} from '../../store/slices/track-slice/models/cachedTrack';
import {CachedLike, selectLikeByAssociatedId} from '../../store/slices/like-slise/like-slice';
import HeaderWithCenteredTitle from '../../components/headers/header-with-centered-title/header-with-centered-title';
import RoundOutlineButton from '../../components/buttons/round-outline-button/round-outline-button';
import HeartButton from '../../components/buttons/heart-button/heart-button';
import BigPlayButton from '../../components/buttons/big-play-button/big-play-button';
import {addTrackLikeThunk, deleteTrackLikeThunk} from '../../store/like/like-thunks';

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const Song: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const cachedTrack = useSelector<MyState, CachedTrack | undefined>(state => selectById(state, id));
    const cachedLike = useSelector<MyState, CachedLike | undefined>(state => selectLikeByAssociatedId(state, id));
    const track = cachedTrack?.track;
    const [present, dismiss] = useIonModal(MoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: {
            thumbnailUrl: track?.thumbnailUrl ?? defaultImage,
            title: track?.title,
            artist: track?.artistName
        }
    });
    useEffect(() => {
        dispatch(fetchTrack({id}));
    }, [id, dispatch]);
    const handleLikeButtonEvent = () => {
        if (cachedLike) {
            dispatch(deleteTrackLikeThunk({id: cachedLike.id, associatedId: id}));
        } else if (track) {
            dispatch(addTrackLikeThunk({
                id: track.id,
                title: track.title,
                artist: track.artistName,
                thumbnailUrl: track.thumbnailUrl
            }));
        }
    };
    const content = !track ?
        undefined :
        (<>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={track.thumbnailUrl ?? defaultImage}
                    alt="track's thumbnail"
                />
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>{track.title}</h1>
                <p className={styles.artist}>{track.artistName}</p>
                <p className={styles.type}>Song</p>
                <div className={styles.buttons}>
                    <div className={styles.heartButton}>
                        <HeartButton
                            isActivated={!!cachedLike}
                            onClick={() => handleLikeButtonEvent()}
                        />
                    </div>
                    <IonIcon
                        className={styles.moreMenuButton}
                        icon={ellipsisVertical}
                        onClick={() => present()}
                    ></IonIcon>
                    <div className={styles.playbutton}>
                        <BigPlayButton/>
                    </div>
                </div>
                <div className={styles.addToPlaylistButtonContainer}>
                    <RoundOutlineButton title="Add to playlist"/>
                </div>
            </div>
        </>);
    return (
        <IonPage>
            <IonHeader>
                <HeaderWithCenteredTitle title=""/>
            </IonHeader>
            <IonContent fullscreen>
                {content}
            </IonContent>
        </IonPage>
    );
};

export default Song;
