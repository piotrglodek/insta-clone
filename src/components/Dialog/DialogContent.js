import styled from 'styled-components';
import PropTypes from 'prop-types';

export const DialogContent = ({ children }) => {
  return <StyledContentContainer>{children}</StyledContentContainer>;
};

const StyledContentContainer = styled.div`
  padding-bottom: 1.6rem;
  margin: 0;
  color: ${({ theme: { color } }) => color.darkGray};
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
`;

DialogContent.propTypes = {
  children: PropTypes.node,
};
