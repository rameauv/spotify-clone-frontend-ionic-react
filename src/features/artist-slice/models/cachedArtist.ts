export interface Artist {
    id: string;
    name: string;
    thumbnailUrl?: string;
    monthlyListeners: number;
    albums?: any[]
}

export interface CachedArtist {
    id: string;
    artist?: Artist;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}
