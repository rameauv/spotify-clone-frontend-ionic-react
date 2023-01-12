import styles from "./album.module.scss";
import {useContext} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {PathsContext, TabRouteParams} from "../../../pages/private-pages-router/private-pages-router";

interface ContainerProps {
    id: string;
    imageLink?: string;
    title: string;
    subtitle: string;
}

const defaultImage = 'https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T127A1PA5161PT21X2Y6D135599871W2540H2132/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/garde-la-peche-grands-badges.jpg';

const Album: React.FC<ContainerProps> = ({id, title, subtitle, imageLink = defaultImage}) => {
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const albumPath = useContext(PathsContext).album(tab);
    const fullpath = `${albumPath}/${id}`;
    const history = useHistory();

    return (
        <div
            className={styles.container}
            onClick={() => history?.push(fullpath)}
        >
            <img
                className={styles.image}
                src={imageLink}
            />
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    );
};

export default Album;
