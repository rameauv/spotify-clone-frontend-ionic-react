import styles from './rectangular-outline-button.module.scss'
import React, {MouseEventHandler} from 'react';

interface RectangularOutlineButtonProps {
    title: string;
    onClick?: MouseEventHandler;
    isDisabled?: boolean;
}

const RectangularOutlineButton: React.FC<RectangularOutlineButtonProps> = ({onClick, isDisabled, title}) => {
    return (
        <div
            className={`${styles.button} ${isDisabled ? styles.disabled : undefined}`}
            onClick={onClick}
        >
            <p>{title}</p>
        </div>
    );
}

export default RectangularOutlineButton;
