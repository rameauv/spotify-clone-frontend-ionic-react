import styles from './search-playlist-base.module.scss';
import {MouseEventHandler} from 'react';
import * as defaultThumbnails from '../../../assets/defaultThumbnails';

export interface SearchPlaylistBaseProps {
    title: string;
    subtitle: string;
    onClick?: MouseEventHandler;
    thumbnailUrl?: string;
}

const SearchPlaylistBase: React.FC<SearchPlaylistBaseProps> =
    ({
         onClick,
         thumbnailUrl,
         subtitle,
         title
     }) => {
        const defaultImage = defaultThumbnails.default.musicNote;

        const processedThumbnailUrl = thumbnailUrl ?? defaultImage;

        return (
            <div onClick={onClick} className={styles.container}>
                <img
                    className={styles.image}
                    src={processedThumbnailUrl}
                    alt="track's thumbnail"
                />
                <div className={styles.textContainer}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>Playlist . {subtitle}</p>
                </div>
            </div>
        );
    };

export default SearchPlaylistBase;
