import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const FormLink = ({ children, ...rest }) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

const StyledLink = styled(Link)`
  color: ${({ theme: { color } }) => color.accent};
  cursor: pointer;
  margin-left: 0.5rem;
  text-decoration: none;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;

FormLink.propTypes = {
  to: PropTypes.string.isRequired,
};
