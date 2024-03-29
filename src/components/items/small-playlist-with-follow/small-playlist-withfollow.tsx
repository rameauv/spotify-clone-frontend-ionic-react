import styles from './small-playlist-with-follow.module.scss';

interface SmallPlaylistWithfollowProps {
    imageLink?: string;
    title: string;
    followers: number;
}

const defaultImage = 'https://image.spreadshirtmedia.net/image-server/v1/mp/compositions/T127A1PA5161PT21X2Y6D135599871W2540H2132/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/garde-la-peche-grands-badges.jpg';

const SmallPlaylistWithfollow: React.FC<SmallPlaylistWithfollowProps> =
    ({
         title,
         imageLink = defaultImage,
         followers
     }) => {
        return (
            <div className={styles.container}>
                <img
                    className={styles.image}
                    src={imageLink}
                    alt="playlist's thumbnail"
                />
                <div className={styles.textContainer}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.followers}>{followers} followers</p>
                </div>
            </div>
        );
    };

export default SmallPlaylistWithfollow;
