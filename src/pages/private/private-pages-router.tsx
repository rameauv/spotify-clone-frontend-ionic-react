import {IonIcon, IonLabel, IonProgressBar, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import ProfileSettings from "../profile-settings/profile-settings";
import styles from "../../App.module.scss";
import {heart, heartOutline, homeSharp, library, pause, play, searchSharp} from "ionicons/icons";
import Home from "../home/home";
import Song from "../song/song";
import Album from "../album/album";
import Artist from "../artist/artist";
import Search from "../search/search";
import Tag from "../tag/tag";
import AdvancedSearch from "../advanced-search/advanced-search";
import Library from "../library/library";
import LibrarySearch from "../library-search/library-search";
import {Keyboard} from "@capacitor/keyboard";
import {StatusBar, Style} from "@capacitor/status-bar";
import Settings from '../settings/settings';
import {fetechCurrentUser, selectCurrentUserStatus} from "../../features/current-user/current-user-slice";
import {useDispatch, useSelector} from "react-redux";

interface PrivatePagesRouterProps extends RouteComponentProps {
}

export const SongPathContext = React.createContext('');
export const AlbumPathContext = React.createContext('');
export const PlaylistPathContext = React.createContext('');
export const ArtistPathContext = React.createContext('');

StatusBar.setStyle({
    style: Style.Dark
}).catch(console.error);

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';
const PrivatePagesRouter: React.FC<PrivatePagesRouterProps> = (props) => {
    const dispatch = useDispatch();
    const currentUserStatus = useSelector(selectCurrentUserStatus);
    const [ready, setReady] = useState<boolean>(false);
    const [isCurrentSongLiked, setIsCurrentSongLiked] = useState<boolean>(false);
    const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState<boolean>(false);
    const [isPlayerHidden, setIsPlayerHidden] = useState(false);
    useEffect(() => {
        if (currentUserStatus === 'idle') {
            dispatch<any>(fetechCurrentUser()).unwrap();
        }
    }, [currentUserStatus, dispatch]);


    if (!ready) {
        try {
            Keyboard.addListener('keyboardWillShow', () => {
                setIsPlayerHidden(true);
            });
            Keyboard.addListener('keyboardWillHide', () => {
                setIsPlayerHidden(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    if (!ready) {
        setReady(true);
    }
    const loadingContent = (<></>);
    const content = (
        <>
            <div className={styles.player}
                 style={{visibility: isPlayerHidden ? 'hidden' : 'visible', opacity: isPlayerHidden ? 0 : 1}}>
                <div className={styles.playerContainer}>
                    <img className={styles.thumbnail} src={defaultImage}/>
                    <div className={styles.titlesContainer}>
                        <p className={styles.playerTitle}>Je te donne</p>
                        <p className={styles.playerArtist}>Jean-jaques goldman</p>
                    </div>
                    {
                        isCurrentSongLiked ?
                            <IonIcon className={styles.heartButtonActivated} icon={heart}
                                     onClick={() => setIsCurrentSongLiked(false)}></IonIcon> :
                            <IonIcon className={styles.heartButton} icon={heartOutline}
                                     onClick={() => setIsCurrentSongLiked(true)}></IonIcon>
                    }
                    {
                        isCurrentSongPlaying ?
                            <IonIcon className={styles.playButton} icon={pause}
                                     onClick={() => setIsCurrentSongPlaying(false)}></IonIcon> :
                            <IonIcon className={styles.playButton} icon={play}
                                     onClick={() => setIsCurrentSongPlaying(true)}></IonIcon>
                    }
                </div>
                <IonProgressBar className={styles.progress} value={0.4}></IonProgressBar>
            </div>

            <div className={styles.chin}></div>

            {/*<IonReactRouter>*/}
            <IonTabs>
                <IonRouterOutlet>
                    <Route path={`${props.match.url}/tab1`} render={({match, history}) => {
                        return (
                            <SongPathContext.Provider value={`${match.url}/song`}>
                                <AlbumPathContext.Provider value={`${match.url}/album`}>
                                    <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                        <ArtistPathContext.Provider value={`${match.url}/artist`}>
                                            <IonRouterOutlet>
                                                <Route path={match.url} component={Home}/>
                                                <Route path={`${match.url}/song/:id`} component={Song}/>
                                                <Route path={`${match.url}/album/:id`} component={Album}/>
                                                <Route path={`${match.url}/artist/:id`} component={Artist}/>
                                                <Route exact path={`${match.url}/settings`} component={Settings}/>
                                                <Route exact path={`${match.url}/settings/profile-settings`}
                                                       component={ProfileSettings}/>
                                            </IonRouterOutlet>
                                        </ArtistPathContext.Provider>
                                    </PlaylistPathContext.Provider>
                                </AlbumPathContext.Provider>
                            </SongPathContext.Provider>
                        );
                    }}>
                    </Route>
                    <Route path={`${props.match.url}/tab2`} render={({match, history}) => {
                        return (
                            <SongPathContext.Provider value={`${match.url}/song`}>
                                <AlbumPathContext.Provider value={`${match.url}/album`}>
                                    <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                        <ArtistPathContext.Provider value={`${match.url}/artist`}>

                                            <IonRouterOutlet>
                                                <Route exact path={match.url} component={Search}/>
                                                <Route path={`${match.url}/song/:id`} component={Song}/>
                                                <Route path={`${match.url}/tag`} component={Tag}/>
                                                <Route path={`${match.url}/album/:id`} component={Album}/>
                                                <Route path={`${match.url}/artist/:id`} component={Artist}/>
                                                <Route path={`${match.url}/test`}>
                                                    <AdvancedSearch songPath="/tab2/song"/>
                                                </Route>
                                            </IonRouterOutlet>
                                        </ArtistPathContext.Provider>
                                    </PlaylistPathContext.Provider>
                                </AlbumPathContext.Provider>
                            </SongPathContext.Provider>
                        );
                    }}>
                    </Route>
                    <Route path={`${props.match.url}/tab3`} render={({match, history}) => {
                        return (
                            <SongPathContext.Provider value={`${match.url}/song`}>
                                <AlbumPathContext.Provider value={`${match.url}/album`}>
                                    <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                        <ArtistPathContext.Provider value={`${match.url}/artist`}>
                                            <IonRouterOutlet>
                                                <Route exact path={match.url} component={Library}/>
                                                <Route path={`${match.url}/search`} component={LibrarySearch}/>
                                                <Route path={`${match.url}/song/:id`} component={Song}/>
                                                <Route path={`${match.url}/album/:id`} component={Album}/>
                                                <Route path={`${match.url}/artist/:id`} component={Artist}/>
                                                <Route exact path={`${match.url}/settings`} component={Settings}/>
                                                <Route exact path={`${match.url}/settings/profile-settings`}
                                                       component={ProfileSettings}/>
                                            </IonRouterOutlet>
                                        </ArtistPathContext.Provider>
                                    </PlaylistPathContext.Provider>
                                </AlbumPathContext.Provider>
                            </SongPathContext.Provider>
                        );
                    }}/>
                    <Route exact path={`${props.match.url}/`}>
                        <Redirect to={`${props.match.url}/tab1`}/>
                    </Route>
                </IonRouterOutlet>

                <IonTabBar className={styles.ionTabBar} slot="bottom">
                    <IonTabButton tab="tab1" href="/home/tab1">
                        <IonIcon icon={homeSharp}/>
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/home/tab2">
                        <IonIcon icon={searchSharp}/>
                        <IonLabel>Search</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/home/tab3">
                        <IonIcon icon={library}/>
                        <IonLabel>Your library</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
            {/*</IonReactRouter>*/}
        </>
    );
    if (currentUserStatus === 'failed') {
        return (<Redirect to='/'/>);
    }
    return (currentUserStatus === 'succeeded' ? content : loadingContent);
};

export default PrivatePagesRouter;
