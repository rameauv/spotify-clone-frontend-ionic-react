import styles from './advanced-search.module.scss';
import React, {useEffect, useMemo, useState} from 'react';
import {IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonPage} from '@ionic/react';
import SearchSong from '../../components/thumbnails/search-song/search-song';
import {useHistory} from 'react-router-dom';
import FilteringTag from '../../components/filtering-tag/filtering-tag';
import {debounce} from 'lodash';
import SearchInput from '../../components/search-input/search-input';
import {SearchAlbum} from '../../components/thumbnails/search-album/search-album';
import {SearchArtist} from '../../components/thumbnails/search-artist/search-artist';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchResults, getSearchResults} from '../../store/slices/search-feature/search-slice';
import {IonInfiniteScrollCustomEvent} from '@ionic/core/dist/types/components';

interface SearchState {
    q: string;
    limit: number;
    offset: number;
    doesLoadMore: boolean;
    complete?: () => void;
}

interface AdvancedSearchProps {
}

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
    );
};

const tagsProvider = (selectedTag: string | undefined, handleTagSelection: (tag: string) => void) => {
    return tags.reduce<JSX.Element[]>((previousValue, currentValue) => {
        return [
            ...previousValue,
            tagProvider(currentValue, selectedTag, handleTagSelection)
        ];
    }, []);
};

let searchThunkPromise: any;

const AdvancedSearch: React.FC<AdvancedSearchProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState<undefined | string>(undefined);
    const [searchState, setSearchState] = useState<SearchState>({
        limit: 10,
        offset: 0,
        q: '',
        doesLoadMore: true,
    });
    const [results, setResults] = useState<JSX.Element[]>([]);
    const searchResult = useSelector(getSearchResults);
    useEffect(() => {
        searchResultRequest(searchState);
    }, [searchState]);
    useEffect(() => {
        console.log('new search result');
        if (!searchResult) {
            setResults([]);
            searchState.complete?.();
            return;
        }
        const mappedTracks = searchResult.songResult?.map(track => (<SearchSong
            key={track.id}
            id={track.id}
            title={track.title ?? 'unknown'}
            artistName={track.artistName}
            imageLink={track.thumbnailUrl ?? undefined}
        ></SearchSong>)) ?? [];
        const mappedAlbums = searchResult.releaseResults?.map(album => (<SearchAlbum
            key={album.id}
            id={album.id}
            title={album.title ?? 'unknown'}
            artistName={album.artistName}
            imageLink={album.thumbnailUrl ?? undefined}
            type="Album"
        ></SearchAlbum>)) ?? [];
        const mappedArtists = searchResult.artistResult?.map(artist => (<SearchArtist
            key={artist.id}
            id={artist.id}
            name={artist.name ?? 'unknown'}
            imageLink={artist.thumbnailUrl ?? undefined}
        ></SearchArtist>)) ?? [];
        const elements = [
            ...mappedTracks,
            ...mappedAlbums,
            ...mappedArtists
        ];
        setResults(elements);
        searchState.complete?.();
    }, [searchResult]);

    const searchResultRequest = useMemo(() => {
        return debounce(async ({q, offset, limit, doesLoadMore}: SearchState) => {
            searchThunkPromise?.abort();

            searchThunkPromise = dispatch(fetchSearchResults({q, offset, limit, doesLoadMore}));
            searchThunkPromise.unwrap()
                .catch((e: any) => {
                    console.log(e);
                    if (e?.name !== 'AbortError') {
                        throw e;
                    }
                });
        }, 500, {
            leading: true,
            trailing: true
        });
    }, [dispatch]);
    const handleTagSelection = (value: string) => {
        setSelectedTag(selectedTag === value ? undefined : value);
    };
    const handleSearchQueryChangeEvent = (value: string) => {
        setSearchState({
            ...searchState,
            offset: 0,
            q: value,
            doesLoadMore: false
        });
    };

    const handleLoadMoreEvent = (event: IonInfiniteScrollCustomEvent<any>) => {
        console.log('load more');
        setSearchState({
            ...searchState,
            offset: searchState.offset + searchState.limit,
            doesLoadMore: true,
            complete: () => event.target.complete()
        });
    };

    return (
        <IonPage>
            <IonContent>
                <div className={styles.header}>
                    <SearchInput
                        value={searchState.q}
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
                <IonInfiniteScroll onIonInfinite={(event) => handleLoadMoreEvent(event)}>
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default AdvancedSearch;

