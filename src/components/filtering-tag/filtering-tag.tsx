import styles from "./filtering-tag.module.scss";
import {ElementType, MouseEventHandler} from "react";

interface ContainerProps {
    activated?: boolean
    children: any;
    as?: ElementType;
    onClick?: MouseEventHandler<Element> | undefined;
}

const FilteringTag: React.FC<ContainerProps> = ({children, activated, onClick}) => {
    return (
        <p onClick={onClick} className={`${styles.container} ${activated ? styles.activated : ""}`}>
            {children}
        </p>
    );
};

export default FilteringTag;
