import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../Modals/GenericModal';
import GenericForm from '../Forms/GenericForm';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CreateButtonProps {
  title: string;
  config: any;  // Pode-se definir um tipo específico se o objeto de configuração for conhecido
  apiUrl: string;
  refetchData: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ title, config, apiUrl, refetchData }) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lógica para lidar com a mudança de arquivos
  };

  const onSubmit: SubmitHandler<any> = async (formData) => {
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
    } catch (error: any) {
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
          <GenericForm config={config} values={methods.getValues()} handleFileChange={handleFileChange} />
        </FormProvider>
      </GenericModal>
    </>
  );
};

export default CreateButton;
