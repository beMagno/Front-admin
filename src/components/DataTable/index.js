import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({ data, columns, loading, onEdit, onView, onDelete }) => {
  // Funções de ação para editar, visualizar e deletar
  const handleEditClick = (row) => {
    onEdit(row);
  };

  const handleViewClick = (row) => {
    onView(row);
  };

  const handleDeleteClick = (row) => {
    onDelete(row.id); // Passa o ID do anúncio para a função onDelete
  };

  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleViewClick(params.row)} aria-label="view">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params.row)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={data} 
        columns={columnsWithActions} 
        loading={loading} 
        pageSize={5} 
        rowsPerPageOptions={[5]} 
      />
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, // Adicione a propriedade onDelete
};

export default DataTable;
