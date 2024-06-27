import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import DataTable from '../../components/DataTable';
import GenericModal from '../../components/Modals/GenericModal';
import GenericForm from '../../components/Forms/GenericForm';
import tableConfigs from '../../components/DataTable/DataTableConfig';
import formConfigs from '../../components/Forms/FormConfig';
import useFetchData from '../../hooks/useFetchData';
import axios from 'axios';
import { toast } from 'react-toastify';

const Announcements = () => {
  const { data, error, loading, refetchData } = useFetchData(tableConfigs.announcements.apiUrl);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');

  const methods = useForm();

  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    methods.reset();
    setBannerUrl('');
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    methods.reset(announcement);
    setBannerUrl(announcement.Banner || '');
    setEditModalOpen(true);
  };

  const handleView = (announcement) => {
    setSelectedAnnouncement(announcement);
    setViewModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    methods.setValue('Banner', file);
    setBannerUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }

      const response = await axios.put(`${tableConfigs.announcements.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData(); // Recarrega os dados após a edição
      toast.success('Anúncio editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar:', error);
      if (error.response && error.response.data) {
        const errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : Object.values(error.response.data).flat().join(', ');
        toast.error(`Erro ao editar: ${errorMessage}`);
      } else {
        toast.error('Erro ao editar. Por favor, tente novamente.');
      }
    }
  };

  const onDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este anúncio?')) {
      try {
        await axios.delete(`${tableConfigs.announcements.apiUrl}${id}/`);
        toast.success('Anúncio deletado com sucesso!');
        refetchData(); // Recarrega os dados após a deleção
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={tableConfigs.announcements.columns}
        loading={loading}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={onDelete} // Passando função onDelete para a DataTable
      />
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar Anúncio"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <GenericForm
            config={formConfigs.announcements}
            values={methods.getValues()}
            handleFileChange={handleFileChange}
          />
        </FormProvider>
      </GenericModal>
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Anúncio"
      >
        <div>
          <p><strong>Título:</strong> {selectedAnnouncement?.title}</p>
          <p><strong>Descrição:</strong> {selectedAnnouncement?.description}</p>
          <p><strong>Mensagem:</strong> <span style={{ maxWidth: '100%', height: 'auto', display: 'block' }} dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.message }} /></p>
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
