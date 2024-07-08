import { GridColDef } from '@mui/x-data-grid';

interface TableConfig {
  apiUrl: string;
  columns: GridColDef[];
}

interface Config {
  announcements: TableConfig;
  faq: TableConfig;
  benefits: TableConfig;
  documents: TableConfig;
  notifications: TableConfig;
  // Adicione outras configurações conforme necessário
}

const tableConfigs: Config = {
  announcements: {
    apiUrl: "https://portal-dev.teclat.dev/api/comunicados/",
    columns: [
      { field: 'title', headerName: 'Título', width: 200 },
      { field: 'announcement_type', headerName: 'Tipo', width: 120 },
      { field: 'pin', headerName: 'Fixar', type: 'boolean',  },
      { field: 'post_date', headerName: 'Data de Postagem', width: 150 },
      { field: 'exclusion_date', headerName: 'Data de Exclusão', width: 150 },
      { field: 'status', headerName: 'Status', },
    ],
  },
  faq: {
    apiUrl: "https://portal-dev.teclat.dev/api/perguntas/",
    columns: [
      { field: 'question', headerName: 'Pergunta', width: 300 },
      { field: 'answer', headerName: 'Resposta', width: 400 },
      { field: 'employment_type', headerName: 'Tipo' },
    ],
  },
  benefits: {
    apiUrl: "https://portal-dev.teclat.dev/api/beneficios/",
    columns: [
      { field: 'name', headerName: 'Nome', width: 200 },
      { field: 'description', headerName: 'Descrição', width: 520 },
      // { field: 'banner', headerName: 'Banner' }, eu boto imagem?
    ],
  },
  documents: {
    apiUrl: "https://portal-dev.teclat.dev/api/processos/",
    columns: [
      { field: 'title', headerName: 'Título', width: 200 },
      { field: 'description', headerName: 'Descrição', width: 400 },
      { field: 'employment_type', headerName: 'Tipo' },
    ],
  },
  notifications: {
    apiUrl: "https://portal-dev.teclat.dev/api/notification/",
    columns: [
      { field: 'title', headerName: 'Título', width: 200 },
      { field: 'post_date', headerName: 'Data de Postagem', width: 150 },
      { field: 'exclusion_date', headerName: 'Data de Exclusão', width: 150 },
      { field: 'Worker_type', headerName: 'Tipo' },
    ],
  },
  // Adicione outras configurações conforme necessário
};

export default tableConfigs;
