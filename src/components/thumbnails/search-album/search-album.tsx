import styles from "./search-album.module.scss";
import {useContext} from "react";
import {PathsContext, TabRouteParams} from "../../../pages/private-pages-router/private-pages-router";
import {useHistory, useRouteMatch} from "react-router-dom";

export interface SearchAlbumProps {
    id: string;
    imageLink?: string;
    title: string;
    artistName: string;
    type: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

export const SearchAlbum: React.FC<SearchAlbumProps> = ({id, title, type, imageLink, artistName}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const path = useContext(PathsContext).album(tab);
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
                alt="album's thumbnail"
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{type} . {artistName}</p>
            </div>
        </div>
    );
}
