const tableConfigs = {
    announcements: {
        apiUrl: "https://portal-dev.teclat.dev/api/comunicados/",
        columns: [
            { field: 'title', headerName: 'Título', width: 200 },
            { field: 'announcement_type', headerName: 'Tipo', width: 120 },
            { field: 'pin', headerName: 'Fixar', type: 'boolean' },
            { field: 'post_date', headerName: 'Data de Postagem', width: 150 },
            { field: 'exclusion_date', headerName: 'Data de Exclusão', width: 150 },
            { field: 'status', headerName: 'Status' },
        ]
    },
    faq: {
        apiUrl: "https://portal-dev.teclat.dev/api/faq/",
        columns: [
            { field: 'question', headerName: 'Pergunta', width: 200 },
            { field: 'answer', headerName: 'Resposta', width: 400 },
            { field: 'status', headerName: 'Status' },
            { field: 'actions', headerName: 'Ações', width: 150 }
        ]
    },
    // Adicione outras configurações conforme necessário
};

export default tableConfigs;
