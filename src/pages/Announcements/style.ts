import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

export const PageContainer = styled.div`
    `;

export const CreateButtonContainer = styled.div`
  margin-bottom: 20px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Ajuste conforme necessário */
`;

export const DataTableContainer = styled.div`
  margin-top: 20px;
`;

export const ModalContent = styled.div`
  p {
    margin: 10px 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  span {
    display: block;
  }
`;
