import React from 'react';
import {Grid} from "@mui/material";

const PasswordListElement = ({ password }) => {
    return (
        <tr>
            <td>
                { password.title }
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