import {IonContent, IonPage} from '@ionic/react';
import styles from './library.module.scss';
import Filter, {Tag} from "../../components/filter/filter";
import React, {useState} from "react";
import SearchSong from "../../components/thumbnails/search-song/search-song";

const Library: React.FC = (props) => {
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
    console.log(props);
    const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={styles.header}>
                    <div className={styles.profileIcon}><p>V</p></div>
                    <p className="app-mr-auto app-font-h2 app-font-bold">Your library</p>
                </div>
                <div className={styles.tags}>
                    <Filter tags={tags} onTagSelected={id => setSelectedTagId(id)}
                            selectedTagId={selectedTagId}></Filter>
                </div>
                <div className={styles.results}>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                    <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Library;
