import { useState, useEffect } from 'react';
import styled from 'styled-components';
// Components
import { PageTitle, Header, Post, Spinner } from '../components';
// Router
import { useParams, useHistory } from 'react-router-dom';
// Services
import { db } from '../firebase';
// Icon
import { ReactComponent as ArrowBackIcon } from '../assets/arrow_back.svg';

export const PostPage = () => {
  const { postId } = useParams();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        setPost(doc.data());
        setLoading(false);
      });
    return () => unsubscribe();
  }, [postId]);
  const history = useHistory();
  const handleGoBack = () => history.goBack();

  return (
    <PageTitle title='post'>
      <Header>
        <StyledHeaderContainer>
          <StyledButton onClick={handleGoBack}>
            <StyledArrowBack />
          </StyledButton>
        </StyledHeaderContainer>
      </Header>
      <StyledMain>
        {loading ? <Spinner /> : <Post postData={post} />}
      </StyledMain>
    </PageTitle>
  );
};

const StyledMain = styled.main`
  width: 100%;
  margin: 3rem auto 7.4rem auto;
  max-width: 60rem;
`;

const StyledHeaderContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  padding: 1rem;
`;

const StyledArrowBack = styled(ArrowBackIcon)`
  fill: ${({ theme: { color } }) => color.darkGray};
`;
