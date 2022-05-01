import {FormControl, FormHelperText, styled, TextField} from "@mui/material";
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
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}
                FormHelperTextProps={{
                    style: {
                        color: "white",
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}
                inputProps={{
                    style: {
                        color: "white",
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}
                SelectProps={{
                    style: {
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}
                InputProps={{
                    style: {
                        borderWidth: "5px",
                        borderColor: "white"
                    }
                }}
                variant="outlined"
            />
        </FormControl>
    );
}

export default FormTextInput;