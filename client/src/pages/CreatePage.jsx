import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from "../hooks/http.hook"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
}));

export const CreatePage = () => {
    const classes = useStyles();

    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');

    const handlePress = async event => {
        if (event.charCode == 13) {
            try {
                console.log('Token', auth.token)
                const data = await request('/api/link/generate', "POST", { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
                console.log("Data", data);
            } catch (e) {
                alert(e.message);
            }
        }
    }

    return (
        <div>
            <Box>
                <TextField
                    value={link}
                    onChange={e => { setLink(e.target.value) }}
                    onKeyPress={handlePress}
                    type="text"
                    id="link"
                    name="link"
                    className={classes.textField}
                    label="Enter url"
                />
                <Button
                    onClick={handlePress}
                    className={classes.button}
                    color="secondary"
                >
                    Sign up
                </Button>
            </Box>
        </div>
    )
}
