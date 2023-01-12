import React, {useState} from 'react';
import {IonContent, IonHeader, IonModal} from '@ionic/react';
import styles from './edit-profile-modal.module.scss';
import DiscardModalController from '../discard-modal/discard-modal-controller';
import {useDispatch, useSelector} from 'react-redux';
import {
    CurrentUser,
    selectCurrentUser,
    setCurrnetUseProfileTitle
} from '../../store/slices/current-user/current-user-slice';
import {MyState} from '../../store/store';
import ModalHeader from '../headers/modal-header/modal-header';
import TextButton from '../buttons/text-button/text-button';

interface EditProfileModalControllerProps {
    isOpen?: boolean;
    onClose?: () => void | undefined;
}

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

    const handleSaveButtonEvent = async () => {
        if (saveDisabled) {
            return;
        }
        if (!onClose) {
            return;
        }
        try {
            await dispatch(setCurrnetUseProfileTitle({profileTitle: profileTitle})).unwrap();
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
            <IonHeader>
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
            </IonHeader>
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
