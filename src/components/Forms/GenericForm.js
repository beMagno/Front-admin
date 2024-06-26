import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GenericForm = ({ config, values, handleChange, handleFileChange }) => {
    const handleQuillChange = (id, value) => {
        handleChange({
            target: {
                id,
                value,
                type: 'text'
            }
        });
    };

    return (
        <form>
            {config.fields.map((field) => {
                switch (field.type) {
                    case 'text':
                        return (
                            <TextField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                value={values[field.id] || ''}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        );
                    case 'textarea':
                        return (
                            <div key={field.id} style={{ margin: '16px 0' }}>
                                <ReactQuill
                                    value={values[field.id] || ''}
                                    onChange={(value) => handleQuillChange(field.id, value)}
                                />
                            </div>
                        );
                    case 'select':
                        return (
                            <TextField
                                key={field.id}
                                id={field.id}
                                select
                                label={field.label}
                                value={values[field.id] || ''}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            >
                                {field.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        );
                    case 'checkbox':
                        return (
                            <FormControlLabel
                                key={field.id}
                                control={
                                    <Checkbox
                                        id={field.id}
                                        checked={values[field.id] || false}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label={field.label}
                            />
                        );
                    case 'file':
                        return (
                            <TextField
                                key={field.id}
                                id={field.id}
                                type="file"
                                label={field.label}
                                onChange={handleFileChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
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
    handleChPange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
};

export default GenericForm;
