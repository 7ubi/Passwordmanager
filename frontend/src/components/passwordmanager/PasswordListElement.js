import React from 'react';
import {Grid} from "@mui/material";

const PasswordListElement = ({ password }) => {
    return (
        <tr className={'managedPassword'}>
            <td>
                <b>{ password.title }</b>
            </td>
            <td>
                { password.username }
            </td>
            <td>
                { password.website }
            </td>
            <td>
                { password.managed_password }
            </td>
        </tr>
    );
}

export default PasswordListElement;