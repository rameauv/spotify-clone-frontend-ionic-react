import React from "react";
import {Animation, createAnimation, IonModal} from "@ionic/react";
import styles from "./discard-modal.module.scss";

interface EditProfileModalControllerProps {
    isOpen?: boolean;
    onClose?: (result: { discard: boolean }) => void | undefined;
}

export const mdLeaveAnimation = (baseEl: HTMLElement): Animation => {
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

export const mdEnterAnimation = (baseEl: HTMLElement): Animation => {
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

const DiscardModalController: React.FC<EditProfileModalControllerProps> = ({isOpen, onClose}) => {
    const handleDiscardEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!event || !onClose) {
            return;
        }
        onClose({discard: true});
    }

    const handleKeepEditingEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClose) {
            onClose({discard: false});
        }
    }

    return (
        <IonModal
            className={`${styles.alert} myAlert`}
            isOpen={isOpen}
            enterAnimation={mdEnterAnimation}
            leaveAnimation={mdLeaveAnimation}
        >
            <div className={`${styles.alertMainContent} modal-content`}>
                <div className={styles.alertContent}>
                    <p className={styles.alertContent__title}>Discard changes?</p>
                    <p className={styles.alertContent__subTitle}>If you go back know, you will loose your
                        changes.</p>
                    <div
                        className={styles.alertContent__keepEditingButton}
                        onClick={event => handleKeepEditingEvent(event)}
                    >
                        <p className={styles.alertContent__keepEditingButton__inner}>Keep editing</p>
                    </div>
                    <p
                        className={styles.alertContent__discardButton}
                        onClick={event => handleDiscardEvent(event)}
                    >Discard</p>
                </div>
            </div>
        </IonModal>
    );
};

export default DiscardModalController;
