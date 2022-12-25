import {IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar} from '@ionic/react';
import styles from './home.module.scss';
import SmallAlbum from "../../components/thumbnails/small-album/small-album";
import Playlist from "../../components/thumbnails/playlist/playlist";
import Album from "../../components/thumbnails/album/album";
import {notificationsOutline, settingsOutline, timerOutline} from "ionicons/icons";
import {Tag} from "../../components/filter/filter";
import {useHistory} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {accountsApi, weatherForecastApi} from '../../tools/client';

import {
    fetchPosts,
    getPostError,
    getPostStatus,
    postAdded,
    reset,
    selectAllPosts
} from '../../features/posts/posts-slide';
import {useDispatch, useSelector} from "react-redux";

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
    const handleLogin = async () => {
        const response = await accountsApi.accountsLoginPost({
            deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            password: 'string',
            username: 'string'
        })
        const token = response.data as unknown as string;
        console.log(token);
        if (token == undefined) {
            return;
        }
        localStorage.setItem('jwt', token);
    }
    const handleWeather = () => {
        weatherForecastApi.getWeatherForecast();
    }


    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const postsErrors = useSelector(getPostError);

    // useEffect(() => {
    if (postsStatus === 'idle') {
        dispatch<any>(fetchPosts());
    }
    // }, [postsStatus, dispatch]);


    let content;

    if (postsStatus === 'loading') {
        content = <p>loading...</p>
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(b.date));
        content = orderedPosts.map(post => <div key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.date}</p>
        </div>);
    } else if (postsStatus === 'failed') {
        content = <p>{postsErrors}</p>
    }


    const handleAddPost = () => {
        dispatch(postAdded('test', 'content'));
    }
    const handleResetPosts = () => {
        dispatch(reset());
    }
    console.log(posts);
    console.log(postsStatus);
    console.log(postsErrors);
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
                <IonButton onClick={() => handleLogin()}>login</IonButton>
                <IonButton onClick={() => handleAddPost()}>addPost</IonButton>
                <IonButton onClick={() => handleResetPosts()}>reset</IonButton>
                <IonButton>register</IonButton>
                <IonButton onClick={() => handleWeather()}>weather</IonButton>
                {content}
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
