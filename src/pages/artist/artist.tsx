import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonRouter} from '@ionic/react';
import styles from './artist.module.scss';
import {arrowBackOutline, ellipsisVerticalSharp} from 'ionicons/icons'
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SearchSong from "../../components/thumbnails/search-song/search-song";
import {useDispatch, useSelector} from "react-redux";
import {MyState} from "../../store/store";
import {CachedArtist} from "../../store/slices/artist-slice/models/cachedArtist";
import {fetchArtist, selectArtistById} from "../../store/slices/artist-slice/artist-slice";
import {
    addArtistLikeThunk,
    CachedLike,
    deleteLikeThunk,
    selectLikeByAssociatedId
} from "../../store/slices/like-slise/like-slice";
import BigPlayButton from "../../components/buttons/big-play-button/big-play-button";
import FollowButton from "../../components/buttons/follow-button/follow-button";
import RoundOutlineButton from "../../components/buttons/round-outline-button/round-outline-button";
import IconButton, {IconButtonSize} from "../../components/buttons/icon-button/icon-button";

const sectionProvider = (title: string, content: any) => {
    return (
        <div className={styles.section}>
            <p className={styles.section__title}>Popular releases</p>
            {content}
        </div>
    )
}

const Artist: React.FC = () => {
    const [bgOpacity, setBgOpacity] = useState(0.3);
    const [headerTitleOpacity, setHeaderTitleOpacity] = useState(0);
    const [titleBg, setTitleBg] = useState('transparent');
    const [headerBg, setHeaderBg] = useState('transparent');
    const router = useIonRouter();
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const cachedArtist = useSelector<MyState, CachedArtist | undefined>(state => selectArtistById(state, id));
    const cachedLike = useSelector<MyState, CachedLike | undefined>(state => selectLikeByAssociatedId(state, id));
    const artist = cachedArtist?.artist;

    useEffect(() => {
        try {
            dispatch<any>(fetchArtist({id}));
        } catch (e) {
            console.log(e);
        }
    }, [id, dispatch]);

    const handleScrollEvent = (e: any) => {
        const scrollTop = e.detail.scrollTop;
        const tempBgOpacity = ((scrollTop / 176) * 0.6) + 0.4;
        const tempTitleOpacity = (scrollTop - 206) / (276 - 206);
        const tempTitleBg = scrollTop >= 213 ? 'linear-gradient(180deg, var(--accentColor) var(--titleGradientStart), var(--app-color-backgroud-1) var(--titleGradientEnd))' : 'transparent';
        const tempHeaderBg = scrollTop >= 206 ? 'linear-gradient(180deg, var(--accentColor) 0px, var(--accentColor) var(--contentGradientStartPos), var(--app-color-backgroud-1) var(--contentGradientEndPos))' : 'transparent'
        setHeaderBg(tempHeaderBg);
        setHeaderTitleOpacity(tempTitleOpacity);
        setBgOpacity(tempBgOpacity);
        setTitleBg(tempTitleBg)
    }

    const handleFollowButtonEvent = () => {
        if (cachedLike) {
            dispatch<any>(deleteLikeThunk({id: cachedLike.id, associatedId: id}));
        } else {
            dispatch<any>(addArtistLikeThunk({id}));
        }
    };
    const content = !artist ?
        (<>
            <IonHeader>
                <IonToolbar>
                    <div className={styles.noContentHeader}>
                        <IonIcon
                            className={styles.noContentHeader__backButton}
                            icon={arrowBackOutline}
                            onClick={() => router.goBack()}
                        />
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            </IonContent>
        </>) :
        (<>
            <IonContent
                className={styles.ionContent}
                style={{
                    "--backgroundOpacity": bgOpacity,
                    "--headerTitleOpacity": headerTitleOpacity,
                    "--headerBg": headerBg,
                    "--titleBg": titleBg,
                    "--artistImage": `url("${artist.thumbnailUrl}")`,
                }}
                scrollEvents
                onIonScroll={(e) => handleScrollEvent(e)}
            >
                <div className={styles.header}>
                    <div className={styles.header__backButton}>
                        <IconButton
                            icon={arrowBackOutline}
                            onClick={() => router.goBack()}
                            size={IconButtonSize.MD}
                        ></IconButton>
                    </div>
                    <p className={styles.header__title}>{artist.name}</p>
                </div>
                <div className={styles.container}>
                    <h1 className={styles.title}>{artist.name}</h1>
                    <div className={styles.solidContainer}>
                        <p className={styles.viewers}>{artist.monthlyListeners} monthly viewers</p>
                        <div className={styles.buttons}>
                            <div className={styles.addToPlaylistButtonContainer}>
                                <FollowButton
                                    isFollowing={!!cachedLike}
                                    onClick={() => handleFollowButtonEvent()}
                                />
                            </div>
                            <IonIcon
                                className={styles.moreMenuButton}
                                icon={ellipsisVerticalSharp}
                            ></IonIcon>
                        </div>
                        <div className={styles.playbuttonContainer}>
                            <BigPlayButton/>
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
                        {sectionProvider('Popular release', (
                            <div className={styles.popularRelease}>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope"
                                            artistName="Song - XXXTENTACION"></SearchSong>
                                <div className={styles.seeButtonContainer}>
                                    <RoundOutlineButton title="See discography"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </IonContent>
        </>);

    return (
        <IonPage className={styles.variables}>
            {content}
        </IonPage>
    );
};

export default Artist;
