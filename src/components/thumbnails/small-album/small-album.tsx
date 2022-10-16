import styles from "./small-album.module.scss";

interface ContainerProps {
    imageLink?: string;
    title: string;
}

const defaultImage = 'https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T127A1PA5161PT21X2Y6D135599871W2540H2132/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/garde-la-peche-grands-badges.jpg';

const SmallAlbum: React.FC<ContainerProps> = ({title, imageLink = defaultImage}) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={imageLink}/>
            <p className={styles.text}>{title}</p>
        </div>
    );
};

export default SmallAlbum;
