import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Header = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

const StyledHeader = styled.header`
  height: 4.4rem;
  padding: 0 1.6rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
