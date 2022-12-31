import React, {useState} from "react";
import {Animation, createAnimation, IonContent, IonModal} from "@ionic/react";
import styles from "./edit-profile-modal.module.scss";
import DiscardModalController from "../discard-modal/discard-modal-controller";
import {useDispatch, useSelector} from "react-redux";
import {
    CurrentUser,
    selectCurrentUser,
    setCurrnetUseProfileTitle
} from "../../store/slices/current-user/current-user-slice";
import {MyState} from "../../store/store";
import ModalHeader from "../headers/modal-header/modal-header";
import TextButton from "../buttons/text-button/text-button";

interface EditProfileModalControllerProps {
    isOpen?: boolean;
    onClose?: () => void | undefined;
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
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const currentUser = useSelector<MyState, CurrentUser | undefined>(selectCurrentUser);
    const name = currentUser?.name ?? '';
    const [profileTitle, setProfileTitle] = useState(name);
    const oldProfileTitle = name;
    const saveDisabled = oldProfileTitle === profileTitle;

    const handleProfileTitleInputOnInputEvent = (e?: React.ChangeEvent<HTMLInputElement>) => {
        if (!e) {
            return;
        }
        setProfileTitle(e.target.value);
    }

    const handleSaveButtonEvent = async (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (saveDisabled) {
            return;
        }
        if (!event || !onClose) {
            return;
        }
        try {
            const res = await dispatch<any>(setCurrnetUseProfileTitle({profileTitle: profileTitle})).unwrap();
            console.log(res);
        } catch (e: any) {
            console.error(e);
            return;
        }
        onClose();
    }

    const handleCloseEvent = () => {
        if (!saveDisabled) {
            setShowAlert(true);
            return;
        }

        if (!onClose) {
            return;
        }
        onClose();
    }

    const handleDiscardModalClodeEvent = (result: { discard: boolean }) => {
        setShowAlert(false);
        if (onClose && result.discard) {
            setProfileTitle(oldProfileTitle);
            onClose();
        }
    }

    return (
        <IonModal isOpen={isOpen} keepContentsMounted={false}>
            <DiscardModalController
                isOpen={showAlert}
                onClose={result => handleDiscardModalClodeEvent(result)}
            />
            <ModalHeader
                title="Edit profile"
                onClose={() => handleCloseEvent()}
            >
                <TextButton
                    title="Save"
                    isDisabled={saveDisabled}
                    onClick={() => handleSaveButtonEvent()}
                />
            </ModalHeader>
            <IonContent className={styles.ionContent}>
                <div className={styles.profileSettingsButton__profileIcon}>
                    <p>{profileTitle[0]}</p>
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
