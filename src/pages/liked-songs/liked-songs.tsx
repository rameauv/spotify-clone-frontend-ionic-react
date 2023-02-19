import {IonContent, IonIcon, IonPage} from '@ionic/react';
import styles from './liked-songs.module.scss';
import {arrowBackOutline} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import BigPlayButton from '../../components/buttons/big-play-button/big-play-button';

function limitOpacity(min: number, max: number, value: number) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

const LikedSongs: React.FC = () => {
    const accentColor = '#2b42a8';
    const history = useHistory();
    const [bgOpacity, setBgOpacity] = useState(0);
    const [titleOpacity, setTitleOpacity] = useState(0);
    const title = 'Liked songs';
    const songCount = 3;

    function handleScrollEvent(e: any) {
        const scrollTop = e.detail.scrollTop;
        const tempBgOpacity = ((scrollTop / 16));
        const tempTitleOpacity = (((scrollTop - 16) / 80));
        setBgOpacity(limitOpacity(0, 1, tempBgOpacity));
        setTitleOpacity(limitOpacity(0, 1, tempTitleOpacity));
    }

    return (
        <IonPage
            style={{
                '--backgroundOpacity': bgOpacity,
                '--titleOpacity': titleOpacity,
                '--accentColor': accentColor
            }}
        >
            {/*<IonHeader>*/}
            {/*    <IonToolbar className={styles.ionToolbar}>*/}
            {/*        <div className={styles.headerBg}>*/}
            {/*            <div className={styles.headerBgGradiant}/>*/}
            {/*        </div>*/}
            {/*        <div className={styles.header}>*/}
            {/*            <IonIcon*/}
            {/*                className={styles.header__backButton}*/}
            {/*                icon={arrowBackOutline}*/}
            {/*                onClick={() => history.goBack()}*/}
            {/*            />*/}
            {/*            <p className={styles.header__title}>{title}</p>*/}
            {/*        </div>*/}
            {/*    </IonToolbar>*/}
            {/*</IonHeader>*/}
            <IonContent
                className={styles.ionContent}
                forceOverscroll={false}
                scrollEvents
                onIonScroll={(e) => handleScrollEvent(e)}
            >
                <div>
                    <div className={styles.headerBg}>
                        <div className={styles.headerBgGradiant}/>
                    </div>
                    <div className={styles.header}>
                        <IonIcon
                            className={styles.header__backButton}
                            icon={arrowBackOutline}
                            onClick={() => history.goBack()}
                        />
                        <p className={styles.header__title}>{title}</p>
                    </div>
                </div>
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.songCountSubtitle}>{songCount} songs</p>
                    <div className={styles.playbuttonContainer}>
                        <BigPlayButton/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LikedSongs;
