import React, {useRef} from "react";
import {IonContent, IonIcon, IonPage} from "@ionic/react";
import styles from './song-more-modal.module.scss';
import {banOutline, heartOutline, musicalNoteOutline, personOutline, shareSocialOutline} from "ionicons/icons";

export interface MoreMenuModalItem {
    thumbnailUrl: string;
    title: string;
    artist: string;
}

export interface MoreMenuModalProps {
    onDismiss: (data?: any, role?: string) => void;
    song: MoreMenuModalItem;
}

const SongMoreMenuModal: React.FC<MoreMenuModalProps> = ({onDismiss, song}) => {
    const modal: any = useRef<HTMLIonModalElement>(null);

    return (
        <IonPage>
            <IonContent
                className={styles.ionContent}
                onClick={() => onDismiss()}
            >
                <div className={styles.container}>
                    <div className={styles.songDetailsContainer}>
                        <img
                            className={styles?.image}
                            src={song.thumbnailUrl}
                        />
                        <p className={styles.songTitle}>{song?.title}</p>
                        <p className={styles.artist}>{song?.artist}</p>
                    </div>
                    <div className={styles.item}>
                        <IonIcon
                            className={styles.icon}
                            icon={heartOutline}
                        ></IonIcon>
                        <p>Liked</p>
                    </div>
                    <div className={styles.item}>
                        <IonIcon
                            className={styles.icon}
                            icon={banOutline}
                        ></IonIcon>
                        <p>Don't play this</p>
                    </div>
                    <div className={styles.item}>
                        <IonIcon
                            className={styles.icon}
                            icon={personOutline}
                        ></IonIcon>
                        <p>View Artist</p>
                    </div>
                    <div className={styles.item}>
                        <IonIcon
                            className={styles.icon}
                            icon={musicalNoteOutline}
                        ></IonIcon>
                        <p>Add to Playlist</p>
                    </div>
                    <div className={styles.item}>
                        <IonIcon
                            className={styles.icon}
                            icon={shareSocialOutline}
                        ></IonIcon>
                        <p>Share</p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SongMoreMenuModal;
