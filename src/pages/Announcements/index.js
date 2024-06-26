import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import GenericModal from '../../components/Modals/GenericModal';
import GenericForm from '../../components/Forms/GenericForm';
import tableConfigs from '../../components/DataTable/DataTableConfig';
import formConfigs from '../../components/Forms/FormConfig';
import useFetchData from '../../hooks/useFetchData';
    import axios from 'axios';
import * as ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

const Announcements = () => {
    const { data, error, loading, fetchData } = useFetchData(tableConfigs.announcements.apiUrl);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');

    const handleCloseModals = () => {
        setViewModalOpen(false);
        setEditModalOpen(false);
        setFormValues({});
        setBannerFile(null);
        setBannerUrl('');
    };

    const handleEdit = (announcement) => {
        setSelectedAnnouncement(announcement);
        setFormValues({
            ...announcement,
            announcement_type: announcement.announcement_type || 'EVENTO',
            status: announcement.status || 'Inativo'
        });
        setBannerUrl(announcement.Banner || '');
        setEditModalOpen(true);
    };

    const handleView = (announcement) => {
        setSelectedAnnouncement(announcement);
        setViewModalOpen(true);
    };

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;
        console.log(e.target)
        setFormValues(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBannerFile(file);
        setBannerUrl(URL.createObjectURL(file)); // Mostrar a pré-visualização do novo arquivo selecionado
    };

    const handleSave = () => {
        const formData = new FormData();
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }
        if (bannerFile) {
            formData.append('Banner', bannerFile);
        } else if (bannerUrl) {
            formData.append('BannerUrl', bannerUrl);
        }

        axios.put(`${tableConfigs.announcements.apiUrl}${formValues.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Dados editados com sucesso:', response.data);
            handleCloseModals();
            fetchData();
            toast.success('Anúncio editado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao editar:', error);
            if (error.response && error.response.data) {
                console.error('Detalhes do erro:', error.response.data);
                toast.error('Erro ao editar: ' + JSON.stringify(error.response.data));
            }
        });
    };

    return (
        <div>
            <DataTable
                data={data}
                columns={tableConfigs.announcements.columns}
                loading={loading}
                onEdit={handleEdit}
                onView={handleView}
            />
            <GenericModal
                open={editModalOpen}
                handleClose={handleCloseModals}
                title="Editar Anúncio"
                handleSave={handleSave}
            >
                <GenericForm
                    config={formConfigs.announcements}
                    values={formValues}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                />
                {bannerUrl && (
                    <div>
                        <img src={bannerUrl} alt="Banner atual" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
            </GenericModal>
            <GenericModal
                open={viewModalOpen}
                handleClose={handleCloseModals}
                title="Visualizar Anúncio"
            >
                <div style={{ maxWidth: '100%', height: 'auto', overflow: 'auto' }}>
                    <p><strong>Título:</strong> {selectedAnnouncement?.title}</p>
                    <p><strong>Descrição:</strong> {selectedAnnouncement?.description}</p>
                    <p><strong>Mensagem:</strong> <span dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.message }} /></p>
                    <p><strong>Tipo:</strong> {selectedAnnouncement?.announcement_type}</p>
                    <p><strong>Fixar:</strong> {selectedAnnouncement?.pin ? 'Sim' : 'Não'}</p>
                    <p><strong>Status:</strong> {selectedAnnouncement?.status}</p>
                    <p><strong>Banner:</strong> <img src={selectedAnnouncement?.Banner} alt="Banner" style={{ maxWidth: '100%', height: 'auto' }} /></p>
                </div>
            </GenericModal>
        </div>
    );
};

export default Announcements;
