import styled from 'styled-components';
import PropTypes from 'prop-types';
// Button variants
import * as Variants from './buttonVariants';

// Variants
// primary
// danger
export const Button = ({ icon: Icon, children, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {Icon && (
        <StyledIconWrapper>
          <Icon />
        </StyledIconWrapper>
      )}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.6rem;
  font-family: inherit;
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
  border-radius: 0.4rem;
  ${props => Variants[props.variant]};
`;

const StyledIconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-block;
  height: 1.8rem;
`;

Button.defaultProps = {
  variant: 'base',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'danger', 'base']),
  onClick: PropTypes.func,
};
