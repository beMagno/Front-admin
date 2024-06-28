const formConfigs = {
    announcements: {
        fields: [
            { id: 'title', label: 'Título', type: 'text', required: true },
            { id: 'description', label: 'Descrição', type: 'text', required: true },
            { id: 'message', label: 'Mensagem', type: 'textarea', required: true },
            { id: 'announcement_type', label: 'Tipo', type: 'select', options: [
                { value: 'EVENTO', label: 'Evento' },
                { value: 'COMUNICADO', label: 'Comunicado' }
            ], required: true },
            { id: 'pin', label: 'Fixar', type: 'checkbox', required: false },
            { id: 'status', label: 'Status', type: 'select', options: [
                { value: 'ATIVO', label: 'Ativo' },
                { value: 'INATIVO', label: 'Inativo' }
            ], required: true },
            { id: 'Banner', label: 'Banner', type: 'file', required: false },
        ],
    },
    faq: {
        fields: [
            { id: 'question', label: 'Pergunta', type: 'text', required: true },
            { id: 'answer', label: 'Resposta', type: 'textarea', required: true },
            { id: 'employment_type', label: 'Tipo', type: 'select', options: [
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' }
            ], required: true },
        ],
    },
    // Outras configurações de formulário...
};

export default formConfigs;
