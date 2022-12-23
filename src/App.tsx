import {Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './design-system/styles/style.scss'
import React from 'react';

import styles from './App.module.scss';
import {StatusBar, Style} from '@capacitor/status-bar';
import {IonReactRouter} from "@ionic/react-router";
import PrivatePagesRouter from "./pages/private/private-pages-router";
import LoginSignin from "./pages/login-signin/login-signin";
import Login from "./pages/login/login";

setupIonicReact();

StatusBar.setStyle({
    style: Style.Dark
}).catch(console.error);

const App: React.FC = () => {
    return (
        <IonApp className={styles.container}>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/" component={LoginSignin}/>
                    <Route exact path={`/login`} component={Login}/>
                    <Route path="/home" component={PrivatePagesRouter}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
};

export default App;
