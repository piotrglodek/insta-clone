import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// Components
import {
  Avatar,
  LikeButton,
  Time,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '../';
// Router
import { Link } from 'react-router-dom';
// Icons
import { ReactComponent as MoreHorizontalIcon } from '../../assets/more_horizontal.svg';
// Hooks
import { useDialog } from '../../hooks/useDialog';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/features/user/userSlice';
// Services
import { db } from '../../firebase';

export const Post = ({ postData }) => {
  const {
    authorId,
    authorName,
    avatar,
    image,
    text,
    likes,
    timestamp,
    id,
  } = postData;

  const { id: userId } = useSelector(selectProfile);
  const isThisCurrentUsersPost = userId === authorId;
  const [isOpenDialog, handleOpenDialog, handleCloseDialog] = useDialog();

  const history = useHistory();

  const handleDeletePost = async () => {
    await db.collection('posts').doc(id).delete();

    const notificationsRef = db
      .collection('users')
      .doc(authorId)
      .collection('notifications');

    const nots = await notificationsRef.where('postId', '==', id).get();
    nots.docs.forEach(not => {
      notificationsRef.doc(not.id).delete();
    });
    history.push('/');
    handleCloseDialog();
  };

  return (
    <>
      <StyledPost>
        <StyledPostHeader>
          <StyledPostHeaderRow>
            <Avatar src={avatar} />
            <StyledHeading to={`/${authorName}`}>{authorName}</StyledHeading>
          </StyledPostHeaderRow>
          {isThisCurrentUsersPost && (
            <StyledButton onClick={handleOpenDialog}>
              <MoreHorizontalIcon />
            </StyledButton>
          )}
        </StyledPostHeader>
        <StyledPostImage src={image} />
        <StyledPostActions>
          <StyledButtonGroup>
            <LikeButton postId={id} postImage={image} authorId={authorId} />
          </StyledButtonGroup>
        </StyledPostActions>
        <StyledPostDetails>
          <StyledText>
            <StyledLikeCounts>{likes}</StyledLikeCounts>
            {likes === 1 ? 'like' : 'likes'}
          </StyledText>
          <StyledPostText>{text}</StyledPostText>
          <StyledPostTime>
            <Time date={timestamp.toDate()} />
          </StyledPostTime>
        </StyledPostDetails>
      </StyledPost>
      {/* Dialog */}
      <Dialog isOpen={isOpenDialog}>
        <DialogTitle>Post actions</DialogTitle>
        <DialogContent>
          <Button onClick={handleDeletePost} variant='danger'>
            Delete post
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledPost = styled.article`
  margin-bottom: 4rem;
  display: block;
  border: 0.1rem solid ${({ theme: { color } }) => color.gray};
  border-radius: 0.3rem;
`;

const StyledPostHeader = styled.header`
  padding: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledPostHeaderRow = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  cursor: pointer;

  svg {
    fill: ${({ theme: { color } }) => color.black};
  }
`;

const StyledHeading = styled(Link)`
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  line-height: 42px;
  margin-left: 0.4rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledPostImage = styled.div`
  display: block;
  padding-top: 100%;
  background-position: 50%;
  background-size: cover;
  background-image: url(${({ src }) => src});
`;

const StyledPostActions = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.4rem;
  margin-top: 0.5rem;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  margin-right: 0.5rem;
`;

const StyledPostDetails = styled.section`
  padding: 0 1.4rem;
  margin-top: 0.5rem;
`;

const StyledText = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
`;

const StyledLikeCounts = styled.span`
  margin-right: 0.3rem;
  font-size: inherit;
  color: ${({ theme: { color } }) => color.black};
`;

const StyledPostText = styled.p`
  color: ${({ theme: { color } }) => color.black};
`;

const StyledPostTime = styled.div`
  padding-bottom: 0.5rem;
`;

Post.propTypes = {
  postData: PropTypes.object.isRequired,
};
