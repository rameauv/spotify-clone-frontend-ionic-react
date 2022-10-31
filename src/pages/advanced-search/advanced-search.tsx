import styles from "./advanced-search.module.scss";
import React, {useRef, useState} from "react";
import {IonContent, IonPage} from "@ionic/react";
import SearchInput from "../../components/search-input/search-input";
import SearchSong from "../../components/thumbnails/search-song/search-song";
import {useHistory} from "react-router-dom";
import FilteringTag from "../../components/filtering-tag/filtering-tag";

interface AdvancedSearchProps {
    songPath: string;
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

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({songPath}) => {
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
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AdvancedSearch;
