import React, {useState} from "react";
import {Grid, Modal} from "@mui/material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import PasswordCreation from "./PasswordCreation";

const PasswordStorage = ({  }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

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
            <Modal
                open={ open }
                onClose={ onClose }
                className="password-modal"
            >
                <PasswordCreation closeModal={ () => onClose() } />
            </Modal>
        </Grid>
    )
}

export default PasswordStorage