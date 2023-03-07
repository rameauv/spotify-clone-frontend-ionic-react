import React from 'react';
import {IonModal} from '@ionic/react';
import styles from './discard-modal.module.scss';
import TextButton from '../buttons/text-button/text-button';
import RegularButton from '../buttons/regular-button/regular-button';
import enterAnimation from '../../animations/modals/enter-animation';
import leaveAnimation from '../../animations/modals/leave-animation';

interface EditProfileModalControllerProps {
    isOpen?: boolean;
    onClose?: (result: { discard: boolean }) => void | undefined;
}

const DiscardModalController: React.FC<EditProfileModalControllerProps> = ({isOpen, onClose}) => {
    const handleDiscardEvent = () => {
        if (!onClose) {
            return;
        }
        onClose({discard: true});
    };

    const handleKeepEditingEvent = () => {
        if (onClose) {
            onClose({discard: false});
        }
    };

    return (
        <IonModal
            className={`${styles.alert} myAlert`}
            isOpen={isOpen}
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            backdropDismiss={false}
        >
            <div className={`${styles.alertMainContent} modal-content`}>
                <div className={styles.alertContent}>
                    <p className={styles.alertContent__title}>Discard changes?</p>
                    <p className={styles.alertContent__subTitle}>If you go back know, you will loose your
                        changes.</p>
                    <RegularButton
                        title="Keep editing"
                        onClick={() => handleKeepEditingEvent()}
                    />
                    <TextButton
                        title="Discard"
                        onClick={() => handleDiscardEvent()}
                        isBold
                    />
                </div>
            </div>
        </IonModal>
    );
};

export default DiscardModalController;
