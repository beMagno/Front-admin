interface FieldConfig {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'file' | 'date'; // Tipos possíveis
    required: boolean;
    options?: { value: string; label: string }[]; // Apenas se o type for 'select'
}

interface FormConfig {
    fields: FieldConfig[];
}

const formConfigs: Record<string, FormConfig> = {
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
            { id: 'banner', label: 'Banner', type: 'file', required: false },
            { id: 'post_date', label: 'Data de Postagem', type: 'date', required: true },
            { id: 'exclusion_date', label: 'Data de Exclusão', type: 'date', required: true }
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
    benefits: {
        fields: [
            { id: 'name', label: 'Nome', type: 'text', required: true },
            { id: 'description', label: 'Descrição', type: 'textarea', required: true },
            { id: 'banner', label: 'Banner', type: 'file', required: false },
        ],
    },
    documents: {
        fields: [
            { id: 'title', label: 'Título', type: 'text', required: true },
            { id: 'description', label: 'Descrição', type: 'textarea', required: true },
            { id: 'employment_type', label: 'Tipo', type: 'select', options: [
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' }
            ], required: true },
            { id: 'file', label: 'Arquivo', type: 'file', required: false },
        ],
    },
    notifications: {
        fields: [
            { id: 'title', label: 'Título', type: 'text', required: true },
            { id: 'message', label: 'Mensagem', type: 'textarea', required: true },
            { id: 'Worker_type', label: 'Tipo', type: 'select', options: [
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' }
            ], required: true },
            { id: 'post_date', label: 'Data de Postagem', type: 'date', required: true },
            { id: 'exclusion_date', label: 'Data de Exclusão', type: 'date', required: true }
            
        ],
    },
    // Outras configurações de formulário...
};

export default formConfigs;
