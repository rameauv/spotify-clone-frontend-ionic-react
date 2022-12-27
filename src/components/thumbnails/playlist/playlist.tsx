import styles from "./playlist.module.scss";

interface ContainerProps {
    imageLink?: string;
    title: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-siw08m3LeGTDrlq0-YNHzKA-t500x500.jpg';

const Playlist: React.FC<ContainerProps> = ({title, imageLink = defaultImage}) => {
    return (
        // <Link to={playlistPath}>
            <div className={styles.container}>
                <img className={styles.image} src={imageLink}/>
                <p className={styles.text}>{title}</p>
            </div>
        // </Link>
    );
};

export default Playlist;
