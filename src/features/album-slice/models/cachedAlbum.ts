export interface Album {
    id: string;
    title: string;
    releaseDate: string;
    thumbnailUrl?: string;
    artistId: string;
    artistName: string;
    artistThumbnailUrl?: string;
    albumType: string;
}

export interface CachedAlbum {
    id: string;
    album?: Album;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}
