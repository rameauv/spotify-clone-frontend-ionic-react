import SearchPlaylistBase from '../search-playlist-base/search-playlist-base';
import {useHistory} from 'react-router-dom';
import {PathsContext} from '../../../pages/private-pages-router/private-pages-router';
import {useContext} from 'react';
import * as defaultThumbnails from '../../../assets/defaultThumbnails';

interface SearchLikedSongsPlaylistProps {
    songsCount: number;
}

const SearchLikedSongsPlaylist: React.FC<SearchLikedSongsPlaylistProps> = ({songsCount}) => {
    const path = useContext(PathsContext).likedSongs();
    const history = useHistory();
    const subtitle = `${songsCount} songs`;
    const thumbnailUrl = defaultThumbnails.default.searchLikedSongsPlaylist;

    function handleOnClickEvent() {
        history?.push(path);
    }

    return (
        <SearchPlaylistBase
            title="Liked songs"
            subtitle={subtitle}
            thumbnailUrl={thumbnailUrl}
            onClick={() => handleOnClickEvent()}
        />
    );
};

export default SearchLikedSongsPlaylist;
