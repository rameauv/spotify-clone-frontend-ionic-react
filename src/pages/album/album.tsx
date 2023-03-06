import {IonContent, IonHeader, IonIcon, IonPage, useIonModal} from '@ionic/react';
import styles from './album.module.scss';
import {ellipsisVerticalSharp, playCircle} from 'ionicons/icons';
import React, {useContext, useEffect} from 'react';
import MoreMenuModal from '../../components/more-menu-modal/more-menu-modal';
import {Link, useParams, useRouteMatch} from 'react-router-dom';
import {PathsContext, TabRouteParams} from '../private-pages-router/private-pages-router';
import {useDispatch, useSelector} from 'react-redux';
import {MyState} from '../../store/store';
import {fetchAlbum, selectAlbumById} from '../../store/slices/album-slice/album-slice';
import {CachedAlbum} from '../../store/slices/album-slice/models/cachedAlbum';
import {CachedLike, selectLikeByAssociatedId} from '../../store/slices/like-slise/like-slice';
import HeaderWithCenteredTitle from '../../components/headers/header-with-centered-title/header-with-centered-title';
import HeartButton from '../../components/buttons/heart-button/heart-button';
import {addAlbumLikeThunk, deleteAlbumLikeThunk} from '../../store/like/like-thunks';

const defaultImage = 'https://upload.wikimedia.org/wikipedia/en/d/dc/Orelsan_-_Civilisation.png';
const artistImage = 'https://i0.wp.com/standvibes.com/wp-content/uploads/2022/10/da5745a80a2d85bdf37ec6cf4c44a06c.1000x1000x1.jpg?w=662&ssl=1';

const Album: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const artistPath = useContext(PathsContext).artist(tab);
    const dispatch = useDispatch();
    const cachedTrack = useSelector<MyState, CachedAlbum | undefined>(state => selectAlbumById(state, id));
    const cachedLike = useSelector<MyState, CachedLike | undefined>(state => selectLikeByAssociatedId(state, id));
    const album = cachedTrack?.album;
    const fullArtistPath = `${artistPath}/${album?.artistId}`;

    useEffect(() => {
        try {
            dispatch<any>(fetchAlbum({id}));
        } catch (e) {
            console.log(e);
        }
    }, [id, dispatch]);

    const [present, dismiss] = useIonModal(MoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: {
            thumbnailUrl: album?.thumbnailUrl,
            title: album?.title,
            artist: album?.artistName
        }
    });
    const handleLikeButtonEvent = () => {
        if (cachedLike) {
            dispatch<any>(deleteAlbumLikeThunk({id: cachedLike.id, associatedId: id}));
        } else if (album) {
            dispatch<any>(addAlbumLikeThunk({
                id: album.id,
                type: album.albumType,
                title: album.title,
                artistName: album.artistName,
                thumbnailUrl: album.thumbnailUrl,
            }));
        }
    };
    const content = !album ?
        <p>loading...</p> :
        (<>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={album.thumbnailUrl ?? defaultImage}
                />
            </div>
            <div
                data-cy="loaded-content"
                className={styles.container}
            >
                <h1 className={styles.title}>{album.title}</h1>
                <Link
                    className={styles.artistContainer}
                    to={fullArtistPath}
                >
                    <img
                        className={styles.artistThumbnail}
                        src={album.artistThumbnailUrl ?? artistImage}
                        alt="artist thumbnail"
                    />
                    <p className={styles.artist}>{album.artistName}</p>
                </Link>
                <p className={styles.type}>{album.albumType} . {album.releaseDate}</p>
                <div className={styles.buttons}>
                    <div
                        className={styles.heartButton}
                        data-cy="heart-button">
                        <HeartButton
                            isActivated={!!cachedLike}
                            onClick={() => handleLikeButtonEvent()}
                        />
                    </div>
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
                <p className={styles.releaseDate}>{album.releaseDate}</p>
                <Link
                    className={styles.bigArtistContainer}
                    to={fullArtistPath}
                >
                    <img
                        className={styles.artistThumbnail}
                        src={album.artistThumbnailUrl ?? artistImage}
                        alt="artist thumbnail"
                    />
                    <p className={styles.artist}>{album.artistName}</p>
                </Link>
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

export default Album;

