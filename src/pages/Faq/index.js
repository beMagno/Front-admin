import React from 'react';
import DataTable from '../../components/DataTable';

const columns = [
  {
    field: 'question',
    headerName: 'Perguntas',
    width: 500,
  },
  {
    field: 'employment_type',
    headerName: 'Tipo',
    width: 120,
  },
]

const FAQ = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <DataTable apiUrl='https://portal-dev.teclat.dev/api/perguntas/' columns={columns}/>
    </div>
  );
};

export default FAQ;
