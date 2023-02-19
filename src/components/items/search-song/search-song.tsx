import styles from './search-song.module.scss';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useContext} from 'react';
import {PathsContext, TabRouteParams} from '../../../pages/private-pages-router/private-pages-router';
import * as defaultThumbnails from '../../../assets/defaultThumbnails';

interface ContainerProps {
    id: string;
    thumbnailUrl?: string;
    title: string;
    artistName: string;
}

const SearchSong: React.FC<ContainerProps> = ({id, title, artistName, thumbnailUrl}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const songPath = useContext(PathsContext).track(tab);
    const history = useHistory();
    const fullpath = `${songPath}/${id}`;
    const defaultImage = defaultThumbnails.default.musicNote;
    const processedThumbnailUrl = thumbnailUrl ?? defaultImage;

    return (
        <div onClick={() => history?.push(fullpath)} className={styles.container}>
            <img
                className={styles.image}
                src={processedThumbnailUrl}
                alt="track's thumbnail"
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>Song . {artistName}</p>
            </div>
        </div>
    );
};

export default SearchSong;
