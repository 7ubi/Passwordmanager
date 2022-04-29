import React from "react";
import {Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormTextInput from "../generic/FormTextInput";

const PasswordCreation = ({ closeModal }) => {
    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <h1>
                        Create Login
                    </h1>
                    <CloseIcon onClick={ closeModal } className="top-right" />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} align="center">
                        <FormTextInput label="Title" placeHolder="Title..." inputType="text" />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <FormTextInput label="Username" placeHolder="Username..." inputType="text" />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <FormTextInput label="Password" placeHolder="Password..." inputType="text" />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <FormTextInput label="Website" placeHolder="Website..." inputType="text" />
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