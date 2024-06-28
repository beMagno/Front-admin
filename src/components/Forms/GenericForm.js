import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GenericForm = ({ config,  handleFileChange }) => {
    console.log("handleFileChange prop:", handleFileChange);
    const { control, setValue, formState: { errors } } = useFormContext();

    const handleQuillChange = (id, value) => {
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
                                        onChange={(e) => {
                                            handleFileChange(e);
                                            controllerField.onChange(e.target.files[0]);
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

GenericForm.propTypes = {
    config: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    handleFileChange: PropTypes.func.isRequired,
};

export default GenericForm;
