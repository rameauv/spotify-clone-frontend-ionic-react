import styles from './search-artist.module.scss';
import {useContext} from 'react';
import {PathsContext, TabRouteParams} from '../../../pages/private-pages-router/private-pages-router';
import {useHistory, useRouteMatch} from 'react-router-dom';
import defaultThumbnails from '../../../assets/defaultThumbnails';

export interface SearchArtistProps {
    id: string;
    thumbnailUrl?: string;
    name: string;
}


export const SearchArtist: React.FC<SearchArtistProps> = ({id, name, thumbnailUrl}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const path = useContext(PathsContext).artist(tab);
    const history = useHistory();
    const fullpath = `${path}/${id}`;
    const defaultThumbnailurl = defaultThumbnails.artist;
    const processedThumbnailUrl = thumbnailUrl ?? defaultThumbnailurl;

    return (
        <div onClick={() => history?.push(fullpath)} className={styles.container}>
            <img
                className={styles.image}
                src={processedThumbnailUrl}
                alt="artist's thumbnail"
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{name}</p>
                <p className={styles.description}>Artist . {name}</p>
            </div>
        </div>
    );
};
