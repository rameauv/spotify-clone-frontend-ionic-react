import styles from './advanced-search.module.scss';
import React, {useEffect, useMemo, useState} from 'react';
import {IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonPage} from '@ionic/react';
import SearchSong from '../../components/items/search-song/search-song';
import {useHistory} from 'react-router-dom';
import FilteringTag from '../../components/filtering-tag/filtering-tag';
import {debounce} from 'lodash';
import SearchInput from '../../components/search-input/search-input';
import {SearchAlbum} from '../../components/items/search-album/search-album';
import {SearchArtist} from '../../components/items/search-artist/search-artist';
import {useDispatch, useSelector} from 'react-redux';
import * as SearchSlice from '../../store/slices/search-slice/search-slice';
import {IonInfiniteScrollCustomEvent} from '@ionic/core/dist/types/components';

enum SearchType {
    SONGS,
    ARTISTS,
    ALBUMS
}

interface SearchState {
    q: string;
    limit: number;
    offset: number;
    doesLoadMore: boolean;
    complete?: () => void;
    searchType?: SearchType
}

interface AdvancedSearchProps {
}

const tags = [
    {label: 'Songs', id: SearchType.SONGS},
    {label: 'Artists', id: SearchType.ARTISTS},
    {label: 'Albums', id: SearchType.ALBUMS}
];
const tagProvider = (tag: { label: string, id: SearchType }, selectedTagId: SearchType | undefined, handleTagSelection: (tagId: SearchType) => void) => {
    return (
        <FilteringTag
            key={tag.id}
            onClick={() => handleTagSelection(tag.id)}
            activated={selectedTagId === tag.id}
        >
            {tag.label}
        </FilteringTag>
    );
};

const tagsProvider = (selectedTag: SearchType | undefined, handleTagSelection: (tagId: SearchType) => void) => {
    return tags.reduce<JSX.Element[]>((previousValue, currentValue) => {
        return [
            ...previousValue,
            tagProvider(currentValue, selectedTag, handleTagSelection)
        ];
    }, []);
};

function searchStateToFetchSearchResultArgs(searchState: SearchState): SearchSlice.FetchSearchResultOptions {
    function convertType(filter: SearchType | undefined): SearchSlice.SearchType | undefined {
        if (filter === undefined) {
            return undefined;
        }
        switch (filter) {
            case SearchType.ALBUMS:
                return SearchSlice.SearchType.ALBUMS;
            case SearchType.SONGS:
                return SearchSlice.SearchType.SONGS;
            case SearchType.ARTISTS:
                return SearchSlice.SearchType.ARTISTS;
        }
        console.error('could not map this filter:', filter);
        return undefined;
    }

    return {
        q: searchState.q,
        limit: searchState.limit,
        offset: searchState.offset,
        doesLoadMore: searchState.doesLoadMore,
        searchType: convertType(searchState.searchType)
    };
}

let searchThunkPromise: any;

const AdvancedSearch: React.FC<AdvancedSearchProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // const [selectedTag, setSelectedTag] = useState<undefined | string>(undefined);
    const [searchState, setSearchState] = useState<SearchState>({
        limit: 10,
        offset: 0,
        q: '',
        doesLoadMore: true,
    });
    const [results, setResults] = useState<JSX.Element[]>([]);
    const searchResult = useSelector(SearchSlice.getSearchResults);
    useEffect(() => {
        searchResultRequest(searchStateToFetchSearchResultArgs(searchState));
    }, [searchState]);
    useEffect(() => {
        console.log('new search result');
        if (!searchResult) {
            setResults([]);
            searchState.complete?.();
            return;
        }
        const mappedTracks = searchResult.songResult?.map(track => ({
            order: track.order,
            element: <SearchSong
                key={track.id}
                id={track.id}
                title={track.title ?? 'unknown'}
                artistName={track.artistName}
                thumbnailUrl={track.thumbnailUrl ?? undefined}
            ></SearchSong>
        })) ?? [];
        const mappedAlbums = searchResult.albumResult?.map(album => ({
            order: album.order,
            element: <SearchAlbum
                key={album.id}
                id={album.id}
                title={album.title ?? 'unknown'}
                artistName={album.artistName}
                thumbnailUrl={album.thumbnailUrl ?? undefined}
                type="Album"
            ></SearchAlbum>
        })) ?? [];
        const mappedArtists = searchResult.artistResult?.map(artist => ({
            order: artist.order,
            element: <SearchArtist
                key={artist.id}
                id={artist.id}
                name={artist.name ?? 'unknown'}
                thumbnailUrl={artist.thumbnailUrl ?? undefined}
            ></SearchArtist>
        })) ?? [];
        const elements = [
            ...mappedTracks,
            ...mappedAlbums,
            ...mappedArtists
        ].sort((a, b) => a.order - b.order)
            .map(value => value.element);

        setResults(elements);
        searchState.complete?.();
    }, [searchResult]);

    const searchResultRequest = useMemo(() => {
        return debounce(async ({q, offset, limit, doesLoadMore, searchType}: SearchState) => {
            searchThunkPromise?.abort();

            searchThunkPromise = dispatch(SearchSlice.fetchSearchResults({
                q,
                offset,
                limit,
                doesLoadMore,
                searchType: searchType
            }));
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
    const handleTagSelection = (value: SearchType) => {
        setSearchState((currentSearchState) => {
            const {searchType: currentFilter} = currentSearchState;
            const newFilter = currentFilter !== undefined && currentFilter === value ? undefined : value;
            return {
                ...currentSearchState,
                searchType: newFilter,
                doesLoadMore: false
            };
        });
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
                        {tagsProvider(searchState.searchType, handleTagSelection)}
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

