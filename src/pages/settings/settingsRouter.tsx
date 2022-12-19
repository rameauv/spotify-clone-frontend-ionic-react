import {IonRouterOutlet} from '@ionic/react';
import React from "react";
import {Route} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import ProfileSettings from "../profile-settings/profile-settings";
import Settings from './settings';

interface SettingsRouterProps extends RouteComponentProps {
}

const SettingsRouter: React.FC<SettingsRouterProps> = (props) => {
    console.log(props);
    return (
        <IonRouterOutlet>
            <Route exact path={`${props.match.url}`} component={Settings}/>
            <Route path={`${props.match.url}/profile-settings`} component={ProfileSettings}/>
        </IonRouterOutlet>
    );
};

export default SettingsRouter;
