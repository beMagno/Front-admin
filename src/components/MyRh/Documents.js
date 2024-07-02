import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import DataTable from '../DataTable';
import GenericModal from '../Modals/GenericModal';
import GenericForm from '../Forms/GenericForm';
import tableConfigs from '../DataTable/DataTableConfig';
import formConfigs from '../Forms/FormConfig';
import useFetchData from '../../hooks/useFetchData';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateButton from '../CreateButton/index';

const Documents = () => {
  const { data, error, loading, refetchData } = useFetchData(tableConfigs.documents.apiUrl);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  const methods = useForm();

  const handleCloseModals = () => {
    setViewModalOpen(false);  
    setEditModalOpen(false);
    methods.reset();
    
  };

  const handleEdit = (document) => {
    setSelectedDocument(document);
    methods.reset(document);
    setEditModalOpen(true);
  };

  const handleView = (document) => {
    setSelectedDocument(document);
    setViewModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }

      const response = await axios.put(`${tableConfigs.documents.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData(); 
      toast.success('Documento editado com sucesso!');
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
    if (window.confirm('Tem certeza que deseja deletar este Documento?')) {
      try {
        await axios.delete(`${tableConfigs.documents.apiUrl}${id}/`);
        toast.success('Documento deletado com sucesso!');
        refetchData(); 
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };


  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:40, marginTop:40}}>
        <h2>Documentos</h2>
        <CreateButton 
          title="Novo Documento" 
          config={formConfigs.documents} 
          apiUrl={tableConfigs.documents.apiUrl}
          refetchData={refetchData} 
        />
      </div>
      {/* Tabela de Dados */}
      <DataTable
        data={data}
        columns={tableConfigs.documents.columns}
        loading={loading}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={onDelete} 
      />

      {/* Modal de Visualização */}
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Documento"
      >
        {/* Conteúdo do modal de visualização */}
        {selectedDocument &&(
          <div>
            <p><strong>Título:</strong> {selectedDocument?.title}</p>
            <p><strong>Descrição:</strong> {selectedDocument?.description}</p>
            <p><strong>Tipo:</strong> {selectedDocument.employment_type}</p>
            <p><strong>Arquivo:</strong> {selectedDocument?.file}</p>
          </div>
        )}
      </GenericModal>

      {/* Modal de Edição */}
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar Documento"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        {/* Formulário de edição */}
        {selectedDocument &&(
        <FormProvider {...methods}>
          <GenericForm
            config={formConfigs.documents}
            values={methods.getValues()}
          />
        </FormProvider>
        )}
      </GenericModal>
    </div>
  );
};

export default Documents;
