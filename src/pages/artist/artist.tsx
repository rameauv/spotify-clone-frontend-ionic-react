import {IonContent, IonIcon, IonPage, useIonModal} from '@ionic/react';
import styles from './artist.module.scss';
import {arrowBackOutline, ellipsisVerticalSharp, playCircle} from 'ionicons/icons'
import React, {useState} from "react";
import SongMoreMenuModal, {SongMoreMenuModalSong} from "../../components/song-more-menu-modal/song-more-menu-modal";
import {useHistory} from "react-router-dom";
import SearchSong from "../../components/thumbnails/search-song/search-song";

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ46fmCsDjEEyOxhiI_yyhUEvR0QFSoHMbepw&usqp=CAU';

const seeButtonProvider = (label: string) => {
    return (
        <div className={styles.seeButtonContainer}>
            <div className={styles.seeButton}>
                <p>{label}</p>
            </div>
        </div>
    )
}

const sectionProvider = (title: string, content: any) => {
    return (
        <div className={styles.section}>
            <p className={styles.section__title}>Popular releases</p>
            {content}
        </div>
    )
}

const Artist: React.FC = () => {
    const song: SongMoreMenuModalSong = {
        thumbnailUrl: defaultImage,
        title: 'Civilisation',
        artist: 'Orelsan'
    };
    const [isLiked, setIsLiked] = useState<boolean>();
    const [bgOpacity, setBgOpacity] = useState(0.3);
    const [headerTitleOpacity, setHeaderTitleOpacity] = useState(0);
    const [titleBg, setTitleBg] = useState('transparent');
    const [headerBg, setHeaderBg] = useState('transparent');
    const [present, dismiss] = useIonModal(SongMoreMenuModal, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        song: song
    });
    const history = useHistory();
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
    return (
        <IonPage className={styles.variables}>
            <IonContent
                className={styles.ionContent}
                style={{
                    "--backgroundOpacity": bgOpacity,
                    "--headerTitleOpacity": headerTitleOpacity,
                    "--headerBg": headerBg,
                    "--titleBg": titleBg
                }}
                scrollEvents
                onIonScroll={(e) => handleScrollEvent(e)}
            >
                <div className={styles.header}>
                    <IonIcon
                        className={`${styles.header__backButton}`}
                        icon={arrowBackOutline}
                        onClick={() => history.goBack()}
                    ></IonIcon>
                    <p className={styles.header__title}>Orelsan</p>
                </div>
                <div className={styles.container}>
                    <h1 className={styles.title}>Orelsan</h1>
                    <div className={styles.solidContainer}>
                        <p className={styles.viewers}>3,498,563 monthly viewers</p>
                        <div className={styles.buttons}>
                            <div className={styles.addToPlaylistButtonContainer}>
                                {
                                    isLiked ?
                                        <div className={styles.addToPlaylistButton}
                                             onClick={() => setIsLiked(false)}
                                        >
                                            <p>Following</p>
                                        </div> :
                                        <div
                                            className={`${styles.addToPlaylistButton} ${styles.addToPlaylistButtonActivated}`}
                                            onClick={() => setIsLiked(true)}
                                        >
                                            <p>Follow</p>
                                        </div>
                                }
                            </div>
                            <IonIcon
                                className={styles.moreMenuButton}
                                icon={ellipsisVerticalSharp}
                                onClick={() => present()}
                            ></IonIcon>
                        </div>
                        <div className={styles.playbuttonContainer}>
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
                        {sectionProvider('Popular release', (
                            <div className={styles.popularRelease}>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                <SearchSong id="fakeId" title="Hope" description="Song - XXXTENTACION"></SearchSong>
                                {seeButtonProvider('See discography')}
                            </div>
                        ))}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Artist;
