import styles from "./tag-page-scroller.module.scss";
import Album from "../thumbnails/album/album";

export interface ContainerProps {
}

const TagPageScroller: React.FC<ContainerProps> = () => {
    return (
        <div className={styles.container}>
            <p className={styles.container__title}>French Variety: New Music Playlists</p>
            <div className={styles.container__scroller}>
                <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
            </div>
        </div>
    );
};

export default TagPageScroller;
