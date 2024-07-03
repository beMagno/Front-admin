import React from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowsProp } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableProps {
  data: GridRowsProp;
  columns: GridColDef[];
  loading: boolean;
  onEdit: (row: any) => void;
  onView: (row: any) => void;
  onDelete: (id: number) => void;
  
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, loading, onEdit, onView, onDelete }) => {
  const handleEditClick = (row: any) => {
    onEdit(row);
  };

  const handleViewClick = (row: any) => {
    onView(row);
  };

  const handleDeleteClick = (row: any) => {
    onDelete(row.id);
  };

  const columnsWithActions: GridColDef[] = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 150,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div>
          <IconButton color="primary" onClick={() => handleViewClick(params.row)} aria-label="view">
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEditClick(params.row)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(params.row)} aria-label="delete">
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
        autoHeight
        hideFooterPagination
        rowHeight={45}
        // disableSelectionOnClick
        
      />
    </div>
  );
};

export default DataTable;
