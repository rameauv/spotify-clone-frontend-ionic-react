import styles from './search-input.module.scss';
import React, {MouseEventHandler, useState} from 'react';
import {IonIcon} from '@ionic/react';
import {arrowBackOutline} from 'ionicons/icons';

interface ContainerProps {
    onBack?: MouseEventHandler<Element> | undefined;
    value?: string;
    onChange?: (value: string) => void;
}

const SearchInput: React.FC<ContainerProps> = ({onBack, onChange, value}) => {
    const [searchQuery, setSearchQuery] = useState<string>(value ?? '');
    const handleChange = (event: any) => {
        const {value: newValue} = event.target;
        setSearchQuery(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    const handleClearEvent = () => {
        setSearchQuery('');
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={styles.container}>
            <IonIcon
                className={styles.header__backButton}
                icon={arrowBackOutline}
                onClick={onBack}
            />
            <input className={styles.input}
                   placeholder="Search query"
                   value={searchQuery}
                   onChange={(event) => handleChange(event)}
            />
            {
                searchQuery !== '' ?
                    <p onClick={() => handleClearEvent()} className={styles.clearButton}>clear</p>
                    : undefined
            }
        </div>
    );
};

export default SearchInput;
