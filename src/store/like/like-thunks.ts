import {createAsyncThunk} from '@reduxjs/toolkit';
import {LikeDto} from '../../api';
import {performLogout} from '../logout';
import {albumkApi, artistApi, likeApi, trackApi} from '../../tools/client';
import {LikeDeletedActionPayload} from './like-deleted-action-payload';
import {likeAddedActionCreator} from './like-added-action-creator';
import {likeDeletedActionCreator} from './like-deleted-action-creator';
import {AxiosError} from 'axios';

export interface LikeBase {
    id: string;
    thumbnailUrl?: string;
}

export interface TrackLike extends LikeBase {
    title: string;
    artist: string;
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

interface SpecificLikeAddedActionPayload<T extends LikeBase> {
    likeId: string;
    updatedAt: number;
    item: T;
}

function genTypePrefix(actionName: string) {
    return `like/${actionName}`;
}

function createAddLikeThunk<T extends LikeBase>(typePreftix: string, request: (id: string) => Promise<LikeDto>) {
    return createAsyncThunk<SpecificLikeAddedActionPayload<T>, T>(typePreftix, async (arg, {dispatch}) => {
        const {id} = arg;
        try {
            const res = await request(id);
            dispatch(likeAddedActionCreator.create({id: res.id, associadedId: id}));
            return {
                item: arg,
                updatedAt: new Date().getTime(),
                likeId: res.id
            };
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                dispatch(performLogout());
            }
            throw e;
        }
    });
}

function createDeleteLikeThunk(typePrefix: string) {
    return createAsyncThunk<LikeDeletedActionPayload, { id: string, associatedId: string }>(typePrefix, async (arg, {dispatch}) => {
        try {
            await likeApi.likeIdDeleteDelete(arg.id);
            dispatch(likeDeletedActionCreator.create({id: arg.id, associatedId: arg.associatedId}));
            return {
                id: arg.id,
                associatedId: arg.associatedId
            };
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response?.status === 401) {
                dispatch(performLogout());
            }
            throw e;
        }
    });
}


export const addTrackLikeThunk = createAddLikeThunk<TrackLike>(genTypePrefix('TrackLikeAdded'), ((id) => trackApi.trackIdLikePatch(id).then(res => res.data)));
export const addAlbumLikeThunk = createAddLikeThunk<AlbumLike>(genTypePrefix('albumLikeAdded'), ((id) => albumkApi.albumIdLikePatch(id).then(res => res.data)));
export const addArtistLikeThunk = createAddLikeThunk<ArtistLike>(genTypePrefix('artistLikeAdded'), ((id) => artistApi.artistIdLikePatch(id).then(res => res.data)));
export const deleteTrackLikeThunk = createDeleteLikeThunk(genTypePrefix('trackLikeDeleted'));
export const deleteAlbumLikeThunk = createDeleteLikeThunk(genTypePrefix('albumLikeDeleted'));
export const deleteArtistLikeThunk = createDeleteLikeThunk(genTypePrefix('artistLikeDeleted'));
