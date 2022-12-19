import React, {MouseEventHandler, useState} from "react";
import {Animation, createAnimation, IonContent, IonIcon, IonModal, IonToolbar} from "@ionic/react";
import styles from "./edit-profile-modal.module.scss";
import {closeSharp} from "ionicons/icons";

interface EditProfileModalControllerProps {
    isOpen?: boolean;
    onClose?: MouseEventHandler<Element> | undefined;
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

const EditProfileModalController: React.FC<EditProfileModalControllerProps> = ({isOpen, onClose}) => {
    const [showAlert, setShowAlert] = useState(false);
    const oldProfileTitle = "Valentin";
    const [profileTitle, setProfileTitle] = useState(oldProfileTitle);
    const saveDisabled = oldProfileTitle === profileTitle;

    const handleProfileTitleInputOnInputEvent = (e?: React.ChangeEvent<HTMLInputElement>) => {
        if (!e) {
            return;
        }
        setProfileTitle(e.target.value);
    }

    const handleSaveButtonEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (saveDisabled) {
            return;
        }
        if (!event || !onClose) {
            return;
        }
        onClose(event);
    }

    const handleCloseEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!saveDisabled) {
            setShowAlert(true);
            return;
        }

        if (!event || !onClose) {
            return;
        }
        onClose(event);
    }

    const handleDiscardEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!event || !onClose) {
            return;
        }
        setShowAlert(false);
        onClose(event);
    }

    const handleKeepEditingEvent = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setShowAlert(false);
    }

    return (
        <IonModal isOpen={isOpen} keepContentsMounted={false}>
            <IonModal
                className={`${styles.alert} myAlert`}
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                backdropDismiss
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
            <IonToolbar className={styles.ionToolbar}>
                <div className={styles.ionToolbar__header}>
                    <IonIcon
                        className={styles.ionToolbar__header__backButton}
                        icon={closeSharp}
                        onClick={(event) => handleCloseEvent(event)}
                    />
                    <p className={styles.ionToolbar__header__title}>Edit profile</p>
                    <p
                        className={`${styles.ionToolbar__header__saveButton} ${saveDisabled ? styles.ionToolbar__header__saveButtonDisabled : ''}`}
                        onClick={(event) => handleSaveButtonEvent(event)}
                    >Save</p>
                </div>
            </IonToolbar>
            <IonContent className={styles.ionContent}>
                <div
                    className={styles.profileSettingsButton__profileIcon}
                >
                    <p>V</p>
                </div>
                <input
                    className={styles.profileTitleInput}
                    placeholder="Your name"
                    value={profileTitle}
                    onChange={event => handleProfileTitleInputOnInputEvent(event)}
                />
                <div className={styles.profileTitleInputUnderline}/>
                <p className={styles.tip}>This could be your first name or a nickname</p>
                <p className={styles.tip}>It's how you'll appear on Spotify</p>
            </IonContent>
        </IonModal>
    );
};

export default EditProfileModalController;
