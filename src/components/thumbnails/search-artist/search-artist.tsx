import styles from "./search-artist.module.scss";
import {useContext} from "react";
import {PathsContext, TabRouteParams} from "../../../pages/private/private-pages-router";
import {useHistory, useRouteMatch} from "react-router-dom";

export interface SearchArtistProps {
    id: string;
    imageLink?: string;
    name: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

export const SearchArtist: React.FC<SearchArtistProps> = ({id, name, imageLink}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const path = useContext(PathsContext).artist(tab);
    const history = useHistory();
    const fullpath = `${path}/${id}`;

    return (
        <div onClick={() => history?.push(fullpath)} className={styles.container}>
            <img className={styles.image} src={imageLink ?? defaultImage}/>
            <div className={styles.textContainer}>
                <p className={styles.title}>{name}</p>
                <p className={styles.description}>Artist . {name}</p>
            </div>
        </div>
    );
}
