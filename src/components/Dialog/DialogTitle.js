import styled from 'styled-components';
import PropTypes from 'prop-types';

export const DialogTitle = ({ children }) => {
  return (
    <StyledTitleContainer>
      <StyledTitle>{children}</StyledTitle>
    </StyledTitleContainer>
  );
};

const StyledTitleContainer = styled.div`
  padding-bottom: 1.6rem;
`;

const StyledTitle = styled.h2`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
`;

DialogTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
