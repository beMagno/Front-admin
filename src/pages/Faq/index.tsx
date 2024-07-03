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

interface Faq {
  id: number;
  question: string;
  answer: string;
  employment_type: string;
}

const FAQ: React.FC = () => {
  // Hook para buscar dados e gerenciar estados de carregamento e erro
  const { data, loading, error, refetchData } = useFetchData(tableConfigs.faq.apiUrl);

  // Estados para controlar a abertura dos modais e o item selecionado
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<Faq | null>(null);
  // Hook para gerenciamento de formulário
  const methods = useForm<Faq>();

  // Função para fechar os modais e resetar o formulário
  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    methods.reset();
  };

  // Função para abrir o modal de edição com os dados do FAQ selecionado
  const handleEdit = (faq: Faq) => {
    setSelectedFAQ(faq);
    methods.reset(faq);
    setEditModalOpen(true);
  };

  // Função para abrir o modal de visualização com os dados do FAQ selecionado
  const handleView = (faq: Faq) => {
    setSelectedFAQ(faq);
    setViewModalOpen(true);
  };

  // Função para enviar os dados do formulário e editar o FAQ
  const onSubmit: SubmitHandler<Faq> = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, (formData as any)[key]);
      }

      const response = await axios.put(`${tableConfigs.faq.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData(); 
      toast.success('Pergunta editada com sucesso!');
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

  // Função para excluir o FAQ selecionado
  const onDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar esta pergunta?')) {
      try {
        await axios.delete(`${tableConfigs.faq.apiUrl}${id}/`);
        toast.success('Pergunta deletada com sucesso!');
        refetchData(); 
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:40}}>
        <h1>FAQ</h1>
        <CreateButton 
          title="Nova Pergunta" 
          config={formConfigs.faq} 
          apiUrl={tableConfigs.faq.apiUrl}
          refetchData={refetchData} 
        />
      </div>
      {/* Tabela de Dados */}
      <DataTable
        data={data as GridValidRowModel[]}
        columns={tableConfigs.faq.columns}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={onDelete}
      />

      {/* Modal de Visualização */}
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Pergunta"
      >
        {/* Conteúdo do modal de visualização */}
        {selectedFAQ && (
          <div>
            <p><strong>Pergunta:</strong> {selectedFAQ.question}</p>
            <p><strong>Resposta:</strong> {selectedFAQ.answer}</p>
            <p><strong>Tipo:</strong> {selectedFAQ.employment_type}</p>
          </div>
        )}
      </GenericModal>

      {/* Modal de Edição */}
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar pergunta"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        {/* Formulário de edição */}
        {selectedFAQ && (
          <FormProvider {...methods}>
            <GenericForm
              config={formConfigs.faq}
              values={selectedFAQ}
            />
          </FormProvider>
        )}
      </GenericModal>
    </div>
  );
};

export default FAQ;
