import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import { StyledModalBox, ModalActions, ModalTitle } from './style';

interface GenericModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  handleSave?: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({ open, handleClose, title, children, handleSave }) => {
  return (  
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <StyledModalBox>
        <ModalTitle id="modal-title">
          {title}
        </ModalTitle>
        <Typography variant="body1" id="modal-description" sx={{ mb: 2 }}>
          {children}
        </Typography>
        <ModalActions>
          {handleSave && (
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              Save
            </Button>
          )}
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </ModalActions>
      </StyledModalBox>
    </Modal>
  );
};

export default GenericModal;
