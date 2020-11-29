import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// Icons
import { ReactComponent as UploadIcon } from '../../assets/upload_photo.svg';
import { ReactComponent as UploadDoneIcon } from '../../assets/upload_photo_done.svg';
// Components
import { FormError } from '../';

export const FileInput = forwardRef((props, ref) => {
  const { isLoaded, name, label, error, ...rest } = props;

  return (
    <>
      <StyledLabel htmlFor={name}>
        {label === 'Image selected' ? (
          <StyledUploadDoneIcon />
        ) : (
          <StyledUploadIcon />
        )}
        <StyledLabelText>{label}</StyledLabelText>
        <StyledButton
          {...rest}
          rows='4'
          id={name}
          name={name}
          type='file'
          ref={ref}
        />
      </StyledLabel>
      {error && <FormError>{error.message}</FormError>}
    </>
  );
});

// Shared
const whiteColor = css`
  ${({ theme: { color } }) => color.white};
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  background-color: ${({ theme: { color } }) => color.accent};
  width: max-content;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const StyledLabelText = styled.p`
  margin: 0 0 0 0.8rem;
  color: ${whiteColor};
`;

const StyledButton = styled.input`
  display: none;
`;

const StyledUploadIcon = styled(UploadIcon)`
  fill: ${whiteColor};
`;

const StyledUploadDoneIcon = styled(UploadDoneIcon)`
  fill: ${whiteColor};
`;

FileInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOf(['Choose image', 'Image selected']),
  error: PropTypes.object,
};
