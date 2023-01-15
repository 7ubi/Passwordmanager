import React from "react";
import { useState } from "react";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import FormTextInput from "../generic/FormTextInput";
import createPostRequest from "../generic/CreatePostRequest";

const Signup = ({  }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_repeat, setPassword_repeat] = useState('');
    const [usernameExits, setUsernameExits] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");

    const passwordMatchErrorMessage = "Passwords do not match"

    const changeUsername = (e) => {
        setUsername(e.target.value);
        checkUsername(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changePassword_repeat = (e) => {
        setPassword_repeat(e.target.value);
    }

    const checkUsername = (val) => {
        fetch('/api/checkUsername/', createPostRequest({
            username: val
        }))
            .then(async (response) => {
                let data = await response.json();
                setUsernameExits(data.username_exits);
            });
    }

    const isPasswordMatch = () => {
        if(password === password_repeat) {
            setPasswordMatchError("");
            return true;
        } else {
            setPasswordMatchError(passwordMatchErrorMessage);
            return false;
        }
    }

    const createUser = (e) => {
        e.preventDefault();

        // You can only create a user if the username doesn't exist already
        // and if the passwords match
        if(usernameExits || !isPasswordMatch())
            return;

        fetch('/api/createUser/', createPostRequest({
            username: username,
            email: email,
            password: password
        }))
            .then((response) => {
                if(response.status === 201){
                    location.href = "/authentication";
                }
            });
    }

    return (
        <form onSubmit={ createUser } className="login">
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
                        error={ usernameExits }
                        errorMessage={ true }
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
                        error={ passwordMatchError }
                        errorMessage={ true }
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changePassword_repeat(e)}}
                        label="Repeat Password"
                        placeHolder="Repeat Password..."
                        inputType="password"
                        error={ passwordMatchError }
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