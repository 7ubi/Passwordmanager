import React from "react";

const FormTextInput = ({
    onChange,
    label,
    placeHolder,
    inputType,
    error="",
    errorMessage=false,
    required=true,
    divClasses="",
    labelClasses="",
    inputClasses=""
}) => {
    return (
        <div className={ "form-text-div " + divClasses }>
            <label className={ "form-text-label " + labelClasses}>
                <span>{ label }{ required ? "*" : ""}</span>
                <input
                    id={ label }
                    type={ inputType }
                    onChange={ onChange }
                    className={ error !== "" ? "form-text-input input-error " + inputClasses: "form-text-input " + inputClasses }
                    placeholder={ placeHolder }
                    required={ required }
                />
            </label>
            <p className="error">
                <b>
                {
                    errorMessage &&
                    error
                }
                </b>
            </p>
        </div>
    );
}

export default FormTextInput;