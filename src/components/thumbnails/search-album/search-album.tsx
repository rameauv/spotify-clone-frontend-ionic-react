import styles from "./search-album.module.scss";
import {useContext} from "react";
import {AlbumPathContext} from "../../../pages/private/private-pages-router";
import {useHistory} from "react-router-dom";

export interface SearchAlbumProps {
    id: string;
    imageLink?: string;
    title: string;
    artistName: string;
    type: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

export const SearchAlbum: React.FC<SearchAlbumProps> = ({id, title, type, imageLink, artistName}) => {
    const path = useContext(AlbumPathContext);
    const history = useHistory();
    const fullpath = `${path}/${id}`;

    return (
        <div
            className={styles.container}
            onClick={() => history?.push(fullpath)}
        >
            <img
                className={styles.image}
                src={imageLink ?? defaultImage}
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{type} . {artistName}</p>
            </div>
        </div>
    );
}
