import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Services
import { db } from '../../firebase';
// Components
import { Spinner, Avatar } from '../';

const SearchResult = ({ name, avatar }) => {
  return (
    <StyledLink to={name}>
      <Avatar src={avatar} alt={`${name}, profile picture`} />
      <StyledText>{name}</StyledText>
    </StyledLink>
  );
};

export const ExploreSearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSearchResults = async searchTerm => {
    if (searchTerm) {
      const users = await db
        .collection('users')
        .orderBy('name')
        .startAt(searchTerm.toLowerCase())
        .endAt(searchTerm.toLowerCase() + '\uf8ff')
        .get();

      const array = await users.docs.map(user => {
        const { id, name, avatar } = user.data();
        return <SearchResult key={id} name={name} avatar={avatar} />;
      });
      setResults(array);
      setIsLoading(false);
    }
    return [];
  };

  useEffect(() => {
    getSearchResults(searchTerm);
  }, [searchTerm]);

  return isLoading ? (
    <Spinner />
  ) : results.length ? (
    <StyledMain>
      <StyledResultsWrapper>{results}</StyledResultsWrapper>
    </StyledMain>
  ) : (
    <p>Nothing found</p>
  );
};

const StyledMain = styled.main`
  width: 100%;
  margin: 3rem auto 7.4rem auto;
  max-width: 60rem;
`;

const StyledResultsWrapper = styled.div`
  padding: 0 1.6rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  padding: 0.5rem 0;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
  align-items: center;
`;

const StyledText = styled.p`
  margin: 0 0 0 1.6rem;
  color: ${({ theme: { color } }) => color.black};
`;
