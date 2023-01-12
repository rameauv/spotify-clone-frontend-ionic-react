import styles from "./playlist.module.scss";

interface ContainerProps {
    imageLink?: string;
    title: string;
}

const defaultImage = 'https://i1.sndcdn.com/artworks-siw08m3LeGTDrlq0-YNHzKA-t500x500.jpg';

const Playlist: React.FC<ContainerProps> = ({title, imageLink = defaultImage}) => {
    return (
        <div className={styles.container}>
            <img
                className={styles.image}
                src={imageLink}
                alt="playlist's thumbnail"
            />
            <p className={styles.text}>{title}</p>
        </div>
    );
};

export default Playlist;
