import styles from './library-sort-button.module.scss';
import React from 'react';
import {IonIcon, useIonModal} from '@ionic/react';
import {swapVertical} from 'ionicons/icons';
import FilterItem from '../filter-item/filter-item';

export interface LibrarySortButtonProps {
    onSelected: (id: string) => void;
    selectedId?: string;
}

interface SortModalProps {
    selectedItem?: string;
    onDismiss: (data?: string, role?: string) => void;
}

export interface SortItem {
    label: string;
    id: string;
}

const items: SortItem[] = [
    {
        label: 'Most recent',
        id: 'most-recent'
    },
    {
        label: 'Recently played',
        id: 'recently-played'
    },
    {
        label: 'Recently added',
        id: 'recently-added'
    },
    {
        label: 'Alphabetical',
        id: 'alphabetical'
    },
    {
        label: 'Creator',
        id: 'creator'
    },
];
const SortModal: React.FC<SortModalProps> = ({selectedItem, onDismiss}) => {
    return (
        <div className={`${styles.modalIonContent} modal-content`}>
            <div className={styles.modal}>
                <h1 className={styles.modalTitle}>Sort by</h1>
                <div className={styles.modalItems}>
                    {
                        items.map(item => {
                            return (
                                <FilterItem
                                    label={item.label}
                                    key={item.id}
                                    activated={selectedItem === item.id}
                                    onClick={() => onDismiss(item.id)}
                                />
                            );
                        })
                    }
                </div>
                <div className={styles.modalCancelButtonContainer}>
                    <p className={styles.modalCancelButton} onClick={() => onDismiss()}>CANCEL</p>
                </div>
            </div>
        </div>
    );
};

const LibrarySortButton: React.FC<LibrarySortButtonProps> = ({onSelected, selectedId}) => {
    const [_present, dismiss] = useIonModal(SortModal, {
        selectedItem: selectedId,
        onDismiss: (data?: string) => {
            dismiss();
            if (data) {
                onSelected(data);
            }
        },
    });
    const openModal = () => {
        _present({
            breakpoints: [0, 1],
            initialBreakpoint: 1,
            cssClass: 'auto-height-modal'
        });
    };
    const label = items.find(value => value.id === selectedId)?.label ?? '';
    return (
        <div className={styles.filter} onClick={() => openModal()}>
            <IonIcon className={styles.filterIcon} icon={swapVertical}></IonIcon>
            <p className={styles.filterLabel}>{label}</p>
        </div>
    );
};

export default LibrarySortButton;
