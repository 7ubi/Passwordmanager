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
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import PasswordCreation from "./PasswordCreation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#0C0032',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#240090',
        color: theme.palette.common.white,
    },
}));


const PasswordStorage = ({  }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const [passwords, setPasswords] = useState([]);

    const fetchPasswordsUser = async () => {
        const response = await fetch("/api/passwordUser");
        const data = await response.json();
        data.map(password => {
            setPasswords(passwords => [...passwords, password]);
        })
    }

    const addPassword = (password) => {
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
                            <StyledTableCell align="center" colSpan={2}>
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
                            <StyledTableCell align="center">Password</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {passwords.map((password) => (
                            <TableRow
                              key={password.title}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{password.title}</StyledTableCell>
                                <StyledTableCell align="center">{password.username}</StyledTableCell>
                                <StyledTableCell align="center">{password.website}</StyledTableCell>
                                <StyledTableCell align="center">{password.managed_password}</StyledTableCell>
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