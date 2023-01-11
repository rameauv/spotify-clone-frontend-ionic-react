import React from 'react';
import styles from './modal-header.module.scss';
import {IonIcon, IonToolbar} from '@ionic/react';
import {closeSharp} from 'ionicons/icons';

export interface ModalHeaderProps {
    title: string;
    onClose: () => void;
    children?: JSX.Element;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({onClose, children}) => {
    return (
        <IonToolbar>
            <div className={styles.ionToolbar__header}>
                <IonIcon
                    className={styles.ionToolbar__header__backButton}
                    icon={closeSharp}
                    onClick={() => onClose()}
                />
                <p className={styles.ionToolbar__header__title}>Edit profile</p>
                <div className={styles.ionToolbar__header__rightButton}>
                    {children}
                </div>
            </div>
        </IonToolbar>
    );
}

export default ModalHeader;
