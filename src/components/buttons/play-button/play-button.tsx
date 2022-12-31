import styles from './play-button.module.scss';
import React, {MouseEventHandler} from "react";
import {pause, play} from "ionicons/icons";
import {IonIcon} from '@ionic/react';

interface PlayButtonProps {
    isPlaying: boolean;
    onClick?: MouseEventHandler;
}

const PlayButton: React.FC<PlayButtonProps> = ({isPlaying, onClick}) => {
    if (isPlaying) {
        return (
            <IonIcon
                className={styles.button}
                icon={pause}
                onClick={onClick}
            />
        );
    }
    return (
        <IonIcon
            className={styles.button}
            icon={play}
            onClick={onClick}
        />
    );
};

export default PlayButton;
