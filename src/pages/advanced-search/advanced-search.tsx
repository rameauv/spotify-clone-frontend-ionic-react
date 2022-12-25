import styles from "./advanced-search.module.scss";
import React, {useMemo, useRef, useState} from "react";
import {IonContent, IonPage} from "@ionic/react";
import SearchSong from "../../components/thumbnails/search-song/search-song";
import {useHistory} from "react-router-dom";
import FilteringTag from "../../components/filtering-tag/filtering-tag";
import {searchApi} from "../../tools/client";
import {SongResultDto} from "../../api";
import {debounce} from 'lodash';
import SearchInput from "../../components/search-input/search-input";

interface AdvancedSearchProps {
    songPath: string;
}

const search = (value: string, callback: (T: SongResultDto[]) => void, myController: AbortController) => {
    searchApi.searchSearchGet(value, undefined, undefined, {
        signal: myController.signal
    })
        .then(searchResult => {
            if (myController.signal.aborted) {
                return;
            }
            const songs = searchResult.data?.result?.songResult
            console.log(searchResult);
            callback(songs ?? [])
        });
}

const INTERVAL = 500;

const buildSearchManager = (callback: (T: SongResultDto[]) => void) => {
    let controller = new AbortController();
    const debounceSearch = debounce(search, INTERVAL, {
        leading: true,
        trailing: true,
        maxWait: INTERVAL
    })

    return {
        search: (value: string) => {
            controller.abort();
            controller = new AbortController();
            debounceSearch(value, callback, controller);
        },
        cancel: () => {
            controller.abort();
        }
    }
};

const tags = ['Top', 'Podcasts & Shows', 'Songs', 'Artists', 'Profiles', 'Albums', 'Playlists', 'Genres & Moods'];
const tagProvider = (text: string, selectedTag: string | undefined, handleTagSelection: (tag: string) => void) => {
    return (
        <FilteringTag
            key={text}
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
    const searchManager = useMemo(() => buildSearchManager(songs => {
        _setResults(songs)
    }), [songPath]);
    const [selectedTag, setSelectedTag] = useState<undefined | string>(undefined);
    const [searchQuery, _setSearchQuery] = useState<string>("");
    const [results, _setResults] = useState<SongResultDto[]>([]);

    const modal: any = useRef<HTMLIonModalElement>(null);
    const history = useHistory();
    const handleTagSelection = (value: string) => {
        setSelectedTag(selectedTag === value ? undefined : value);
    };
    const handleSearchQueryChangeEvent = (value: string) => {
        _setSearchQuery(value);
        searchManager.cancel();
        if (!value.trim()) {
            _setResults([]);
            return;
        }
        console.log('search:' + value);
        searchManager.search(value);
    };

    return (
        <IonPage>
            <IonContent>
                <div className={styles.header}>
                    <SearchInput
                        value={searchQuery}
                        onChange={handleSearchQueryChangeEvent}
                        onBack={() => history.goBack()}
                    ></SearchInput>
                    <div className={styles.tags}>
                        {tagsProvider(selectedTag, handleTagSelection)}
                    </div>
                </div>
                <div className={styles.results}>
                    {results?.map(track =>
                        (<SearchSong
                            key={track.id}
                            id={track.id!}
                            title={track.title ?? 'unknown'}
                            description={`Song - ${track.artistName ?? 'unknown'}`}
                            imageLink={track.thumbnailUrl ?? undefined}
                        ></SearchSong>))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AdvancedSearch;

