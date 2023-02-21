import {Action} from '@reduxjs/toolkit';
import {LikeDeletedActionPayload} from './like-deleted-action-payload';

export interface LikeDeletedAction extends Action {
    payload: LikeDeletedActionPayload;
}
