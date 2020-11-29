import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect, createRef } from 'react';
// Components
import {
  Header,
  Avatar,
  FollowButton,
  Button,
  ExplorePost,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Textarea,
  FileInput,
} from '../';
// Services
import { db, auth, storage } from '../../firebase';
// Icons
import { ReactComponent as GearActiveIcon } from '../../assets/settings.svg';
import { ReactComponent as GearIcon } from '../../assets/settings_border.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
// Hooks
import { useMouseHoverState } from '../../hooks/useMouseHoverState';
import { useDrawer } from '../../hooks/useDrawer';
import { useDialog } from '../../hooks/useDialog';

export const UserProfile = ({
  isThisCurrentUserProfile,
  isUserFollowed,
  user,
}) => {
  const { name, avatar, id, bio, followers, following } = user;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('posts')
      .where('authorId', '==', id)
      .orderBy('timestamp', 'desc')
      .get()
      .then(snapshot => {
        const array = snapshot.docs.map(doc => ({ ...doc.data() }));
        setPosts(array);
        setLoading(false);
      });
  }, [id]);

  const [isHover, handleMouseEnter, handleMouseLeave] = useMouseHoverState();
  const [isDrawerOpen, handleToggleDrawer] = useDrawer();

  const [isOpenDialog, handleOpenDialog, handleCloseDialog] = useDialog();

  const handleLogout = () => auth.signOut();

  const bioInput = createRef();
  const [bioError, setBioError] = useState(null);

  const handleUpdateBio = async () => {
    const value = bioInput.current.value;
    if (value) {
      await db.collection('users').doc(id).update({ bio: value });
      handleCloseDialog();
    } else {
      setBioError({ message: 'bio text is required!' });
    }
  };

  const [uploadProfileImageError, setUploadProfileImageError] = useState(null);
  const profileInput = createRef();

  const handleUpdateProfileImage = async () => {
    const image = profileInput.current.files[0];
    if (image) {
      try {
        const filePath = `avatars/${id}/${image.name}`;
        const fileSnapshot = await storage.ref(filePath).put(image);

        const url = await fileSnapshot.ref.getDownloadURL();
        db.collection('users').doc(id).update({ avatar: url });

        await db
          .collection('posts')
          .where('authorId', '==', id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection('posts').doc(doc.id).update({ avatar: url });
            });
          });
        handleToggleDrawer();
      } catch (error) {
        setUploadProfileImageError({ message: error.message });
      }
    }
  };

  return (
    <>
      <Header>
        <StyledHeaderContainer>
          <StyledHeading>{name}</StyledHeading>
          {isThisCurrentUserProfile && (
            <StyledButton
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleToggleDrawer}
            >
              {isHover ? <GearActiveIcon /> : <GearIcon />}
            </StyledButton>
          )}
        </StyledHeaderContainer>
      </Header>
      <StyledMain>
        <StyledInnerContainer>
          <StyledUserHeader>
            <StyledAvatarContainer>
              <Avatar src={avatar} size='big' />
            </StyledAvatarContainer>
            <StyledUsernameContainer>
              <StyledUsername>{name}</StyledUsername>
              {isThisCurrentUserProfile ? (
                <Button onClick={handleToggleDrawer}>Edit profile</Button>
              ) : (
                <FollowButton isUserFollowed={isUserFollowed} idToFollow={id}>
                  Follow
                </FollowButton>
              )}
            </StyledUsernameContainer>
          </StyledUserHeader>
          <StyledBioContainer>
            {bio && <StyledBio>{bio}</StyledBio>}
            {isThisCurrentUserProfile && (
              <Button onClick={handleOpenDialog}>Update bio</Button>
            )}
          </StyledBioContainer>
          <StyledList>
            <StyledListItem>
              <StyledListHead>Posts:</StyledListHead>
              <StyledListBody>{!loading && posts.length}</StyledListBody>
            </StyledListItem>
            <StyledListItem>
              <StyledListHead>Followers:</StyledListHead>
              <StyledListBody>{followers.length}</StyledListBody>
            </StyledListItem>
            <StyledListItem>
              <StyledListHead>Following:</StyledListHead>
              <StyledListBody>{following.length}</StyledListBody>
            </StyledListItem>
          </StyledList>
        </StyledInnerContainer>
        <StyledPostsGrid>
          {!loading &&
            posts.map(post => {
              return <ExplorePost key={post.id} {...post} />;
            })}
        </StyledPostsGrid>
      </StyledMain>
      {/* Dialog */}
      <Dialog isOpen={isOpenDialog}>
        <DialogTitle>Update your profile bio</DialogTitle>
        <DialogContent>
          <Textarea
            name='userBio'
            label='Profile bio: '
            error={bioError}
            type='text'
            ref={bioInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateBio} variant='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* DRAWER */}
      <StyledDrawer isDrawerOpen={isDrawerOpen}>
        <StyledDrawerHeader>
          <StyledDrawerTitle>Settings</StyledDrawerTitle>
          <StyledButton onClick={handleToggleDrawer}>
            <CloseIcon />
          </StyledButton>
        </StyledDrawerHeader>
        <StyledDrawerBody>
          <StyledDrawerItem>
            <StyledDrawerText>Change profile picture</StyledDrawerText>
            <FileInput
              name='profileImage'
              label='Choose image'
              ref={profileInput}
              error={uploadProfileImageError}
              accept='image/*'
              onChange={handleUpdateProfileImage}
            />
          </StyledDrawerItem>
          <StyledDrawerItem>
            <Button onClick={handleLogout}>Log out</Button>
          </StyledDrawerItem>
        </StyledDrawerBody>
      </StyledDrawer>
    </>
  );
};

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  max-width: 60rem;
`;

const StyledHeading = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const StyledMain = styled.main`
  width: 100%;
  margin: 3rem auto 7.4rem auto;
  max-width: 60rem;
