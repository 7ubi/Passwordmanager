import React, {useState} from "react";
import {Grid} from "@mui/material";
import FormTextInput from "../generic/FormTextInput";

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

    function getCookie(name) {
      if (!document.cookie) {
        return null;
      }

      const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

      if (xsrfCookies.length === 0) {
        return null;
      }
      return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-CSRF-Token': getCookie('CSRF-TOKEN')},
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        // TODO make it more secure
        // TODO better error handling
        fetch('/api/loginUser', requestOptions)
            .then((response) => {
                if(response.status === 200) {
                    location.href = "/";
                }else{
                    setError("Username or Password is incorrect");
                }
            });
    }

    return (
        <form onSubmit={ onSubmit }>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <h1>
                        Login
                    </h1>
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
                    <FormTextInput onChange={ (e) => {changeUsername(e)}} label="Username" placeHolder="Username..." inputType="text" />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormTextInput onChange={ (e) => {changePassword(e)}} label="Password" placeHolder="Password..." inputType="password" />
                </Grid>
                <Grid item xs={12} align="center">
                    <input className="btn formGrid" type="submit" value= "Login" />
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;