import {Route} from 'react-router-dom';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonPage,
    IonRouterOutlet,
    IonToolbar,
    isPlatform,
    setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './design-system/styles/style.scss';
import React, {useEffect} from 'react';

import styles from './App.module.scss';
import {IonReactRouter} from '@ionic/react-router';
import PrivatePagesRouter from './pages/private-pages-router/private-pages-router';
import LoginSignin from './pages/login-signin/login-signin';
import Login from './pages/login/login';
import AuthGuard from './components/auth-guard/auth-guard';
import {useDispatch, useSelector} from 'react-redux';
import {fetechCurrentUser, selectCurrentUserStatus} from './store/slices/current-user/current-user-slice';
import TextButton from './components/buttons/text-button/text-button';
import NotAuthGuard from './components/not-auth-guard/not-auth-guard';

setupIonicReact();

const loadStatusBarModule = async () => {
    if (isPlatform('hybrid')) {
        const {StatusBar, Style} = await import('@capacitor/status-bar');
        await StatusBar.setStyle({
            style: Style.Dark
        });
    }
};

loadStatusBarModule();

const App: React.FC = () => {
    const status = useSelector(selectCurrentUserStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('use effect');
        if (status === 'idle') {
            dispatch(fetechCurrentUser());
        }
    }, [status, dispatch]);
    const retry = () => {
        console.log('retry');
        dispatch(fetechCurrentUser());
    };
    if (status === 'loading') {
        return (<p>loading...</p>);
    }
    if (status === 'failed') {
        return (
            <IonApp>
                <IonPage>
                    <IonHeader><IonToolbar/></IonHeader>
                    <IonContent>
                        <p>error</p>
                        <TextButton title="Retry" onClick={() => retry()}/>
                    </IonContent>
                </IonPage>
            </IonApp>
        );
    }
    return (
        <IonApp className={styles.container}>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/">
                        <NotAuthGuard>
                            <LoginSignin/>
                        </NotAuthGuard>
                    </Route>
                    <Route exact path="/login">
                        <NotAuthGuard>
                            <Login/>
                        </NotAuthGuard>
                    </Route>

                    <Route path="/home" render={props => (
                        <AuthGuard>
                            <PrivatePagesRouter history={props.history} location={props.location} match={props.match}/>
                        </AuthGuard>
                    )}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
