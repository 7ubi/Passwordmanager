import {FormControl, FormHelperText, styled, TextField} from "@mui/material";
import React from "react";

const FormTextInput = ({ onChange, label, placeHolder, inputType, error="" }) => {
    return (
        <div className="form-text-div">
            <label className="form-text-label">
                <input
                    id={ label }
                    type={ inputType }
                    onChange={ onChange }
                    className={ error !== "" ? "form-text-input input-error": "form-text-input" }
                    placeholder={ placeHolder }
                    required={ true }
                />
                <span>{ label }</span>
            </label>
        </div>
    );
}

export default FormTextInput;