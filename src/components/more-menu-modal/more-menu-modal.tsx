import React from 'react';
import {IonContent, IonIcon, IonPage} from '@ionic/react';
import styles from './more-menu-modal.module.scss';
import {banOutline, heartOutline, musicalNoteOutline, personOutline, shareSocialOutline} from 'ionicons/icons';

export interface MoreMenuModalItem {
    thumbnailUrl: string;
    title: string;
    subtitle: string;
}

export interface MoreMenuModalProps {
    onDismiss: (data?: any, role?: string) => void;
    product: MoreMenuModalItem;
}

const MoreMenuModal: React.FC<MoreMenuModalProps> = ({onDismiss, product}) => {
    return (
        <IonPage>
            <IonContent
                className={styles.ionContent}
                onClick={() => onDismiss()}
            >
                <div className={styles.container}>
                    <div className={styles.itemDetailsContainer}>
                        <img
                            className={styles?.image}
                            src={product.thumbnailUrl}
                            alt="product's thumbnail"
                        />
                        <p className={styles.title}>{product?.title}</p>
                        <p className={styles.subtitle}>{product?.subtitle}</p>
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

export default MoreMenuModal;
