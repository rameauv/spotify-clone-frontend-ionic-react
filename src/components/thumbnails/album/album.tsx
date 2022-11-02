import styles from "./album.module.scss";
import {useContext} from "react";
import {AlbumPathContext} from "../../../App";
import {Link} from "react-router-dom";

interface ContainerProps {
    imageLink?: string;
    title: string;
    subtitle: string;
}

const defaultImage = 'https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T127A1PA5161PT21X2Y6D135599871W2540H2132/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/garde-la-peche-grands-badges.jpg';

const Album: React.FC<ContainerProps> = ({title, subtitle, imageLink = defaultImage}) => {
    const albumPath = useContext(AlbumPathContext);

    return (
        <Link to={albumPath}>
            <div className={styles.container}>
                <img className={styles.image} src={imageLink}/>
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </Link>
    );
};

export default Album;
