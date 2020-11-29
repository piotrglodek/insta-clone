import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SubmitButton = ({ ...rest }) => {
  return <StyledSubmit type='submit' {...rest} />;
};

const StyledSubmit = styled.input`
  margin: 0;
  border: none;
  outline: none;
  padding: 0.8rem 2.4rem;
  border-radius: 0.4rem;
  background-color: ${({ theme: { color } }) => color.accent};
  color: ${({ theme: { color } }) => color.white};
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
