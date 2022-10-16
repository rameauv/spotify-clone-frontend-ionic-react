import styles from "./search-categorie.module.scss";
import {MouseEventHandler} from "react";

interface ContainerProps {
    onClick?: MouseEventHandler<Element> | undefined;
}

const SearchCategorie: React.FC<ContainerProps> = ({onClick}) => {
    return (
        <div onClick={onClick} className={`${styles.container}`}>
            <p className={styles.text}>Podcasts</p>
        </div>
    );
};

export default SearchCategorie;
