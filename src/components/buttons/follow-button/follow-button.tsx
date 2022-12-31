import {MouseEventHandler} from 'react';
import RectangularOutlineButton from '../rectangular-outline-button/rectangular-outline-button';

export interface FollowButtonProps {
    isFollowing: boolean;
    onClick?: MouseEventHandler;
}

const FollowButton: React.FC<FollowButtonProps> = ({onClick, isFollowing}) => {
    return (
        <RectangularOutlineButton
            title={isFollowing ? 'Following' : 'Follow'}
            onClick={onClick}
            isDisabled={isFollowing}
        />
    );
};

export default FollowButton;
