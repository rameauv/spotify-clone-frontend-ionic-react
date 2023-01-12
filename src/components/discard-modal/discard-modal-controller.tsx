import React from 'react';
import {Animation, createAnimation, IonModal} from '@ionic/react';
import styles from './discard-modal.module.scss';
import TextButton from '../buttons/text-button/text-button';
import RegularButton from '../buttons/regular-button/regular-button';

const leaveAnimation = (baseEl: HTMLElement): Animation => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();

    backdropAnimation.addElement(baseEl.shadowRoot?.querySelector('ion-backdrop')!).fromTo('opacity', 'var(--backdrop-opacity)', 0);

    wrapperAnimation.addElement(baseEl.shadowRoot?.querySelector('.modal-wrapper')!).fromTo('opacity', 0.99, 0);

    return baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

const enterAnimation = (baseEl: HTMLElement): Animation => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();

    backdropAnimation
        .addElement(baseEl.shadowRoot?.querySelector('ion-backdrop')!)
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
            'pointer-events': 'none',
        })
        .afterClearStyles(['pointer-events']);
    wrapperAnimation.addElement(baseEl.shadowRoot?.querySelector('.modal-wrapper')!).keyframes([
        {offset: 0, opacity: '0.01', transform: 'scale(0.9)'},
        {offset: 1, opacity: '1', transform: 'scale(1)'},
    ]);

    return baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

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
    }

    const handleKeepEditingEvent = () => {
        if (onClose) {
            onClose({discard: false});
        }
    }

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
