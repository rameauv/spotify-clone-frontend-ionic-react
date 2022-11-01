import {IonContent, IonHeader, IonIcon, IonPage} from '@ionic/react';
import styles from './tag.module.scss';
import React from "react";
import {SongMoreMenuModalSong} from "../../components/song-more-menu-modal/song-more-menu-modal";
import {useHistory} from "react-router-dom";
import {arrowBackOutline} from "ionicons/icons";
import TagPageScroller from "../../components/tag-page-scroller/tag-page-scroller";

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const Tag: React.FC = () => {
    const song: SongMoreMenuModalSong = {
        thumbnailUrl: defaultImage,
        title: 'Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit',
        artist: 'Daft punk'
    };
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <div className={styles.header}>
                    <IonIcon
                        className={styles.header__backButton}
                        icon={arrowBackOutline}
                        onClick={() => history.goBack()}
                    />
                    <p className={styles.header__title}>French Variety</p>
                </div>
            </IonHeader>
            <IonContent>
                <div className={styles.content}>
                    <p className={styles.content__title}>French Variety</p>
                    <div className={styles.content__sliders}>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tag;
