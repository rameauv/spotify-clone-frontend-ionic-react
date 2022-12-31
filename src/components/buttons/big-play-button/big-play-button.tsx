import styles from './big-play-button.module.scss';
import React, {MouseEventHandler} from "react";
import {IonIcon} from "@ionic/react";
import {playCircle} from "ionicons/icons";

export interface BigPlayButtonProps {
    onClick?: MouseEventHandler;
}

const BigPlayButton: React.FC<BigPlayButtonProps> = ({onClick}) => {
    return (
        <div className={styles.playbuttonContainer}>
            <IonIcon
                className={styles.playbutton}
                icon={playCircle}
            ></IonIcon>
        </div>
    );
};

export default BigPlayButton;
