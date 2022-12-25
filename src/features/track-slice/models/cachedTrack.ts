export interface Track {
    id: string;
    title: string;
    artistName: string;
    thumbnailUrl?: string;
}

export interface CachedTrack {
    id: string;
    track?: Track;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}
