import styles from "./search-button.module.scss";
import {MouseEventHandler} from "react";

interface ContainerProps {
    onClick?: MouseEventHandler<Element> | undefined;
}

const SearchButton: React.FC<ContainerProps> = ({onClick}) => {
    return (
        <p onClick={onClick} className={`${styles.container}`}>Artistes, songs, or podcasts</p>
    );
};

export default SearchButton;
