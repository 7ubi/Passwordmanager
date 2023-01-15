import React, {useState} from "react";
import {Grid} from "@mui/material";
import FormTextInput from "../generic/FormTextInput";
import createPostRequest from "../generic/CreatePostRequest";

const Login = ({  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('/api/loginUser/', createPostRequest({
            username: username,
            password: password
        }))
            .then((response) => {
                if(response.status === 200) {
                    location.href = "/";
                }else{
                    setError("Username or Password is incorrect");
                }
            });
    }

    return (
        <form onSubmit={ onSubmit } className="login">
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <h1>
                        Login
                    </h1>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changeUsername(e)}}
                        label="Username"
                        placeHolder="Username..."
                        inputType="text"
                        error={ error }
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput
                        onChange={ (e) => {changePassword(e)}}
                        label="Password"
                        placeHolder="Password..."
                        inputType="password"
                        error={ error }
                    />
                </Grid>
                {
                    error !== "" &&
                    <Grid item xs={12} align="center">
                        <p className="error">
                            <b>{ error }</b>
                        </p>
                    </Grid>
                }
                <Grid item xs={12} align="center">
                    <input className="btn formGrid" type="submit" value= "Login" />
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;