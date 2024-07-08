import React, { useState } from 'react';
import { useForm, FormProvider,SubmitHandler } from 'react-hook-form';
import DataTable from '../../components/DataTable';
import useFetchData from '../../hooks/useFetchData';
import GenericModal from '../../components/Modals/GenericModal';
import GenericForm from '../../components/Forms/GenericForm';
import tableConfigs from '../../components/DataTable/DataTableConfig';
import formConfigs from '../../components/Forms/FormConfig';
import axios from 'axios';
import CreateButton from '../../components/CreateButton';
import { toast } from 'react-toastify';
import { GridValidRowModel } from '@mui/x-data-grid';
import { PageContainer, CreateButtonContainer, LoadingContainer, DataTableContainer, ModalContent } from './style';
import CircularProgress from '@mui/material/CircularProgress';

interface Notification {
  id: number;
  title: string;
  message: string;
  Worker_type: string;
}

const Notifications: React.FC = () => {
  // Hook para buscar dados e gerenciar estados de carregamento e erro
  const { data, loading, error, refetchData } = useFetchData(tableConfigs.notifications.apiUrl);

  // Estados para controlar a abertura dos modais e o item selecionado
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  // Hook para gerenciamento de formulário
  const methods = useForm<Notification>();

  // Função para fechar os modais e resetar o formulário
  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    methods.reset();
  };

  // Função para abrir o modal de edição com os dados da notificação selecionada
  const handleEdit = (notification: Notification) => {
    setSelectedNotification(notification);
    methods.reset(notification);
    setEditModalOpen(true);
  };

  // Função para abrir o modal de visualização com os dados da notificação selecionada
  const handleView = (notification: Notification) => {
    setSelectedNotification(notification);
    setViewModalOpen(true);
  };

  // Função para enviar os dados do formulário e editar o notification
  const onSubmit: SubmitHandler<Notification> = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, (formData as any)[key]);
      }

      const response = await axios.put(`${tableConfigs.notifications.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData(); 
      toast.success('Notificação editada com sucesso!');
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

  // Função para excluir o Notificação selecionado
  const onDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar esta notificação?')) {
      try {
        await axios.delete(`${tableConfigs.notifications.apiUrl}${id}/`);
        toast.success('Notificação deletada com sucesso!');
        refetchData(); 
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };

  return (
    <PageContainer>
      <CreateButtonContainer>
        <CreateButton 
          title="Nova Notificação" 
          config={formConfigs.notifications} 
          apiUrl={tableConfigs.notifications.apiUrl}
          refetchData={refetchData} 
        />
      </CreateButtonContainer>

      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        // Tabela de dados
        <DataTableContainer>
            <DataTable
              data={(data ?? []) as GridValidRowModel[]}
              columns={tableConfigs.notifications.columns}
              loading={loading}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
        </DataTableContainer>
      )}
      {/* Modal de Visualização */}
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Notificação"
      >
        {/* Conteúdo do modal de visualização */}
        {selectedNotification && (
          <ModalContent>
            <p><strong>Título:</strong> {selectedNotification.title}</p>
            <p><strong>Mensagem:</strong> {selectedNotification.message}</p>
            <p><strong>Tipo:</strong> {selectedNotification.Worker_type}</p>
          </ModalContent>
        )}
      </GenericModal>

      {/* Modal de Edição */} 
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar notificação"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        {/* Formulário de edição */}
        {selectedNotification && (
          <FormProvider {...methods}>
            <GenericForm
              config={formConfigs.notifications}
              values={selectedNotification}
            />
          </FormProvider>
        )}
      </GenericModal>
    </PageContainer>
  );
};

export default Notifications;
