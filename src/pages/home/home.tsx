import {IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import styles from './home.module.scss';
import SmallAlbum from "../../components/thumbnails/small-album/small-album";
import Playlist from "../../components/thumbnails/playlist/playlist";
import Album from "../../components/thumbnails/album/album";
import {notificationsOutline, settingsOutline, timerOutline} from "ionicons/icons";
import {Tag} from "../../components/filter/filter";
import {useHistory} from 'react-router-dom';
import {RouteComponentProps} from "react-router";

interface HomeProps extends RouteComponentProps {
}

const Home: React.FC<HomeProps> = (props) => {
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
    const history = useHistory();
    const _handleSettingsButtonEvent = () => {
        history.push(`${props.match.url}/settings`);
    };

    return (
        <IonPage>
            <IonHeader><IonToolbar className="no-height"/></IonHeader>
            <IonContent fullscreen>
                <div className={styles.header}>
                    <p className="app-mr-auto app-font-h2 app-font-bold">Good evening</p>
                    <div className="app-mr-6">
                        <IonIcon className={styles.rightButtons} icon={notificationsOutline}/>
                    </div>
                    <div className="app-mr-6">
                        <IonIcon className={styles.rightButtons} icon={timerOutline}/>
                    </div>
                    <div>
                        <IonIcon className={styles.rightButtons}
                                 onClick={() => _handleSettingsButtonEvent()}
                                 icon={settingsOutline}/>
                    </div>
                </div>
                <p className="app-mb-6 app-px-4 app-font-h2 app-font-bold">Recently played</p>
                <div className={styles.scroller}>
                    <SmallAlbum id="2noRn2Aes5aoNVsU6iWThc" title={'Granps'}></SmallAlbum>
                    <SmallAlbum id="2noRn2Aes5aoNVsU6iWThc" title={'why'}></SmallAlbum>
                    <SmallAlbum id="2noRn2Aes5aoNVsU6iWThc" title={'Granps'}></SmallAlbum>
                    <SmallAlbum id="2noRn2Aes5aoNVsU6iWThc" title={'why'}></SmallAlbum>
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
                    <Album id="2noRn2Aes5aoNVsU6iWThc" title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album id="2noRn2Aes5aoNVsU6iWThc" title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album id="2noRn2Aes5aoNVsU6iWThc" title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                    <Album id="2noRn2Aes5aoNVsU6iWThc" title={'Mal de Amores'} subtitle={'Album - Sofia Reyes'}></Album>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
