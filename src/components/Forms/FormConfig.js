const formConfigs = {
    announcements: {
        fields: [
            { id: 'title', label: 'Título', type: 'text' },
            { id: 'description', label: 'Descrição', type: 'text' },
            { id: 'message', label: 'Mensagem', type: 'textarea' },
            { id: 'announcement_type', label: 'Tipo', type: 'select', options: [
                { value: 'EVENTO', label: 'Evento' },
                { value: 'COMUNICADO', label: 'Comunicado' }
            ]},
            { id: 'pin', label: 'Fixar', type: 'checkbox' },
            { id: 'status', label: 'Status', type: 'select', options: [
                { value: 'ATIVO', label: 'Ativo' },
                { value: 'INATIVO', label: 'Inativo' }
            ]},
            { id: 'Banner', label: 'Banner', type: 'file' },
        ],
    },

    // Outras configurações de formulário...
};

export default formConfigs;
