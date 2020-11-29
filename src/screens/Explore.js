import styled from 'styled-components';
import { useState } from 'react';
// Components
import {
  PageTitle,
  Header,
  ExplorePostsList,
  SearchInput,
  ExploreSearchResults,
} from '../components';

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = e => setSearchTerm(e.target.value);

  return (
    <PageTitle title='explore'>
      <Header>
        <StyledHeaderContainer>
          <SearchInput
            placeholder='search users'
            value={searchTerm}
            onChange={handleSearch}
          />
        </StyledHeaderContainer>
      </Header>

      {searchTerm ? (
        <ExploreSearchResults searchTerm={searchTerm} />
      ) : (
        <ExplorePostsList />
      )}
    </PageTitle>
  );
};

const StyledHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;
