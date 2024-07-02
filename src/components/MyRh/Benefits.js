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

const Benefits = () => {
  const { data, error, loading, refetchData } = useFetchData(tableConfigs.benefits.apiUrl);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');

  const methods = useForm();

  const handleCloseModals = () => {
    setViewModalOpen(false);  
    setEditModalOpen(false);
    methods.reset();
    setBannerUrl('');
  };

  const handleEdit = (benefit) => {
    setSelectedBenefit(benefit);
    methods.reset(benefit);
    setBannerUrl(benefit.banner || '');
    setEditModalOpen(true);
  };

  const handleView = (benefit) => {
    setSelectedBenefit(benefit);
    setViewModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    methods.setValue('banner', file);
    setBannerUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }

      const response = await axios.put(`${tableConfigs.benefits.apiUrl}${formData.id}/`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados editados com sucesso:', response.data);
      handleCloseModals();
      refetchData(); 
      toast.success('Benefício editado com sucesso!');
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
    if (window.confirm('Tem certeza que deseja deletar este Benefício?')) {
      try {
        await axios.delete(`${tableConfigs.benefits.apiUrl}${id}/`);
        toast.success('Benefício deletado com sucesso!');
        refetchData(); // Recarrega os dados após a deleção
      } catch (error) {
        console.error('Erro ao deletar:', error);
        toast.error('Erro ao deletar. Por favor, tente novamente.');
      }
    }
  };


  return (
    <div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:40}}>
        <h2>Benefícios</h2>
        <CreateButton 
          title="Novo Benefício" 
          config={formConfigs.benefits} 
          apiUrl={tableConfigs.benefits.apiUrl}
          refetchData={refetchData} 
        />
      </div>
      {/* Tabela de Dados */}
      <DataTable
        data={data}
        columns={tableConfigs.benefits.columns}
        loading={loading}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={onDelete} 
      />

      {/* Modal de Visualização */}
      <GenericModal
        open={viewModalOpen}
        handleClose={handleCloseModals}
        title="Visualizar Benefício"
      >
        {/* Conteúdo do modal de visualização */}
        {selectedBenefit &&(
          <div>
            <p><strong>Nome:</strong> {selectedBenefit?.name}</p>
            <p><strong>Descrição:</strong> {selectedBenefit?.description}</p>
            <p><strong>Banner:</strong> <img src={selectedBenefit?.Banner} alt="Banner" style={{ maxWidth: '100%', height: 'auto' }} /></p>
          </div>
        )}
      </GenericModal>

      {/* Modal de Edição */}
      <GenericModal
        open={editModalOpen}
        handleClose={handleCloseModals}
        title="Editar Benefício"
        handleSave={methods.handleSubmit(onSubmit)}
      >
        {/* Formulário de edição */}
        {selectedBenefit &&(
        <FormProvider {...methods}>
          <GenericForm
            config={formConfigs.benefits}
            values={methods.getValues()}
            handleFileChange={handleFileChange}
          />
        </FormProvider>
        )}
      </GenericModal>
    </div>
  );
};

export default Benefits;
