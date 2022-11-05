import styles from "./search-input.module.scss";
import React, {MouseEventHandler, useState} from "react";
import {IonIcon} from "@ionic/react";
import {arrowBackOutline} from "ionicons/icons";

interface ContainerProps {
    onBack?: MouseEventHandler<Element> | undefined;
}

const SearchInput: React.FC<ContainerProps> = ({onBack}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleChange = (event: any) => {
        setSearchQuery(event.target.value);
    }
    const handleClearEvent = () => {
        setSearchQuery('');
    }

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
                    <p onClick={() => handleClearEvent()} className={styles.clearButton}>clear</p> : undefined
            }
        </div>
    );
};

export default SearchInput;
