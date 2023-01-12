import styles from "./small-album.module.scss";
import {useContext} from "react";
import {PathsContext, TabRouteParams} from "../../../pages/private-pages-router/private-pages-router";
import {useIonRouter} from "@ionic/react";
import {useRouteMatch} from "react-router-dom";

interface ContainerProps {
    id: string;
    imageLink?: string;
    title: string;
}

const defaultImage = 'https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T127A1PA5161PT21X2Y6D135599871W2540H2132/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/garde-la-peche-grands-badges.jpg';

const SmallAlbum: React.FC<ContainerProps> = ({id, title, imageLink = defaultImage}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const albumPath = useContext(PathsContext).album(tab);
    const fullpath = `${albumPath}/${id}`;
    const router = useIonRouter();

    return (
        <div
            className={styles.container}
            onClick={() => router?.push(fullpath)}
        >
            <img
                className={styles.image}
                src={imageLink}
                alt="album's thumbnail"
            />
            <p className={styles.text}>{title}</p>
        </div>
    );
};

export default SmallAlbum;
