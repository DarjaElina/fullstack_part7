import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const MobileMenuContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    background-color: #ffc43d;
    height: 100%;
    width: 300px;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    padding-top: 30px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 30px;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.4s ease-in-out;
    z-index: 3;
  }
  a {
    font-size: 30px;
    color: #202020;
  }
`;

const MobileMenuCloseIcon = styled(IoCloseSharp)`
  cursor: pointer;
`;

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const mobileMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);


  return (
    <MobileMenuContainer ref={mobileMenuRef} open={isOpen}>
      <MobileMenuCloseIcon onClick={() => setIsOpen(!isOpen)} />
      <Link onClick={() => setIsOpen(!isOpen)} to='/'>BLOGS</Link>
      <Link onClick={() => setIsOpen(!isOpen)} to='/users'>USERS</Link>
      <Link onClick={() => setIsOpen(!isOpen)} to='/'>HOME</Link>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
