import styles from './regular-button.module.scss';
import React, {MouseEventHandler} from 'react';
import {classNames} from '../../../tools/class-names';

export interface RegularButtonProps {
    title: string;
    onClick?: MouseEventHandler;
    isDisabled?: boolean;
    className?: string;
}

const RegularButton: React.FC<RegularButtonProps> = ({onClick, title, className, isDisabled}) => {
    const classes = classNames({
        [className ?? '']: !!className,
        [styles.button]: true,
        [styles.disabled]: !!isDisabled,
    });
    return (
        <div
            className={classes}
            onClick={onClick}
        >
            <p className={styles.button__inner}>{title}</p>
        </div>
    );
};

export default RegularButton;
