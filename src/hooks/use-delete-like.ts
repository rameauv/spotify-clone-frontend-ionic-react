import {useDispatch} from 'react-redux';
import {deleteLikeThunk} from '../store/slices/like-slise/like-slice';
import * as LibrarySlice from '../store/slices/library-slice/library-slice';

export interface Like {
    id: string;
    associatedId: string
}

function useDeleteLike() {
    const dispatch = useDispatch();
    const base = (f: (like: Like) => void) => async (like: Like) => {
        await dispatch(deleteLikeThunk(like)).unwrap();
        await f(like);
    };

    return {
        deleteAlbum: base(
            like => dispatch(LibrarySlice.deleteAlbumLike({likeId: like.id}))
        ),
        deleteArtist: base(
            like => dispatch(LibrarySlice.deleteArtistLike({likeId: like.id}))
        )
    };
}

export default useDeleteLike;
