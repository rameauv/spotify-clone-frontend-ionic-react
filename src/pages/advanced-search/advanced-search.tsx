import styles from "./advanced-search.module.scss";
import React, {useMemo, useRef, useState} from "react";
import {IonContent, IonPage} from "@ionic/react";
import SearchSong from "../../components/thumbnails/search-song/search-song";
import {useHistory} from "react-router-dom";
import FilteringTag from "../../components/filtering-tag/filtering-tag";
import {searchApi} from "../../tools/client";
import {SearchResultDto} from "../../api";
import {debounce} from 'lodash';
import SearchInput from "../../components/search-input/search-input";
import {SearchAlbum} from "../../components/thumbnails/search-album/search-album";
import {SearchArtist} from "../../components/thumbnails/search-artist/search-artist";

interface AdvancedSearchProps {
    songPath: string;
}

const search = (value: string, callback: (T: SearchResultDto | undefined) => void, myController: AbortController) => {
    searchApi.searchSearchGet(value, undefined, undefined, {
        signal: myController.signal
    })
        .then(searchResult => {
            if (myController.signal.aborted) {
                return;
            }
            console.log(searchResult);
            callback(searchResult.data?.result)
        });
}

const INTERVAL = 500;

const buildSearchManager = (callback: (T: SearchResultDto | undefined) => void) => {
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
    const [selectedTag, setSelectedTag] = useState<undefined | string>(undefined);
    const [searchQuery, _setSearchQuery] = useState<string>("");
    const [results, _setResults] = useState<JSX.Element[]>([]);

    const searchManager = useMemo(() => buildSearchManager(searchResult => {
        if (!searchResult) {
            _setResults([]);
            return;
        }
        const mappedTracks = searchResult.songResult?.map(track => (<SearchSong
            key={track.id}
            id={track.id!}
            title={track.title ?? 'unknown'}
            artistName={track.artistName!}
            imageLink={track.thumbnailUrl ?? undefined}
        ></SearchSong>)) ?? [];
        const mappedAlbums = searchResult.releaseResults?.map(album => (<SearchAlbum
            key={album.id}
            id={album.id!}
            title={album.title ?? 'unknown'}
            artistName={album.artistName!}
            imageLink={album.thumbnailUrl ?? undefined}
            type="Album"
        ></SearchAlbum>)) ?? [];
        const mappedArtists = searchResult.artistResult?.map(artist => (<SearchArtist
            key={artist.id}
            id={artist.id!}
            name={artist.name ?? 'unknown'}
            imageLink={artist.thumbnailUrl ?? undefined}
        ></SearchArtist>)) ?? [];
        const elements = [
            ...mappedTracks,
            ...mappedAlbums,
            ...mappedArtists
        ]
        _setResults(elements);
    }), [songPath]);

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
                    {results}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AdvancedSearch;

