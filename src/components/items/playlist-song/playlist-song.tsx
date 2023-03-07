import styles from './playlist-song.module.scss';
import defaultThumbnails from '../../../assets/defaultThumbnails';
import HeartButton from '../../buttons/heart-button/heart-button';

export interface PlaylistSongProps {
    id: string;
    title: string;
    artist: string;
    isLiked: boolean;
    thumbnailUrl?: string;
    onLikeButtonClick?: () => void;
}

const PlaylistSong: React.FC<PlaylistSongProps> =
    ({thumbnailUrl, id, artist, title, isLiked, onLikeButtonClick}) => {
        const processedThumbnailUrl = thumbnailUrl ?? defaultThumbnails.musicNote;

        function handeheartButtonClickEvent() {
            onLikeButtonClick?.();
        }

        return (
            <div className={styles.container}>
                <img
                    className={styles.thumbnail}
                    src={processedThumbnailUrl}
                />
                <div className={styles.centerContainer}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.artist}>{artist}</p>
                </div>
                <div className={styles.heartButton}>
                    <HeartButton
                        isActivated={isLiked}
                        onClick={handeheartButtonClickEvent}
                    />
                </div>
            </div>
        );
    };

export default PlaylistSong;
