import styles from './text-button.module.scss';
import React, {MouseEventHandler} from "react";
import {classNames} from '../../../tools/class-names';

export interface TextButtonProps {
    title: string;
    isDisabled?: boolean;
    isBold?: boolean;
    onClick?: MouseEventHandler;
}

const TextButton: React.FC<TextButtonProps> = ({isDisabled, isBold, title, onClick}) => {
    const classses = classNames({
        [styles.button]: true,
        [styles.disabled]: !!isDisabled,
        [styles.bold]: !!isBold
    });

    return (
        <p
            className={classses}
            onClick={onClick}
        >{title}</p>
    );
};

export default TextButton;
