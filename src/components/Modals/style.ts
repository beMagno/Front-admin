import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  max-width: 70%;
  width: 95%;
  height: 80vh;  
  overflow-y: auto;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: auto; 
  }
`;

export const ModalActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const ModalTitle = styled(Box)`
  font-weight: bold;
  font-size: 1.8rem;  
  margin-bottom: 16px;
`;
