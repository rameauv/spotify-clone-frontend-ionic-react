import {IonIcon, IonLabel, IonProgressBar, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import ProfileSettings from "../profile-settings/profile-settings";
import styles from './private-pages-router.module.scss';
import {homeSharp, library, searchSharp} from "ionicons/icons";
import Home from "../home/home";
import Song from "../song/song";
import Album from "../album/album";
import Artist from "../artist/artist";
import Search from "../search/search";
import Tag from "../tag/tag";
import AdvancedSearch from "../advanced-search/advanced-search";
import Library from "../library/library";
import {Keyboard} from "@capacitor/keyboard";
import {StatusBar, Style} from "@capacitor/status-bar";
import Settings from '../settings/settings';
import LibrarySearch from "../library-search/library-search";
import HeartButton from "../../components/buttons/heart-button/heart-button";
import PlayButton from "../../components/buttons/play-button/play-button";

interface PrivatePagesRouterProps extends RouteComponentProps {
}

export interface TabRouteParams {
    tab: string
}

StatusBar.setStyle({
    style: Style.Dark
}).catch(console.error);


interface Paths {
    feed: string;
    track: (tab: string) => string;
    album: (tab: string) => string;
    artist: (tab: string) => string;
    settings: (tab: string) => string;
    ['settings-profileSettings']: (tab: string) => string;
    ['serach-advanceSearch']: (tab: string) => string;
}

export const PathsContext = React.createContext<Paths>({
    feed: '',
    track: (tab: string) => '',
    album: (tab: string) => '',
    artist: (tab: string) => '',
    settings: (tab: string) => '',
    'settings-profileSettings': (tab: string) => '',
    'serach-advanceSearch': (tab: string) => ''
});

const createPaths = (basePath: string) => {
    const paths: Paths = {
        feed: `${basePath}/feed`,
        track: (tab: string) => `${basePath}/${tab}/song`,
        album: (tab: string) => `${basePath}/${tab}/album`,
        artist: (tab: string) => `${basePath}/${tab}/artist`,
        settings: (tab: string) => `${basePath}/${tab}/settings`,
        'settings-profileSettings': (tab: string) => `${basePath}/${tab}/settings/profile-settings`,
        'serach-advanceSearch': (tab: string) => `${basePath}/${tab}/advanced`
    };
    return paths;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const PrivatePagesRouter: React.FC<PrivatePagesRouterProps> = (props) => {
    const [ready, setReady] = useState<boolean>(false);
    const [isCurrentSongLiked, setIsCurrentSongLiked] = useState<boolean>(false);
    const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState<boolean>(false);
    const [isPlayerHidden, setIsPlayerHidden] = useState(false);

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
    return (
        <PathsContext.Provider value={createPaths(props.match.url)}>
            <PathsContext.Consumer>
                {paths => (<>
                    <div className={styles.player}
                         style={{
                             visibility: isPlayerHidden ? 'hidden' : 'visible',
                             opacity: isPlayerHidden ? 0 : 1
                         }}>
                        <div className={styles.playerContainer}>
                            <img className={styles.thumbnail} src={defaultImage}/>
                            <div className={styles.titlesContainer}>
                                <p className={styles.playerTitle}>Je te donne</p>
                                <p className={styles.playerArtist}>Jean-jaques goldman</p>
                            </div>
                            <div className={styles.heartButton}>
                                <HeartButton
                                    isActivated={isCurrentSongLiked}
                                    onClick={() => setIsCurrentSongLiked(!isCurrentSongLiked)}
                                />
                            </div>
                            <PlayButton
                                isPlaying={isCurrentSongPlaying}
                                onClick={() => setIsCurrentSongPlaying(!isCurrentSongPlaying)}
                            />
                        </div>
                        <IonProgressBar className={styles.progress} value={0.4}></IonProgressBar>
                    </div>

                    <div className={styles.chin}></div>

                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path={`${props.match.url}`}>
                                <Redirect to={paths.feed}/>
                            </Route>
                            {/*Feed*/}
                            <Route exact path={`${props.match.url}/:tab(feed)`} component={Home}/>
                            {/*Search*/}
                            <Route exact path={`${props.match.url}/:tab(search)`} component={Search}/>
                            <Route path={`${props.match.url}/:tab(search)/tag`} component={Tag}/>
                            <Route
                                path={`${props.match.url}/:tab(search)/advanced`}
                                component={AdvancedSearch}
                            />
                            {/*Library*/}
                            <Route exact path={`${props.match.url}/:tab(library)`} component={Library}/>
                            {/*Shared*/}
                            <Route path={`${props.match.url}/:tab(library)/search`} component={LibrarySearch}/>
                            <Route path={`${props.match.url}/:tab/song/:id`} component={Song}/>
                            <Route path={`${props.match.url}/:tab/album/:id`} component={Album}/>
                            <Route path={`${props.match.url}/:tab/artist/:id`} component={Artist}/>
                            <Route exact path={`${props.match.url}/:tab/settings`} component={Settings}/>
                            <Route
                                path={`${props.match.url}/:tab/settings/profile-settings`}
                                component={ProfileSettings}
                            />
                        </IonRouterOutlet>

                        <IonTabBar className={styles.ionTabBar} slot="bottom">
                            <IonTabButton tab="feed" href="/home/feed">
                                <IonIcon icon={homeSharp}/>
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="search" href="/home/search">
                                <IonIcon icon={searchSharp}/>
                                <IonLabel>Search</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="library" href="/home/library">
                                <IonIcon icon={library}/>
                                <IonLabel>Your library</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </>)}
            </PathsContext.Consumer>
        </PathsContext.Provider>
    );
};

export default PrivatePagesRouter;
