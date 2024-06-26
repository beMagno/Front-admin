import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const ScrollableModalBody = styled(Modal.Body)`
    max-height: 400px; // ajustável conforme necessário
    overflow-y: auto;

    img {
        max-width: 100%; // ajusta as imagens para o tamanho máximo do modal
        height: auto; // mantém a proporção da imagem
    }
`;

const DataModal = ({ open, handleClose, announcement }) => {
    return (
        <Modal show={open} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Visualização de: {announcement?.title}</Modal.Title>
            </Modal.Header>
            <ScrollableModalBody>
                <p><strong>Tipo:</strong> {announcement?.announcement_type}</p>
                <p><strong>Mensagem:</strong> 
                    <span dangerouslySetInnerHTML={{ __html: announcement?.message }} />
                </p>
                <p><strong>Descrição:</strong> {announcement?.description}</p>
                <p><strong>Fixar:</strong> {announcement?.pin ? 'Sim' : 'Não'}</p>
                <p><strong>Data de Postagem:</strong> {formatDate(announcement?.post_date)}</p>
                <p><strong>Data de Exclusão:</strong> {formatDate(announcement?.exclusion_date)}</p>
                <p><strong>Status:</strong> {announcement?.status}</p>
            </ScrollableModalBody>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DataModal;
