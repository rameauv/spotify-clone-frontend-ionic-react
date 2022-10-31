import styles from "./filter-item.module.scss";
import {IonIcon} from "@ionic/react";
import {checkmarkOutline} from "ionicons/icons";
import {MouseEventHandler} from "react";

interface FilterItemProps {
    activated?: boolean;
    label: string;
    onClick?: MouseEventHandler<Element> | undefined;
}

const FilterItem: React.FC<FilterItemProps> = ({activated, label, onClick}) => {
    return (
        <div
            className={`${activated ? styles.activated : ''} ${styles.container}`}
            onClick={onClick}
        >
            <p className={styles.label}>{label}</p>
            <IonIcon className={styles.icon} icon={checkmarkOutline}></IonIcon>
        </div>
    );
};

export default FilterItem;
