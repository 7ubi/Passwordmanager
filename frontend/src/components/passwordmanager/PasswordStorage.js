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

            </Grid>
            <Grid xs={12} align="center">

            </Grid>
            <Grid xs={12} align="center">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h1>
                                    Password storage
                                </h1>
                            </th>
                            <th align={"right"}>
                                <button className="btn" onClick={ onOpen }>
                                    <AddCircleOutline />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            passwords.map(password =>
                                <PasswordListElement password={ password } />
                            )
                        }
                    </tbody>
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