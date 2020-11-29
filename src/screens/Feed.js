import styled from 'styled-components';
import { useEffect, useState } from 'react';
// Components
import { PageTitle, Header, Post, Spinner } from '../components';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../store/features/user/userSlice';
// Services
import { db } from '../firebase';

export const Feed = () => {
  // current user
  const { id, following } = useSelector(selectProfile);

  const [feedPosts, setFeedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFeedPosts = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .where('authorId', 'in', [...following, id])
      .onSnapshot(querySnapshot => {
        const array = querySnapshot.docs.map(doc => ({ ...doc.data() }));
        setFeedPosts(array);
        setIsLoading(false);
      });

    return () => unsubscribeFeedPosts();
  }, [following, id]);

  const posts = feedPosts.map(post => <Post key={post.id} postData={post} />);

  return (
    <PageTitle title='Feed'>
      <Header>
        <StyledHeaderContainer>
          <StyledLogo>Instagram clone</StyledLogo>
        </StyledHeaderContainer>
      </Header>
      <StyledPostsContainer>
        {feedPosts.length ? (
          posts
        ) : isLoading ? (
          <Spinner />
        ) : (
          <p>Nothing here, try follow peoples</p>
        )}
      </StyledPostsContainer>
    </PageTitle>
  );
};

const StyledHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const StyledLogo = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

const StyledPostsContainer = styled.main`
  width: 100%;
  margin: 3rem auto 7.4rem auto;
  max-width: 60rem;
`;
