import React from "react";
import { useState } from "react";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import FormTextInput from "./FormTextInput";

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
        fetch('/api/createUser', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <form onSubmit={ onSubmit }>
            <Grid container spacing={1}>

                <Grid item xs={12} align="center">
                    <h1>
                        Sign up
                    </h1>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput onChange={ (e) => {changeUsername(e)}} label="Username" placeHolder="Username..." inputType="text" />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput onChange={ (e) => {changeEmail(e)}} label="E-Mail" placeHolder="E-Mail..." inputType="email" />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput onChange={ (e) => {changePassword(e)}} label="Password" placeHolder="Password..." inputType="password" />
                </Grid>
                <Grid item xs={12} align="center">
                    <input className="btn formGrid" type="submit" value= "Signup" />
                </Grid>
            </Grid>
        </form>
    );
};

export default Signup;