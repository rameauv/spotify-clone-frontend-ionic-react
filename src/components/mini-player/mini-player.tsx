import styles from './mini-player.module.scss';
import HeartButton from "../buttons/heart-button/heart-button";
import PlayButton from "../buttons/play-button/play-button";
import {IonProgressBar} from "@ionic/react";
import React, {useState} from "react";

const defaultImage = 'https://i1.sndcdn.com/artworks-000896291524-ebqgho-t500x500.jpg';

export interface MiniPlayerProps {

}

const MiniPlayer: React.FC<MiniPlayerProps> = ({}) => {
    const [isCurrentSongLiked, setIsCurrentSongLiked] = useState<boolean>(false);
    const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState<boolean>(false);

    return (
        <div className={styles.player}>
            <div className={styles.playerContainer}>
                <img className={styles.thumbnail} src={defaultImage}/>
                <div className={styles.titlesContainer}>
                    <p className={styles.playerTitle}>Je te donne</p>
                    <p className={styles.playerArtist}>Jean-jaques goldman</p>
                </div>
                <div className={styles.heartButton}>
                    <HeartButton
                        isActivated={isCurrentSongLiked}
                        onClick={() => setIsCurrentSongLiked(!isCurrentSongLiked)}
                    />
                </div>
                <PlayButton
                    isPlaying={isCurrentSongPlaying}
                    onClick={() => setIsCurrentSongPlaying(!isCurrentSongPlaying)}
                />
            </div>
            <IonProgressBar className={styles.progress} value={0.4}></IonProgressBar>
        </div>
    );
};

export default MiniPlayer;
