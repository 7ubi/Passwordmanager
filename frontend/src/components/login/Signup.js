import React from "react";
import { useState } from "react";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import FormTextInput from "../generic/FormTextInput";

const Signup = ({  }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        };

        // TODO make it more secure
        // TODO add ERROR
        fetch('/api/createUser', requestOptions)
            .then((response) => {
                if(response.status === 201){
                    location.href = "/login";
                }
            });
    }

    // TODO repeat password
    return (
        <form onSubmit={ onSubmit } className="login">
            <Grid container spacing={1}>

                <Grid item xs={12} align="center">
                    <h1>
                        Sign up
                    </h1>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changeUsername(e)}}
                        label="Username"
                        placeHolder="Username..."
                        inputType="text"
                        error=""
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changeEmail(e)}}
                        label="E-Mail"
                        placeHolder="E-Mail..."
                        inputType="email"
                        error=""
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changePassword(e)}}
                        label="Password"
                        placeHolder="Password..."
                        inputType="password"
                        error=""
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <input className="btn formGrid" type="submit" value= "Signup" />
                </Grid>
            </Grid>
        </form>
    );
};

export default Signup;