import React, {useState} from "react";
import {Grid, Input, Slider, useMediaQuery} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormTextInput from "../generic/FormTextInput";
import createPostRequest from "../generic/CreatePostRequest";
import styled from "@emotion/styled";

const PasswordCreation = ({ closeModal, addPassword }) => {
    const desktop = useMediaQuery('(min-width:600px)');

    const [isUpper, setIsUpper] = useState(true);
    const [isNumber, setIsNumber] = useState(true);
    const [isSymbol, setIsSymbol] = useState(true);
    const [passwordLength, setPasswordLength] = useState(12);

    const minLength = 6;
    const maxLength = 30;

    const handleLengthChange = (event) => {
        setPasswordLength(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < minLength) {
          setPasswordLength(minLength);
        } else if (value > maxLength) {
          setPasswordLength(maxLength);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('/api/generatePassword', createPostRequest({

            }))
            .then((response) => response.json())
            .then((data) => addPassword(data));
    }

    return (
        <form onSubmit={ onSubmit }>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <h1>
                        Generate Password
                    </h1>
                    <CloseIcon onClick={ closeModal } className="top-right" />
                </Grid>
                <Grid container spacing={desktop ? 2: 1}>
                    <Grid item xs={12} align="center">
                        <div className="center">
                            <span className="center">
                                Password Length: {passwordLength}
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <div className="center">
                            <Slider
                                aria-label="Length"
                                defaultValue={12}
                                min={minLength}
                                max={maxLength}
                                onChange={handleLengthChange}
                                aria-labelledby="input-slider"
                                style={{
                                    width: "80%"
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                    <button className="btn">
                        Save
                    </button>
                </Grid>
            </Grid>
        </form>
    );
}

export default PasswordCreation;