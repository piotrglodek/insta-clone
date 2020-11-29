import styled from 'styled-components';
// Icon
import { ReactComponent as SpinnerIcon } from '../../assets/spinner.svg';

export const Spinner = () => {
  return <StyledSpinner />;
};

const StyledSpinner = styled(SpinnerIcon)`
  display: block;
  margin: 0 auto;
`;
