import React from "react";
import {Grid} from "@mui/material";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const PasswordStorage = ({  }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <h1>
                    Password storage
                </h1>
            </Grid>
            <Grid item xs={12} align="center">
                <button className="btn">
                    <div className="vertical-center">Add Password</div>
                    <AddCircleOutline />
                </button>
            </Grid>
        </Grid>
    )
}

export default PasswordStorage