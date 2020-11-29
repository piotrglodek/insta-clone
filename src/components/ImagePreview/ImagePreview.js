import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ImagePreview = ({ src, ...rest }) => {
  if (!src) {
    return null;
  }
  return <StyledImage src={src} {...rest} alt='image preview' />;
};

const StyledImage = styled.img`
  height: 16rem;
  display: block;
  margin: 1.6rem;
`;

ImagePreview.propTypes = {
  src: PropTypes.string,
};
