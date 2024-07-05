import styled from 'styled-components';
import Button from '@mui/material/Button';

export const TopbarContainer = styled.div`
  background-color: #ffffff; 
  height: 64px; 
  width: calc(100% - 240px); 
  position: fixed;
  top: 0;
  right: 0;
  left: 240px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 1000;
`;

export const NotificationButton = styled(Button)`
  && {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #333; /* Cor do ícone */
    font-size: 24px;
    border-radius: 100px;
    width: 50px;
    height: 50px;

   
  }
`;

export const AvatarButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;

    .MuiAvatar-root {
      width: 40px;
      height: 40px;
    }
  }
`;
