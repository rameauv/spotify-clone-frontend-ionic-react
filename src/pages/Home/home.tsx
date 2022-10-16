import {IonContent, IonIcon, IonPage} from '@ionic/react';
import styles from './home.module.scss';
import SmallAlbum from "../../components/thumbnails/small-album/small-album";
import Playlist from "../../components/thumbnails/playlist/playlist";
import Album from "../../components/thumbnails/album/album";
import {notificationsOutline, settingsOutline, timerOutline} from "ionicons/icons";
import Filter, {Tag} from "../../components/filter/filter";
import {useState} from "react";


const Home: React.FC = () => {
    const tags: Tag[] = [
        {
            value: 'Music',
            id: 'Music'
        },
        {
            value: 'Podcasts & Shows',
            id: 'Podcasts & Shows'
        }
    ];
    const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={styles.header}>
                    <p className="app-mr-auto app-font-h2 app-font-bold">Good evening</p>
                    <div className="app-mr-6">
                        <IonIcon className={styles.rightButtons} icon={notificationsOutline}></IonIcon>
                    </div>
                    <div className="app-mr-6">
                        <IonIcon className={styles.rightButtons} icon={timerOutline}></IonIcon>
                    </div>
                    <div>
                        <IonIcon className={styles.rightButtons} icon={settingsOutline}></IonIcon>
                    </div>
                </div>
                <Filter tags={tags} selectedTagId={selectedTagId}
                        onTagSelected={tagId => setSelectedTagId(tagId)}></Filter>
                <p className="app-mb-6 app-px-4 app-font-h2 app-font-bold">Recently played</p>
                <div className={styles.scroller}>
                    <SmallAlbum title={'Granps'}></SmallAlbum>
                    <SmallAlbum title={'why'}></SmallAlbum>
                    <SmallAlbum title={'Granps'}></SmallAlbum>
                    <SmallAlbum title={'why'}></SmallAlbum>
                </div>
                <p className="app-mb-6 app-px-4 app-font-h2 app-font-bold">Your top mixes</p>
                <div className={styles.scroller}>
                    <Playlist title={'I.O.I, MOMOLAND, IVE ans more'}></Playlist>
                    <Playlist title={'MOMOLAND, WJSN, CHUNG HA and more'}></Playlist>
                    <Playlist title={'I.O.I, MOMOLAND, IVE ans more'}></Playlist>
                    <Playlist title={'MOMOLAND, WJSN, CHUNG HA and more'}></Playlist>
                </div>
                <p className="app-mb-6 app-px-4 app-font-h2 app-font-bold">Trending near you</p>
                <div className={styles.scroller}>
                    <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
