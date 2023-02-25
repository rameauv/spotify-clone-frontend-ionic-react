import {IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonToolbar} from '@ionic/react';
import styles from './library.module.scss';
import Filter, {Tag} from '../../components/filter/filter';
import React, {useMemo, useState} from 'react';
import LibrarySortButton from '../../components/library-sort-button/library-sort-button';
import {addOutline, searchOutline} from 'ionicons/icons';
import {useHistory} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import IconButton, {IconButtonSize} from '../../components/buttons/icon-button/icon-button';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../../store/slices/current-user/current-user-slice';
import SearchLikedSongsPlaylist from '../../components/items/search-liked-songs-playlist/search-liked-songs-playlist';
import {
    fetchLibraryItems,
    LibraryItems,
    selectItemsResults,
    selectLikedSongsCount
} from '../../store/slices/library-slice/library-slice';
import {SearchAlbum} from '../../components/items/search-album/search-album';
import {SearchArtist} from '../../components/items/search-artist/search-artist';
import {IonInfiniteScrollCustomEvent} from '@ionic/core/dist/types/components';

interface LibraryProps extends RouteComponentProps {
}

function useItemResults(results: LibraryItems | undefined): JSX.Element[] {
    return useMemo(() => {
        if (results === undefined) {
            return [];
        }
        const albumSortableElements = results.albums.map(album => ({
            updatedAt: album.likeCreatedAt,
            element: (
                <SearchAlbum
                    key={album.id}
                    id={album.id}
                    title={album.title}
                    artistName={album.artistName}
                    type={album.type}
                    thumbnailUrl={album.thumbnailUrl}
                />)
        }));
        const artistSortableElements = results.artists.map(artist => ({
            updatedAt: artist.likeCreatedAt,
            element: (
                <SearchArtist key={artist.id} id={artist.id} name={artist.name} thumbnailUrl={artist.thumbnailUrl}/>
            )
        }));
        return [
            ...albumSortableElements,
            ...artistSortableElements
        ].sort((a, b) => b.updatedAt - a.updatedAt)
            .map(item => item.element);
    }, [results]);
}

const Library: React.FC<LibraryProps> = (props) => {
    const dispatch = useDispatch();
    const profileTitle = useSelector(selectCurrentUser)?.name ?? '';
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
    const likedSongsCount = useSelector(selectLikedSongsCount);
    const results = useSelector(selectItemsResults);
    console.log(results);
    const items = useItemResults(results);

    function handleSearchButtonEvent() {
        history.push(`${props.match.url}/search`);
    }

    function handleSettingsButtonEvent() {
        history.push(`${props.match.url}/settings`);
    }

    async function handleOnInfiniteScroll(event: IonInfiniteScrollCustomEvent<any>) {
        console.log(event);
        await dispatch(fetchLibraryItems({doesLoadMore: true})).unwrap();
        event.target.complete();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className={styles.header}>
                        <div className={styles.profileIcon}
                             onClick={() => handleSettingsButtonEvent()}><p>{profileTitle[0]}</p>
                        </div>
                        <p className="app-mr-auto app-font-h2 app-font-bold">Your library</p>
                        <div className={styles.headerButtons}>
                            <IconButton
                                icon={searchOutline}
                                size={IconButtonSize.MD}
                                onClick={() => handleSearchButtonEvent()}
                            ></IconButton>
                            <IconButton
                                icon={addOutline}
                                size={IconButtonSize.MD}
                            ></IconButton>
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
                    <SearchLikedSongsPlaylist songsCount={likedSongsCount}/>
                    {items}
                </div>
                <IonInfiniteScroll onIonInfinite={(event) => handleOnInfiniteScroll(event)}>
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default Library;
