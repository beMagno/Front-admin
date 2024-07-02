  import React from 'react';
  import PropTypes from 'prop-types';
  import { DataGrid } from '@mui/x-data-grid';
  import IconButton from '@mui/material/IconButton';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';

  const DataTable = ({ data, columns, loading, onEdit, onView, onDelete, onEditCellChangeCommitted }) => {
    // Funções de ação para editar, visualizar e deletar
    const handleEditClick = (row) => {
      onEdit(row);
    };

    const handleViewClick = (row) => {
      onView(row);
    };

    const handleDeleteClick = (row) => {
      onDelete(row.id); 
    };

      const columnsWithActions = [
        ...columns,
        {
          field: 'actions',
          headerName: 'Ações',
          sortable: false,
          width: 150,
          disableColumnMenu: true,
          renderCell: (params) => (
            <div>
              <IconButton color='primary' onClick={() => handleViewClick(params.row)} aria-label="view">
                <VisibilityIcon />
              </IconButton>
              <IconButton color='primary' onClick={() => handleEditClick(params.row)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton color='error' onClick={() => handleDeleteClick(params.row)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>  
          ),
        },
      ];

    return (
      <div style={{  width: '100%' }}>
        <DataGrid 
          rows={data} 
          columns={columnsWithActions} 
          loading={loading} 
          autoHeight
          hideFooterPagination
          rowHeight={45}
          disableSelectionOnClick
          onEditCellChangeCommitted={onEditCellChangeCommitted}
          
          // checkboxSelection seleção 
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
    onDelete: PropTypes.func.isRequired, 
    onEditCellChangeCommitted: PropTypes.func.isRequired,
  };

  export default DataTable;
