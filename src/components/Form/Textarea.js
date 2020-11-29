import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// Components
import { FormError } from '../';

export const Textarea = forwardRef((props, ref) => {
  const { name, label, error, ...rest } = props;

  return (
    <StyledLabel htmlFor={name}>
      <StyledLabelText>{label}</StyledLabelText>
      <StyledTextarea name={name} rows='5' {...rest} id={name} ref={ref} />
      {error && <FormError>{error.message}</FormError>}
    </StyledLabel>
  );
});

const darkGray = css`
  ${({ theme: { color } }) => color.darkGray};
`;

const fontSizeL = css`
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
`;

const black = css`
  ${({ theme: { color } }) => color.black};
`;

const resetInput = css`
  outline: none;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  display: block;
`;

const StyledLabel = styled.label`
  display: block;
  max-width: 28rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLabelText = styled.p`
  ${fontSizeL}
  margin: 0;
  color: ${darkGray};
  margin-bottom: 0.2rem;
`;

const StyledTextarea = styled.textarea`
  ${resetInput}
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
  border: 0.1rem solid ${darkGray};
  ${fontSizeL}
  color: ${black};
  transition: border-color 0.4s ease;

  &:focus {
    border-color: ${black};
  }
`;

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
};
