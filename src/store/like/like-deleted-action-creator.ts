import {LikeDeletedAction} from './like-deleted-action';

export const actionType = 'like/likeDeleted';

export const likeDeletedActionCreator = {
    actionType: actionType,
    create({id, associatedId}: { id: string, associatedId: string }): LikeDeletedAction {
        return {
            type: actionType,
            payload: {
                id: id,
                associatedId: associatedId
            }
        };
    }
};
