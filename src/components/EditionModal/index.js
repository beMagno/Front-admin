import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

const EditionModal = ({ open, handleClose, announcement }) => {
    const [editedAnnouncement, setEditedAnnouncement] = useState({ ...announcement });
    const [bannerFile, setBannerFile] = useState(null);

    useEffect(() => {
        setEditedAnnouncement({ ...announcement });
    }, [announcement]);

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;
        setEditedAnnouncement(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setBannerFile(e.target.files[0]);
    };

    const handleSave = () => {
        const formData = new FormData();
        for (const key in editedAnnouncement) {
            formData.append(key, editedAnnouncement[key]);
        }
        if (bannerFile) {
            formData.append('Banner', bannerFile);
        }

        axios.put(`https://portal-dev.teclat.dev/api/comunicados/${editedAnnouncement.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Dados editados com sucesso:', response.data);
            handleClose(); // Fecha o modal após o salvamento
        })
        .catch(error => {
            console.error('Erro ao editar:', error);
            if (error.response && error.response.data) {
                console.error('Detalhes do erro:', error.response.data);
            }
            // Tratar erros, se necessário
        });
    };

    return (
        <Modal show={open} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edição de: {editedAnnouncement?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box sx={{ bgcolor: 'background.paper', p: 4 }}>
                    <Box>
                        {/* Banner */}
                        <Typography variant="body1" component="p">
                            <strong>Banner:</strong>
                        </Typography>
                        <TextField
                            id="banner"
                            type="file"
                            onChange={handleFileChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        {/* Título */}
                        <TextField
                            id="title"
                            label="Título"
                            value={editedAnnouncement?.title || ''}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        {/* Descrição */}
                        <TextField
                            id="description"
                            label="Descrição"
                            value={editedAnnouncement?.description || ''}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        {/* Mensagem */}
                        <TextField
                            id="message"
                            label="Mensagem"
                            value={editedAnnouncement?.message || ''}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={8}
                            fullWidth
                            margin="normal"
                        />

                        {/* Tipo */}
                        <TextField
                            id="announcement_type"
                            select
                            label="Tipo"
                            value={editedAnnouncement?.announcement_type || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="EVENTO">Evento</MenuItem>
                            <MenuItem value="COMUNICADO">Comunicado</MenuItem>
                        </TextField>

                        {/* Fixar */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="pin"
                                    checked={editedAnnouncement?.pin || false}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label="Fixar"
                        />

                        {/* Status */}
                        <TextField
                            id="status"
                            select
                            label="Status"
                            value={editedAnnouncement?.status || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="">
                                <em>Selecione um status</em>
                            </MenuItem>
                            <MenuItem value="ATIVO">Ativo</MenuItem>
                            <MenuItem value="INATIVO">Inativo</MenuItem>
                        </TextField>
                    </Box>
                </Box>
            </Modal.Body>
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

export default EditionModal;