`;

const StyledInnerContainer = styled.div`
  padding: 0 1.6rem;
`;

const StyledUserHeader = styled.header`
  display: flex;
  margin-bottom: 2rem;
`;

const StyledAvatarContainer = styled.div`
  margin-right: 1.8rem;
`;

const StyledUsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const StyledUsername = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
`;

const StyledBioContainer = styled.div``;

const StyledBio = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
`;

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  padding-top: 1.8rem;
  margin: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledListHead = styled.span`
  color: ${({ theme: { color } }) => color.darkGray};
  text-align: center;
`;

const StyledListBody = styled.span`
  color: ${({ theme: { color } }) => color.black};
  text-align: center;
`;

const StyledPostsGrid = styled.div`
  display: grid;
  grid-gap: 0.2em;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  grid-auto-flow: dense;
  width: 100%;
  margin: 3rem auto;
  max-width: 60rem;
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

const StyledDrawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(
    ${({ isDrawerOpen }) => (isDrawerOpen ? '0' : '-100%')}
  );
  visibility: ${({ isDrawerOpen }) => (isDrawerOpen ? 'visible' : 'hidden')};
  background: ${({ theme: { color } }) => color.white};
  height: 100%;
  z-index: ${({ theme: { zIndex } }) => zIndex.drawer};
  padding: 1.4rem 1rem;
  min-width: 45%;
  box-shadow: rgba(0, 0, 0, 0.12) 2px 1px 20px, rgba(0, 0, 0, 0.24) 2px 1px 20px;
  transition: all 0.3s ease;
`;

const StyledDrawerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDrawerTitle = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
`;

const StyledDrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.4rem;
`;

const StyledDrawerItem = styled.div`
  margin-bottom: 1.6rem;
`;

const StyledDrawerText = styled.p`
  padding-left: 1.2rem;
  margin-top: 0;
  color: ${({ theme: { color } }) => color.black};
`;

UserProfile.propTypes = {
  isThisCurrentUserProfile: PropTypes.bool.isRequired,
  isUserFollowed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
