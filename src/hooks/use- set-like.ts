import {useDispatch} from 'react-redux';
import * as LikeSlice from '../store/slices/like-slise/like-slice';
import * as LibrarySlice from '../store/slices/library-slice/library-slice';

export interface LikeBase {
    id: string;
    updatedAt: number;
    thumbnailUrl?: string;
}

export interface AlbumLike extends LikeBase {
    title: string;
    artistName: string,
    type: string;
}

export interface ArtistLike extends LikeBase {
    name: string
}

export interface TrackLike extends LikeBase {
    title: string;
    artist: string;
    thumbnailUrl?: string;
}

function useSetLike() {
    const dispatch = useDispatch();
    return {
        artistSetLike: async (item: ArtistLike) => {
            await dispatch(LikeSlice.addArtistLikeThunk({id: item.id})).unwrap();
            dispatch(LibrarySlice.addArtistLike({...item, likeId: ''}));
        },
        albumSetLike: async (item: AlbumLike) => {
            await dispatch(LikeSlice.addAlbumLikeThunk({id: item.id})).unwrap();
            dispatch(LibrarySlice.addAlbumLike({...item, likeId: ''}));
        },
        trackSetLike: async (item: TrackLike) => {
            await dispatch(LikeSlice.addTrackLikeThunk({id: item.id}));
            dispatch(LibrarySlice.addTrackLike({...item, likeId: ''}));
        }
    };
}

export default useSetLike;
