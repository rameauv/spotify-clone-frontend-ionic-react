import styles from "./search-song.module.scss";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useContext} from "react";
import {PathsContext, TabRouteParams} from "../../../pages/private-pages-router/private-pages-router";

interface ContainerProps {
    id: string;
    imageLink?: string;
    title: string;
    artistName: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

const SearchSong: React.FC<ContainerProps> = ({id, title, artistName, imageLink = defaultImage}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const songPath = useContext(PathsContext).track(tab);
    const history = useHistory();
    const fullpath = `${songPath}/${id}`;

    return (
        <div onClick={() => history?.push(fullpath)} className={styles.container}>
            <img
                className={styles.image ?? defaultImage}
                src={imageLink}
                alt="track's thumbnail"
            />
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>Song . {artistName}</p>
            </div>
        </div>
    );
};

export default SearchSong;
