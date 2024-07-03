import { styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.columnHeaders}`]: {
    backgroundColor:theme.palette.common.black  , // Azul escuro
  },
}));
