import React, {MouseEventHandler} from 'react';
import {IonIcon} from '@ionic/react';
import styles from './icon-button.module.scss';

export enum IconButtonSize {
    S = 20,
    MD = 24,
}

export interface IconButtonProps {
    onClick?: MouseEventHandler;
    icon: string;
    size: IconButtonSize;
}

const IconButton: React.FC<IconButtonProps> = ({onClick, icon, size}) => {
    return (
        <IonIcon
            style={{
                '--size': size + 'px'
            }}
            className={styles.button}
            icon={icon}
            onClick={onClick}
        />
    );
};

export default IconButton;
