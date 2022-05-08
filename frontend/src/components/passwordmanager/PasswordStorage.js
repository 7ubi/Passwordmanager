import React, { useState, useEffect } from "react";
import {Grid, Modal} from "@mui/material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import PasswordCreation from "./PasswordCreation";
import PasswordListElement from "./PasswordListElement";

const PasswordStorage = ({  }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const [passwords, setPasswords] = useState([]);

    const fetchPasswordsUser = async () => {
        const response = await fetch("/api/passwordUser")
        const data = await response.json();
        data.map(password => {
            setPasswords(passwords => [...passwords, password]);
        })
    }

    const addPassword = (password) => {
        setPasswords(passwords => [...passwords, password])
    }

    useEffect(() => {
        fetchPasswordsUser()
    }, [])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <h1>
                    Password storage
                </h1>
            </Grid>
            <Grid xs={12} align="center">
                <button className="btn" onClick={ onOpen }>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className="vertical-center">Add Password</div>
                        </Grid>
                        <Grid item xs={6}>
                            <AddCircleOutline />
                        </Grid>
                    </Grid>
                </button>
            </Grid>
            <Grid xs={12} align="center">
                <table>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Website
                        </th>
                        <th>
                            Password
                        </th>
                    </tr>
                    {
                        passwords.map(password =>
                            <PasswordListElement password={ password } />
                        )
                    }
                </table>
            </Grid>
            <Modal
                open={ open }
                onClose={ onClose }
                className="password-modal"
            >
                <PasswordCreation closeModal={ () => onClose() } addPassword={ (password) => addPassword(password) }/>
            </Modal>
        </Grid>
    )
}

export default PasswordStorage