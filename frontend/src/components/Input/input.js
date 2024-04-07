import React from 'react'
import classes from './input.module.css'
import InpContainer from '../InputContainer/inputContainer';

 function Input(
    {label, type, defaultValue, onChange, onBlur, name, error}, ref
 ) {
    const errorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        switch (error.type) {
            case 'required':
                return "Required Field";
            case 'length':
                return 'Too Short';
            default:
                return '*';
        }
    };


    return (
        <InpContainer label={label}>
            <input 
                defaultValue={defaultValue}
                className={classes.input}
                type={type}
                placeholder={label}
                ref={ref}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <div className={classes.error}>{errorMessage()}</div>}
        </InpContainer>
    );
}

export default React.forwardRef(Input);