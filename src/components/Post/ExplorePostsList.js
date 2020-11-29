import styled from 'styled-components';
import { useEffect, useState } from 'react';
// Components
import { ExplorePost, Spinner } from '../';
// Services
import { db } from '../../firebase';

export const ExplorePostsList = () => {
  const [explorePosts, setExplorePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.collection('posts')
      .get()
      .then(snapshot => {
        const array = snapshot.docs.map(doc => ({
          id: doc.data().id,
          image: doc.data().image,
        }));
        setExplorePosts(array);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {explorePosts.length ? (
        <StyledGrid>
          {explorePosts.map(post => (
            <ExplorePost key={post.id} {...post} />
          ))}
        </StyledGrid>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <p>nothing to explore</p>
      )}
    </>
  );
};

const StyledGrid = styled.main`
  display: grid;
  grid-gap: 0.2em;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  grid-auto-flow: dense;
  width: 100%;
  margin: 3rem auto;
  max-width: 60rem;

  & :nth-child(6n) {
    grid-row: span 2;
    grid-column: span 2;
  }
`;
