import styled from 'styled-components';
import { useEffect } from 'react';

export const Dialog = ({ isOpen, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <StyledModalContainer aria-hidden={isOpen} isOpen={isOpen}>
      <StyledModal>{children}</StyledModal>
    </StyledModalContainer>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  z-index: ${({ theme: { zIndex } }) => zIndex.drawer};
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const StyledModal = styled.div`
  z-index: ${({ theme: { zIndex } }) => zIndex.modal};
  max-width: 60rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1.6rem;
  padding: 1.6rem 2.4rem;
  border-radius: 0.4rem;
  background-color: ${({ theme: { color } }) => color.white};
`;
