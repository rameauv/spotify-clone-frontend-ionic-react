import styles from "./round-outline-button.module.scss";
import React, {MouseEventHandler} from "react";

export interface RoundOutlineButtonProps {
    onClick?: MouseEventHandler | undefined;
    title: string;
}

const RoundOutlineButton: React.FC<RoundOutlineButtonProps> = ({onClick, title}) => {
    return (
        <div
            className={styles.editButton}
            onClick={onClick}
        >
            <p>{title}</p>
        </div>
    );
};

export default RoundOutlineButton;
