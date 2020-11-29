import styled from 'styled-components';
// Components
import { Time, Avatar } from '../';

import { Link } from 'react-router-dom';

export const NotificationItem = ({ data }) => {
  const { name, link, avatar, type, timestamp, postImage } = data;

  return (
    <StyledItem>
      <Avatar size='small' src={avatar} alt={`${name}, profile picture`} />
      <StyledDetails>
        <div>
          <StyledLink $bold to={`/${name}`}>
            {name}
          </StyledLink>
        </div>
        <div>
          {type === 'follow' ? (
            'now follows you.'
          ) : (
            <StyledLink to={link}>liked your post.</StyledLink>
          )}
          <Time date={timestamp.toDate()} />
        </div>
      </StyledDetails>
      {postImage ? (
        <StyledPostImageContainer>
          <StyledPostImage url={postImage} />
        </StyledPostImageContainer>
      ) : null}
    </StyledItem>
  );
};

const StyledItem = styled.div`
  display: flex;
  padding: 1.2rem 1.6rem;
  position: relative;

  &::after {
    border-bottom: 0.1rem solid ${({ theme: { color } }) => color.gray};
    bottom: 0;
    content: '';
    height: 0;
    left: 5rem;
    position: absolute;
    right: 1.2rem;
  }
`;

const StyledDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 1.6rem;

  & :nth-child(1) {
    margin-bottom: 0.6rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme: { color } }) => color.black};
  text-decoration: none;
  font-weight: ${({ $bold, theme: { fontWeight } }) =>
    $bold ? fontWeight.medium : fontWeight.regular};
`;

const StyledPostImageContainer = styled.div`
  width: 6.4rem;
`;

const StyledPostImage = styled.div`
  display: block;
  padding-top: 100%;
  background-position: 50%;
  background-size: cover;
  background-image: url(${({ url }) => url});
`;
