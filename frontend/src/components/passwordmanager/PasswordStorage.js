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
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
    const [openCreation, setOpenCreation] = useState(false);
    const onOpenCreation = () => setOpenCreation(true);
    const onCloseCreation = () => setOpenCreation(false);

    const [openEdit, setOpenEdit] = useState(false);
    const onOpenEdit = () => setOpenEdit(true);
    const onCloseEdit = () => setOpenEdit(false);
    const [passwordToEdit, setPasswordToEdit] = useState();

    const [passwords, setPasswords] = useState([]);

    const fetchPasswordsUser = async () => {
        const response = await fetch('/api/passwordUser/');
        const data = await response.json();
        data.map(password => {
            password.showPassword = false;
            setPasswords(passwords => [...passwords, password]);
        })
    }

    const deletePassword = async (passwordId) => {
        await fetch('/api/deletePassword/', createPostRequest({
            id: passwordId
        })).then(
            () => {
                setPasswords([]);
                fetchPasswordsUser();
            }
        );
    }

    const togglePasswordShown = (password) => {
        password.showPassword = !password.showPassword;
        setPasswords(passwords => [...passwords]);
    }

    const addPassword = (password) => {
        password.showPassword = false;
        setPasswords(passwords => [...passwords, password])
    }

    const editPassword = (password) => {
        let editedPassword = passwords.find(element => element.id === password.id);

        editedPassword.title = password.title;
        editedPassword.username = password.username;
        editedPassword.managed_password = password.managed_password;
        editedPassword.website = password.website;

        setPasswords(passwords => [...passwords]);
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
                            <StyledTableCell align="center" colSpan={5}>
                                <h1>Password storage</h1>
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={1}>
                                <AddCircleOutline className="iconBtn" onClick={ onOpenCreation } />
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={1}>
                                <LogoutIcon className="iconBtn" onClick={ logout }/>
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Website</StyledTableCell>
                            <StyledTableCell align="center">Password</StyledTableCell>
                            <StyledTableCell align="center" colspan={3}/>
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
                                                • • • • •
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
                                    <EditIcon
                                        className="iconBtn"
                                        onClick={() => {
                                            setPasswordToEdit(password);
                                            onOpenEdit();
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{width: '5%'}}>
                                    <DeleteIcon className="iconBtn" onClick={() => deletePassword(password.id)} />
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={ openCreation }
                onClose={ onCloseCreation }
                className="password-modal"
            >
                <PasswordCreation
                    closeModal={ () => onCloseCreation() }
                    addPassword={ (password) => addPassword(password) }
                />
            </Modal>
            <Modal
                open={ openEdit }
                onClose={ onCloseEdit }
                className="password-modal"
            >
                <PasswordCreation
                    closeModal={ () => onCloseEdit() }
                    creation={ false }
                    addPassword={ (password) => editPassword(password) }
                    passwordToEdit={ passwordToEdit }
                />
            </Modal>
        </Grid>
    )
}

export default PasswordStorage