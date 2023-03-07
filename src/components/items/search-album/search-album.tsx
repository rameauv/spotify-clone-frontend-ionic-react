import styles from './search-album.module.scss';
import {useContext} from 'react';
import {PathsContext, TabRouteParams} from '../../../pages/private-pages-router/private-pages-router';
import {useHistory, useRouteMatch} from 'react-router-dom';
import defaultThumbnails from '../../../assets/defaultThumbnails';

export interface SearchAlbumProps {
    id: string;
    thumbnailUrl?: string;
    title: string;
    artistName: string;
    type: string;
}

export const SearchAlbum: React.FC<SearchAlbumProps> = ({id, title, type, thumbnailUrl, artistName}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const path = useContext(PathsContext).album(tab);
    const history = useHistory();
    const fullpath = `${path}/${id}`;
    const defaultThumbnailurl = defaultThumbnails.musicNote;
    const processedThumbnailUrl = thumbnailUrl ?? defaultThumbnailurl;

    return (
        <div
            className={styles.container}
            onClick={() => history?.push(fullpath)}
        >
            <img
                className={styles.image}
                src={processedThumbnailUrl}
                alt="album's thumbnail"
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{type} . {artistName}</p>
            </div>
        </div>
    );
};
