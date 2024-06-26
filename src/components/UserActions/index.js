import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const UserActions = ({ row, handleEdit, handleView, handleDelete }) => {
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
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleViewClick}>
        <VisibilityIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default UserActions;
