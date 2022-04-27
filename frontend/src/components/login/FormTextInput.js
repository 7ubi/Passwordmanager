import {FormControl, FormHelperText, TextField} from "@mui/material";
import React from "react";

const FormTextInput = ({ onChange, label, placeHolder, inputType }) => {
    return (
        <FormControl>
            <FormHelperText>
                <div className="inputLabel formGrid">
                    {label}
                </div>
            </FormHelperText>
            <TextField
                required={ true }
                type={ inputType }
                placeholder={ placeHolder }
                inputProps={{
                    style: {
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "4.5px",
                    }
                }}
                onChange={ onChange }
            />
        </FormControl>
    );
}

export default FormTextInput;