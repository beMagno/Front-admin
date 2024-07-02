import React from 'react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { toast } from 'react-toastify';

const SaveButton = ({ editedRows, apiUrl, refetchData }) => {
  const handleSave = async () => {
    try {
      const updateRequests = editedRows.map(async (row) => {
        const response = await axios.patch(`${apiUrl}${row.id}/`, row);

        if (response.status !== 200) {
          throw new Error(`Erro ao salvar as alterações para o ID ${row.id}.`);
        }

        return response.data;
      });

      await Promise.all(updateRequests);
      toast.success('Dados atualizados com sucesso!');
      refetchData(); // Recarrega os dados após a atualização
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados. Por favor, tente novamente.');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<SaveIcon />}
      onClick={handleSave}
      // disabled={editedRows.length === 0}
    >
      Salvar Alterações
    </Button>
  );
};

export default SaveButton;
