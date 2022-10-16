import styles from "./search-modal.module.scss";
import React, {useRef, useState} from "react";
import {IonContent, IonPage} from "@ionic/react";
import SearchInput from "../search-input/search-input";
import FilteringTag from "../filtering-tag/filtering-tag";
import SearchSong from "../thumbnails/search-song/search-song";
import * as H from "history";
import {useHistory} from "react-router-dom";

interface SearchModalProps {
    // onDismiss: (data?: any, role?: string) => void;
    songPath: string;
    history?: H.History<any>;
}

const tags = ['Top', 'Podcasts & Shows', 'Songs', 'Artists', 'Profiles', 'Albums', 'Playlists', 'Genres & Moods'];

const tagProvider = (text: string, selectedTag: string | undefined, handleTagSelection: (tag: string) => void) => {
    return (
        <FilteringTag
            onClick={() => handleTagSelection(text)}
            activated={selectedTag === text}
        >
            {text}
        </FilteringTag>
    )
}

const tagsProvider = (selectedTag: string | undefined, handleTagSelection: (tag: string) => void) => {
    return tags.reduce<JSX.Element[]>((previousValue, currentValue) => {
        return [
            ...previousValue,
            tagProvider(currentValue, selectedTag, handleTagSelection)
        ]
    }, [])
}

export const SongPathContext = React.createContext('');
export const HistoryContext = React.createContext<H.History<any> | undefined>(undefined);
const SearchModal: React.FC<SearchModalProps> = ({songPath}) => {
    const modal: any = useRef<HTMLIonModalElement>(null);
    const history = useHistory();
    const handleTagSelection = (value: string) => {
        setSelectedTag(selectedTag === value ? undefined : value);
    };
    const [selectedTag, setSelectedTag] = useState<undefined | string>(undefined);

    return (
        <IonPage>
            <IonContent>
                <div className={styles.header}>
                    <SearchInput onBack={() => history.goBack()}></SearchInput>
                    <div className={styles.tags}>
                        {tagsProvider(selectedTag, handleTagSelection)}
                    </div>
                </div>
                <div className={styles.results}>
                    <SongPathContext.Provider value={songPath}>
                        <HistoryContext.Provider value={history}>
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
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                            <SearchSong title="Hope" description="Song - XXXTENTACION"></SearchSong>
                        </HistoryContext.Provider>
                    </SongPathContext.Provider>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SearchModal;
