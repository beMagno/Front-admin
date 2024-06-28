import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../../components/Modals/GenericModal';
import GenericForm from '../../components/Forms/GenericForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateButton = ({ title, config, apiUrl, refetchData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const methods = useForm();

  const handleOpenModal = () => {
    methods.reset();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    methods.reset();
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }

      const response = await axios.post(apiUrl, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Dados criados com sucesso:', response.data);
      handleCloseModal();
      refetchData();
      toast.success(`${title} criado com sucesso!`);
    } catch (error) {
      console.error('Erro ao criar:', error);
      if (error.response && error.response.data) {
        const errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : Object.values(error.response.data).flat().join(', ');
        toast.error(`Erro ao criar: ${errorMessage}`);
      } else {
        toast.error('Erro ao criar. Por favor, tente novamente.');
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
      >
        {title}
      </Button>

      <GenericModal
        open={modalOpen}
        handleClose={handleCloseModal}
        title={title}
        handleSave={methods.handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <GenericForm config={config} />
        </FormProvider>
      </GenericModal>
    </>
  );
};

export default CreateButton;
