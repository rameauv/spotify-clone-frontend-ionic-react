import styles from "./icon-button.module.scss";
import {MouseEventHandler} from "react";

interface ContainerProps {
    activated?: boolean
    children: any;
    onClick?: MouseEventHandler<Element> | undefined;
}

const IconButton: React.FC<ContainerProps> = ({children, activated, onClick}) => {
    return (
        <p onClick={onClick} className={`${styles.container}`}>
            {children}
        </p>
    );
};

export default IconButton;
