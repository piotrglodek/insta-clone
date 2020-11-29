import styled from 'styled-components';
// Icon
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

export const SearchInput = props => {
  return (
    <StyledSearchContainer>
      <StyledSearchIcon />
      <StyledSearchInput {...props} type='search' />
    </StyledSearchContainer>
  );
};

const StyledSearchContainer = styled.div`
  border: 0.1rem solid ${({ theme: { color } }) => color.darkGray};
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 0.4rem;
  padding: 0.5rem;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 2.4rem;
  height: 2.4rem;
  fill: ${({ theme: { color } }) => color.darkGray};
`;

const StyledSearchInput = styled.input`
  margin-left: 1rem;
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: inherit;
  font-family: inherit;
  resize: none;
  padding: 0;
`;
