import PropTypes from 'prop-types';
// Components
import { Button } from '../';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/features/user/userSlice';
// Services
import { db, FieldValue } from '../../firebase';

export const FollowButton = ({ isUserFollowed, idToFollow }) => {
  const { id, name, avatar } = useSelector(selectProfile);
  const toggleFollow = () => {
    const currentUser = db.collection('users').doc(id);
    const userToFollow = db.collection('users').doc(idToFollow);

    // user is not followed
    if (!isUserFollowed) {
      currentUser.update({ following: FieldValue.arrayUnion(idToFollow) });
      userToFollow.update({ followers: FieldValue.arrayUnion(id) });

      userToFollow
        .collection('notifications')
        .doc(id)
        .set({
          type: 'follow',
          link: `/${name}`,
          name,
          id: id,
          avatar,
          unread: true,
          timestamp: FieldValue.serverTimestamp(),
        });
    } else {
      currentUser.update({ following: FieldValue.arrayRemove(idToFollow) });
      userToFollow.update({ followers: FieldValue.arrayRemove(id) });

      userToFollow.collection('notifications').doc(id).delete();
    }
  };

  return (
    <Button onClick={toggleFollow} variant='primary'>
      {isUserFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  idToFollow: PropTypes.string.isRequired,
  isUserFollowed: PropTypes.bool.isRequired,
};
