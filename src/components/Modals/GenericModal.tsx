import React from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';

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
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 600, width: '90%' }}>
        <Typography variant="h5" component="h2" id="modal-title" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" id="modal-description" sx={{ mb: 2 }}>
          {children}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {handleSave && (
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              Save
            </Button>
          )}
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;
