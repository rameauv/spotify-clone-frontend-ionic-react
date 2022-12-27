import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import styles from './library.module.scss';
import Filter, {Tag} from "../../components/filter/filter";
import React, {useState} from "react";
import SearchSong from "../../components/thumbnails/search-song/search-song";
import LibrarySortButton from "../../components/library-sort-button/library-sort-button";
import {addOutline, searchOutline} from 'ionicons/icons';
import {useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";

interface LibraryProps extends RouteComponentProps {
}

const Library: React.FC<LibraryProps> = (props) => {
    const tags: Tag[] = [
        {
            value: 'Playlists',
            id: 'Playlists'
        },
        {
            value: 'Artists',
            id: 'Artists'
        }
    ];
    const [selectedSort, setSelectedSort] = useState<string | undefined>('most-recent');
    const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
    const history = useHistory();
    const _handleSearchButtonEvent = () => {
        history.push(`${props.match.url}/search`);
    };
    const _handleSettingsButtonEvent = () => {
        history.push(`${props.match.url}/settings`);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className={styles.header}>
                        <div className={styles.profileIcon}
                             onClick={() => _handleSettingsButtonEvent()}><p>V</p>
                        </div>
                        <p className="app-mr-auto app-font-h2 app-font-bold">Your library</p>
                        <div className={styles.headerButtons}>
                            <IonIcon
                                className={styles.headerButton}
                                icon={searchOutline}
                                onClick={() => _handleSearchButtonEvent()}
                            ></IonIcon>
                            <IonIcon className={styles.headerButton} icon={addOutline}></IonIcon>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen forceOverscroll={true}>
                <div className={styles.tags}>
                    <Filter tags={tags} onTagSelected={id => setSelectedTagId(id)}
                            selectedTagId={selectedTagId}></Filter>
                </div>
                <div className={styles.filterContainer}>
                    <LibrarySortButton selectedId={selectedSort} onSelected={(id) => setSelectedSort(id)}/>
                </div>
                <div className={styles.results}>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                    <SearchSong id="5W3cjX2J3tjhG8zb6u0qHn" title="Hope" artistName="Song - XXXTENTACION"></SearchSong>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Library;
