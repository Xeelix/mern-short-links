import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography, FormControl, Snackbar } from "@material-ui/core"
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '75%',
        marginBottom: theme.spacing(1)
    },
    button: {
        width: '75%',
        height: "2.5rem",
        marginBottom: theme.spacing(.5)
    }
}));

export const AuthPage = () => {
    const classes = useStyles();

    const auth = useContext(AuthContext);
    const message = useMessage()
    const { loading, error, clearError, request } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    useEffect(() => {
        message(error, 'error');
        clearError();
    }, [error, message, clearError])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setForm({ ...form, showPassword: !form.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = async () => {
        try {
            const data = await request('/api/auth/register', "POST", { ...form });
            message(data.message);
            console.log("Data", data);
        } catch (e) { }
    }

    const handleLogin = async () => {
        try {
            const data = await request('/api/auth/login', "POST", { ...form });
            auth.login(data.token, data.userId)
            console.log("Data", data);
        } catch (e) { }
    }

    return (

        <div>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box my={2}>
                        <Typography align="center" p={3} variant="h4" >Short your link</Typography>
                    </Box>


                    <Paper elevation={2} >
                        {/* <Box p={3} pb={6} textAlign="center"> */}
                        <Box p={3} pb={6} textAlign="center">
                            <TextField
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                id="email"
                                name="email"
                                className={classes.textField}
                                label="Email"
                            />


                            <FormControl className={classes.textField}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type={form.showPassword ? "text" : "password"}
                                    onChange={handleChange}
                                    value={form.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {form.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {/* <TextField className={classes.textField} label="Password" type="password" /> */}
                            <Box mt={3}>
                                <Button
                                    onClick={handleLogin}
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    Log in
                                </Button>

                                <Button
                                    onClick={handleRegister}
                                    disabled={loading}
                                    className={classes.button}
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
