import styled from 'styled-components';
import PropTypes from 'prop-types';
// Avatar variants
import * as Variants from './avatarVariants';

export const Avatar = ({ src, size, alt }) => {
  return <StyledAvatar src={src} size={size} alt={alt} />;
};

const StyledAvatar = styled.img`
  border-radius: 50%;
  display: block;
  ${({ size }) => Variants[size]};
  object-fit: cover;
  object-position: center;
`;

Avatar.defaultProps = {
  size: 'base',
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['big', 'base', 'small']),
};
