import {LikeAddedActionPayload} from './like-added-action-payload';
import {LikeAddedAction} from './like-added-action';

const actionType = 'like/likeAdded';

export const likeAddedActionCreator = {
    actionType: actionType,
    create({id, associadedId}: { id: string, associadedId: string }): LikeAddedAction {
        const payload: LikeAddedActionPayload = {
            id: id,
            associatedId: associadedId
        };
        return {
            type: actionType,
            payload
        };
    }
};
