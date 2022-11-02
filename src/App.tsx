import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonProgressBar,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {heart, heartOutline, homeSharp, library, pause, play, searchSharp} from 'ionicons/icons';
import Home from './pages/home/home';
import Search from './pages/search/search';
import Library from './pages/library/library';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './design-system/styles/style.scss'
import AdvancedSearch from "./pages/advanced-search/advanced-search";
import Song from "./pages/song/song";
import React, {useState} from 'react';

import styles from './App.module.scss';
import {StatusBar, Style} from '@capacitor/status-bar';
import LibrarySearch from "./pages/library-search/library-search";
import Tag from "./pages/tag/tag";
import Album from "./pages/album/album";
import Artist from "./pages/artist/artist";

setupIonicReact();
export const SongPathContext = React.createContext('');
export const AlbumPathContext = React.createContext('');
export const PlaylistPathContext = React.createContext('');
export const ArtistPathContext = React.createContext('');

StatusBar.setStyle({
    style: Style.Dark
}).catch(console.error);

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const App: React.FC = () => {
    const [isCurrentSongLiked, setIsCurrentSongLiked] = useState<boolean>(false);
    const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState<boolean>(false);
    return (
        <IonApp className={styles.container}>
            <div className={styles.player}>
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

            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab1" render={({match, history}) => {
                            return (
                                <SongPathContext.Provider value={`${match.url}/song`}>
                                    <AlbumPathContext.Provider value={`${match.url}/album`}>
                                        <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                            <ArtistPathContext.Provider value={`${match.url}/artist`}>
                                                <IonRouterOutlet>
                                                    <Route exact path={match.url} component={Home}/>
                                                    <Route path={`${match.url}/song`} component={Song}/>
                                                    <Route path={`${match.url}/album`} component={Album}/>
                                                    <Route path={`${match.url}/artist`} component={Artist}/>
                                                </IonRouterOutlet>
                                            </ArtistPathContext.Provider>
                                        </PlaylistPathContext.Provider>
                                    </AlbumPathContext.Provider>
                                </SongPathContext.Provider>
                            );
                        }}>
                        </Route>
                        <Route path="/tab2" render={({match, history}) => {
                            return (
                                <SongPathContext.Provider value={`${match.url}/song`}>
                                    <AlbumPathContext.Provider value={`${match.url}/album`}>
                                        <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                            <ArtistPathContext.Provider value={`${match.url}/artist`}>

                                                <IonRouterOutlet>
                                                    <Route exact path={match.url} component={Search}/>
                                                    <Route path={`${match.url}/song`} component={Song}/>
                                                    <Route path={`${match.url}/tag`} component={Tag}/>
                                                    <Route path={`${match.url}/album`} component={Album}/>
                                                    <Route path={`${match.url}/artist`} component={Artist}/>
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
                        <Route path="/tab3" render={({match, history}) => {
                            return (
                                <SongPathContext.Provider value={`${match.url}/song`}>
                                    <AlbumPathContext.Provider value={`${match.url}/album`}>
                                        <PlaylistPathContext.Provider value={`${match.url}/playlist`}>
                                            <ArtistPathContext.Provider value={`${match.url}/artist`}>
                                                <IonRouterOutlet>
                                                    <Route exact path={match.url} component={Library}/>
                                                    <Route exact path={`${match.url}/search`}
                                                           component={LibrarySearch}/>
                                                    <Route path={`${match.url}/song`} component={Song}/>
                                                    <Route path={`${match.url}/album`} component={Album}/>
                                                    <Route path={`${match.url}/artist`} component={Artist}/>
                                                </IonRouterOutlet>
                                            </ArtistPathContext.Provider>
                                        </PlaylistPathContext.Provider>
                                    </AlbumPathContext.Provider>
                                </SongPathContext.Provider>
                            );
                        }}>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab1"/>
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar className={styles.ionTabBar} slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={homeSharp}/>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={searchSharp}/>
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon icon={library}/>
                            <IonLabel>Your library</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
};

export default App;
