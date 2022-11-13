import React, { useState, useEffect } from "react";
import {
    Grid,
    Modal,
    Paper, styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordCreation from "./PasswordCreation";
import createPostRequest from "../generic/CreatePostRequest";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#0C0032',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#240090',
        color: theme.palette.common.white,
        width: "max-content"
    },
}));


const PasswordStorage = ({  }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const [passwords, setPasswords] = useState([]);

    const fetchPasswordsUser = async () => {
        const response = await fetch('/api/passwordUser');
        const data = await response.json();
        data.map(password => {
            password.showPassword = false;
            setPasswords(passwords => [...passwords, password]);
        })
    }

    const deletePassword = async (passwordId) => {
        await fetch('api/deletePassword', createPostRequest({
            id: passwordId
        })).then(
            () => {
                setPasswords([]);
                fetchPasswordsUser();
            }
        );
        //;
    }

    const togglePasswordShown = (password) => {
        password.showPassword = !password.showPassword;
        setPasswords(passwords => [...passwords]);
    }

    const addPassword = (password) => {
        password.showPassword = false;
        setPasswords(passwords => [...passwords, password])
    }

    const logout = async () => {
        const response = await fetch("/api/logout");
        location.href = "/login";
    }

    useEffect(() => {
        fetchPasswordsUser();
    }, [])

    return (
        <Grid container spacing={1}>
            <TableContainer className="passwordTable" component={ Paper }>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" colSpan={4}>
                                <h1>Password storage</h1>
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={1}>
                                <AddCircleOutline className="iconBtn" onClick={ onOpen } />
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={1}>
                                <LogoutIcon className="iconBtn" onClick={ logout }/>
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Website</StyledTableCell>
                            <StyledTableCell align="center" colSpan={2}>Password</StyledTableCell>
                            <StyledTableCell align="center"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {passwords.map((password) => (
                            <TableRow
                              key={password.title}
                            >
                                <StyledTableCell align="center">{password.title}</StyledTableCell>
                                <StyledTableCell align="center">{password.username}</StyledTableCell>
                                <StyledTableCell align="center">{password.website}</StyledTableCell>
                                <StyledTableCell align="center" style={{width: '20%'}}>
                                    <div className="center">
                                        {
                                            password.showPassword ?
                                            <span>{password.managed_password}</span>:
                                            <span>
                                                <CircleIcon className="iconBtn" style={{ fontSize: 'small', padding: 0}} />
                                                <CircleIcon className="iconBtn" style={{ fontSize: 'small', padding: 0}} />
                                                <CircleIcon className="iconBtn" style={{ fontSize: 'small', padding: 0}} />
                                                <CircleIcon className="iconBtn" style={{ fontSize: 'small', padding: 0}} />
                                            </span>
                                        }
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{width: '5%'}}>
                                    {
                                        password.showPassword ?
                                        <VisibilityIcon className="iconBtn" onClick={ () => togglePasswordShown(password) } style={{ float: 'right'}} />:
                                        <VisibilityOffIcon className="iconBtn" onClick={ () => togglePasswordShown(password) } style={{ float: 'right'}} />
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{width: '5%'}}>
                                    <DeleteIcon onClick={() => deletePassword(password.id)} />
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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