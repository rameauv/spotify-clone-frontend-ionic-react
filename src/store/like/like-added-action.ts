import {Action} from '@reduxjs/toolkit';
import {LikeAddedActionPayload} from './like-added-action-payload';

export interface LikeAddedAction extends Action {
    payload: LikeAddedActionPayload;
}
