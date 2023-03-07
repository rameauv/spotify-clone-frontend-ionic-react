import styles from './heart-button.module.scss';
import React, {MouseEventHandler} from 'react';
import {IonIcon} from '@ionic/react';
import {heart, heartOutline} from 'ionicons/icons';


export interface HeartButtonProps {
    isActivated: boolean;
    onClick?: MouseEventHandler;
}

const HeartButton: React.FC<HeartButtonProps> = ({isActivated, onClick}) => {
    if (isActivated) {
        return (
            <IonIcon
                className={`${styles.button} activated`}
                icon={heart}
                onClick={onClick}/>
        );
    }
    return (
        <IonIcon
            className={styles.button}
            icon={heartOutline}
            onClick={onClick}
        />
    );
};

export default HeartButton;
