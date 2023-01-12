import React from 'react';
import styles from './header-with-left-title.module.scss';
import {IonToolbar, useIonRouter} from '@ionic/react';
import {arrowBackOutline} from 'ionicons/icons';
import IconButton, {IconButtonSize} from '../../buttons/icon-button/icon-button';

export interface HeaderWithLeftTitleProps {
    title: string
}

const HeaderWithLeftTitle: React.FC<HeaderWithLeftTitleProps> = ({title}) => {
    const router = useIonRouter();

    return (
        <IonToolbar className={styles.ionToolbar}>
            <div className={styles.ionToolbar__header}>
                <div
                    className={styles.ionToolbar__header__backButton}
                >
                    <IconButton
                        icon={arrowBackOutline}
                        size={IconButtonSize.MD}
                        onClick={() => router.goBack()}
                    />
                </div>
                <p className={styles.ionToolbar__header__title}>{title}</p>
            </div>
        </IonToolbar>
    );
}

export default HeaderWithLeftTitle;
