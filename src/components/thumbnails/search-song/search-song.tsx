import styles from "./search-song.module.scss";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import {SongPathContext} from "../../../App";

interface ContainerProps {
    imageLink?: string;
    title: string;
    description: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const SearchSong: React.FC<ContainerProps> = ({title, description, imageLink = defaultImage}) => {
    const songPath = useContext(SongPathContext);
    const history = useHistory();

    return (
        <div onClick={() => history?.push(songPath)} className={styles.container}>
            <img className={styles.image} src={imageLink}/>
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default SearchSong;
