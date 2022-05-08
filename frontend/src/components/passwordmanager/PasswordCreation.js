import React, {useState} from "react";
import {Grid, useMediaQuery} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FormTextInput from "../generic/FormTextInput";
import createPostRequest from "../generic/CreatePostRequest";

const PasswordCreation = ({ closeModal }) => {
    const desktop = useMediaQuery('(min-width:600px)');

    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeWebsite = (e) => {
        setWebsite(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO encrypt password
        fetch('/api/createPassword', createPostRequest({
                title: title,
                username: username,
                managed_password: password,
                website: website
            }))
            .then((response) => response.json());
    }

    return (
        <form onSubmit={ onSubmit }>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <h1>
                        Create Login
                    </h1>
                    <CloseIcon onClick={ closeModal } className="top-right" />
                </Grid>
                <Grid container spacing={desktop ? 2: 1}>
                    <Grid item xs={desktop ? 6: 12} align="center">
                        <FormTextInput label="Title" placeHolder="Title..." inputType="text" onChange={ (e) => changeTitle(e) } divClasses="form-text-padding" labelClasses="form-text-padding" />
                    </Grid>
                    <Grid item xs={desktop ? 6: 12} align="center">
                        <FormTextInput label="Username" placeHolder="Username..." inputType="text" onChange={ (e) => changeUsername(e) }  divClasses="form-text-padding" labelClasses="form-text-padding"/>
                    </Grid>
                    <Grid item xs={desktop ? 6: 12} align="center">
                        <FormTextInput label="Password" placeHolder="Password..." inputType="text" onChange={ (e) => changePassword(e) }  divClasses="form-text-padding" labelClasses="form-text-padding"/>
                    </Grid>
                    <Grid item xs={desktop ? 6: 12} align="center">
                        <FormTextInput label="Website" placeHolder="Website..." inputType="text" onChange={ (e) => changeWebsite(e) }  divClasses="form-text-padding" labelClasses="form-text-padding"/>
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