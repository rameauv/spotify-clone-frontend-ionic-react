import styles from "./tag-page-scroller.module.scss";
import Playlist from "../thumbnails/playlist/playlist";

export interface ContainerProps {
}

const TagPageScroller: React.FC<ContainerProps> = () => {
    return (
        <div className={styles.container}>
            <p className={styles.container__title}>French Variety: New Music Playlists</p>
            <div className={styles.container__scroller}>
                <Playlist title={'I.O.I, MOMOLAND, IVE ans more'}></Playlist>
                <Playlist title={'MOMOLAND, WJSN, CHUNG HA and more'}></Playlist>
                <Playlist title={'I.O.I, MOMOLAND, IVE ans more'}></Playlist>
                <Playlist title={'MOMOLAND, WJSN, CHUNG HA and more'}></Playlist>
            </div>
        </div>
    );
};

export default TagPageScroller;
