import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface UserActionsProps {
  row: any;
  handleEdit: (row: any) => void;
  handleView: (row: any) => void;
  handleDelete: (row: any) => void; 
}

const UserActions: React.FC<UserActionsProps> = ({ row, handleEdit, handleView, handleDelete }) => {
  const handleEditClick = () => {
    handleEdit(row);
  };

  const handleViewClick = () => {
    handleView(row);
  };

  const handleDeleteClick = () => {
    handleDelete(row);
  };

  return (
    <div>
      <IconButton onClick={handleEditClick} aria-label="Editar">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleViewClick} aria-label="Visualizar">
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick} aria-label="Excluir">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default UserActions;
