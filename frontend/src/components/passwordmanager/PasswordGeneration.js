import React, {useEffect, useState} from "react";
import {Grid, Modal, Slider, useMediaQuery} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import createPostRequest from "../generic/CreatePostRequest";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const PasswordCreation = ({ open, setOpen, writePassword }) => {
    const closeModalAndSave = () =>{
        writePassword(password);
        setOpen(false);
    }

    const closeModal = () => setOpen(false);

    const [isUpper, setIsUpper] = useState(true);
    const [isNumber, setIsNumber] = useState(true);
    const [isSymbol, setIsSymbol] = useState(true);
    const [passwordLength, setPasswordLength] = useState(12);

    const [password, setPassword] = useState('');

    const minLength = 6;
    const maxLength = 30;

    const handleLengthChange = (event) => {
        getPassword();
        setPasswordLength(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleUpperChanged = (event) => {
        getPassword();
        setIsUpper(event.target.checked);
    }

    const handleNumberChanged = (event) => {
        getPassword();
        setIsNumber(event.target.checked);
    }

    const handleSymbolChanged = (event) => {
        getPassword();
        setIsSymbol(event.target.checked);
    }

    const checkBoxStyle = {
        color: '#3500D3',
        '&.Mui-checked': {
            color: '#3500D3',
        }
    }
    const getPassword = async () => {
        await fetch('/api/generatePassword/', createPostRequest({
                length: passwordLength,
                isUpper: isUpper,
                isNumber: isNumber,
                isSymbol: isSymbol
            }))
            .then((response) => response.json())
            .then((data) => setPassword(data));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // insert password in password creation
    }

    useEffect(() => {
        getPassword();
    }, [])

    return (
        <Modal
                open={ open }
                onClose={ closeModal }
                className="password-modal"
        >
            <Grid container>
                <Grid item xs={12} align="center">
                    <h1>
                        Generate Password
                    </h1>
                    <CloseIcon onClick={ closeModal } className="top-right" />
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <span className="center">
                            Password Length: {passwordLength}
                        </span>
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <Slider
                            aria-label="Length"
                            defaultValue={12}
                            min={minLength}
                            max={maxLength}
                            onChange={handleLengthChange}
                            aria-labelledby="input-slider"
                            style={{
                                width: "80%"
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <span>Uppercase Letters</span>
                        <Checkbox
                            sx={checkBoxStyle}
                            onChange={handleUpperChanged}
                            defaultChecked
                        />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <span>Numbers</span>
                        <Checkbox
                            sx={checkBoxStyle}
                            onChange={handleNumberChanged}
                            defaultChecked
                        />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <span>Symbols</span>
                        <Checkbox
                            sx={checkBoxStyle}
                            onChange={handleSymbolChanged}
                            defaultChecked
                        />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className="center">
                        <span>
                            { password }
                        </span>
                        <AutorenewIcon className="iconBtn" onClick={getPassword} />
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <button className="btn" onClick={closeModalAndSave}>
                        Use Password
                    </button>
                </Grid>
            </Grid>
        </Modal>
    );
}

export default PasswordCreation;