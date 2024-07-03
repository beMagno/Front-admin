import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import DataTable from '../../components/DataTable';
import GenericModal from '../../components/Modals/GenericModal';
import GenericForm from '../../components/Forms/GenericForm';
import tableConfigs from '../../components/DataTable/DataTableConfig';
import formConfigs from '../../components/Forms/FormConfig';
import useFetchData from '../../hooks/useFetchData';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateButton from '../../components/CreateButton/index';
import SaveButton from '../../components/SaveButton';
import { GridValidRowModel } from '@mui/x-data-grid';

interface Announcement {
  id: number;
  title: string;
  description: string;
  message: string;
  announcement_type: string;
  pin: boolean;
  status: string;
  Banner?: string;
}

const Announcements: React.FC = () => {
  const { data, error, loading, refetchData } = useFetchData(tableConfigs.announcements.apiUrl);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [editedRows, setEditedRows] = useState<any[]>([]);

  const methods = useForm<Announcement>();

  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    methods.reset();
    setBannerUrl('');
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    methods.reset(announcement);
    setBannerUrl(announcement.Banner || '');
    setEditModalOpen(true);
  };

  const handleView = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setViewModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue('Banner', file as any);
      setBannerUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<Announcement> = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key of Object.keys(formData)) {
        dataToSend.append(key, (formData as any)[key]);
      }

      const response = await axios.put(`${tableConfigs.announcements.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData();
      toast.success('Comunicado editado com sucesso!');
    } catch (error: any) {
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

  const onDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este Comunicado?')) {
      try {
        await axios.delete(`${tableConfigs.announcements.apiUrl}${id}/`);
        toast.success('Comunicado deletado com sucesso!');
        refetchData(); // Recarrega os dados após a deleção
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };

  const handleEditCellChangeCommitted = (params: any) => {
    const { id, field, value } = params;
    setEditedRows((prev) => {
      const existingRow = prev.find((row) => row.id === id);
      if (existingRow) {
        return prev.map((row) => row.id === id ? { ...row, [field]: value } : row);
      } else {
        return [...prev, { id, [field]: value }];
      }
    });
    console.log(editedRows);
  };

  return (
    <div>
      <h1>Comunicados</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: 30, marginBottom: 20, marginTop: 20 }}>
        <SaveButton
          editedRows={editedRows}
          apiUrl={tableConfigs.announcements.apiUrl}
          refetchData={refetchData}
        />
        <CreateButton
          title="Novo Comunicado"
          config={formConfigs.announcements}
          apiUrl={tableConfigs.announcements.apiUrl}
          refetchData={refetchData}
        />
      </div>
      {/* Tabela de Dados */}
      <DataTable
         data={data as GridValidRowModel[]}
        columns={tableConfigs.announcements.columns}
        loading={loading}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={onDelete}
        
      />

      {/* Modal de Visualização */}
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Comunicado"
      >
        {/* Conteúdo do modal de visualização */}
        {selectedAnnouncement && (
          <div>
            <p><strong>Título:</strong> {selectedAnnouncement?.title}</p>
            <p><strong>Descrição:</strong> {selectedAnnouncement?.description}</p>
            <p><strong>Mensagem:</strong> <span style={{ maxWidth: '100%', height: 'auto', display: 'block' }} dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.message }} /></p>
            <p><strong>Tipo:</strong> {selectedAnnouncement?.announcement_type}</p>
            <p><strong>Fixar:</strong> {selectedAnnouncement?.pin ? 'Sim' : 'Não'}</p>
            <p><strong>Status:</strong> {selectedAnnouncement?.status}</p>
            <p><strong>Banner:</strong> <img src={selectedAnnouncement?.Banner} alt="Banner" style={{ maxWidth: '100%', height: 'auto' }} /></p>
          </div>
        )}
      </GenericModal>

      {/* Modal de Edição */}
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar Comunicado"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        {/* Formulário de edição */}
        {selectedAnnouncement && (
          <FormProvider {...methods}>
            <GenericForm
              config={formConfigs.announcements}
              values={methods.getValues()}
              handleFileChange={handleFileChange}
            />
          </FormProvider>
        )}
      </GenericModal>
    </div>
  );  
};

export default Announcements;
