import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FieldOption {
  value: string | number;
  label: string;
}

interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'file';
  required?: boolean;
  options?: FieldOption[];
}

interface FormConfig {
  fields: FieldConfig[];
}

interface GenericFormProps {
  config: FormConfig;
  values: any;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ config, values, handleFileChange }) => {

  console.log("handleFileChange prop:", handleFileChange);
  const { control, setValue, formState: { errors } } = useFormContext();
  const handleQuillChange = (id: string, value: string) => {
    setValue(id, value);
  };

  return (
    <form>
      {config.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                rules={{ required: field.required }}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    label={field.label}
                    error={!!errors[field.id]}
                    helperText={errors[field.id] && `${field.label} é obrigatório`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            );
          case 'textarea':
            return (
              <div key={field.id} style={{ margin: '16px 0' }}>
                <Controller
                  name={field.id}
                  control={control}
                  render={({ field: controllerField }) => (
                    <ReactQuill
                      value={controllerField.value || ''}
                      onChange={(value) => handleQuillChange(field.id, value)}
                    />
                  )}
                />
              </div>
            );
          case 'select':
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    select
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  >
                    {field.options && field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            );
          case 'checkbox':
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: controllerField }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...controllerField}
                        checked={controllerField.value || false}
                        color="primary"
                      />
                    }
                    label={field.label}
                  />
                )}
              />
            );
          case 'file':
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: controllerField }) => (
                  <TextField
                    type="file"
                    label={field.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (handleFileChange) {
                        handleFileChange(e);
                      }
                      controllerField.onChange(e.target.files?.[0]);
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default GenericForm;
