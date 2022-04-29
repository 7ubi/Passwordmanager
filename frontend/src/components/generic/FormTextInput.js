import {FormControl, FormHelperText, TextField} from "@mui/material";
import React from "react";

const FormTextInput = ({ onChange, label, placeHolder, inputType }) => {


    return (
        <FormControl>
            <TextField
                required={ true }
                type={ inputType }
                placeholder={ placeHolder }
                label={ label }
                onChange={ onChange }
                InputLabelProps={{
                    style: {
                        color: "white",
                    }
                }}
                InputProps={{
                    style: {
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}

                multiline
            />
        </FormControl>
    );
}

export default FormTextInput;