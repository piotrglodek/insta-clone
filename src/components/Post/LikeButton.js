import styled from 'styled-components';
// Icons
import { ReactComponent as HeartIcon } from '../../assets/heart_border.svg';
import { ReactComponent as HeartActiveIcon } from '../../assets/heart.svg';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/features/user/userSlice';
// Services
import { db, FieldValue } from '../../firebase';

export const LikeButton = ({ postId, postImage, authorId }) => {
  const { id, likedPosts, name, avatar } = useSelector(selectProfile);
  const isLiked = likedPosts.includes(postId);

  const currentUser = db.collection('users').doc(id);
  const author = db.collection('users').doc(authorId);
  const post = db.collection('posts').doc(postId);

  const handleToggleLike = () => {
    // post not liked by current user
    if (!isLiked) {
      // add post id to liked posts by current user
      currentUser.update({ likedPosts: FieldValue.arrayUnion(postId) });
      // add like to post
      post.update({ likes: FieldValue.increment(1) });

      if (authorId !== id) {
        const notificationId = author.collection('notifications').doc().id;
        author
          .collection('notifications')
          .doc(notificationId)
          .set({
            id: notificationId,
            sender: id,
            type: 'like',
            link: `/p/${postId}`,
            postId,
            postImage,
            name,
            avatar,
            unread: true,
            timestamp: FieldValue.serverTimestamp(),
          });
      }
    } else {
      // post liked by current user
      currentUser.update({ likedPosts: FieldValue.arrayRemove(postId) });
      // remove like from post
      post.update({ likes: FieldValue.increment(-1) });

      // delete notification
      if (authorId !== id) {
        author
          .collection('notifications')
          .where('postId', '==', postId)
          .where('sender', '==', id)
          .get()
          .then(snapshot => {
            const { id } = snapshot.docs[0];
            author.collection('notifications').doc(id).delete();
          });
      }
    }
  };

  return (
    <StyledButton onClick={handleToggleLike}>
      {isLiked ? <StyledHeartActiveIcon /> : <StyledHeartIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const StyledHeartIcon = styled(HeartIcon)``;
const StyledHeartActiveIcon = styled(HeartActiveIcon)`
  fill: ${({ theme: { color } }) => color.action};
`;
