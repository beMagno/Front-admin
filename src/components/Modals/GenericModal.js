import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GenericModal = ({ open, handleClose, title, children, handleSave }) => {
    return (
        <Modal show={open} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GenericModal;
    