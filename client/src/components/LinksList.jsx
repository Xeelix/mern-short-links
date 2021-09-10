import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: theme.spacing(1)
    },
    paper: {
        whiteSpace: "unset",
        wordBreak: "break-all",
        padding: theme.spacing(2)
    },
    button: {
        width: "8rem",
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            width: "100%"
        },
    },
    index: {
        display: "flex",
        alignItems: "center"
    },
    rowLayout: {
        flexDirection: "column",
        // alignItems: 'center',
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center' // To be vertically aligned
    }

}));

export default function LinksList({ links }) {
    const classes = useStyles();

    if (!links.length) {
        return (<p>No links</p>)
    }
    console.log(links)
    return (
        <Grid container spacing={2} className={classes.grid} >
            {links.map((link, index) => {
                return (
                    <>
                        <Grid key={link._id} item xs={12} md={12}>

                            <Paper elevation={3} className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item className={classes.index} display="flex">
                                        <span>#{index + 1}</span>
                                    </Grid>

                                    <Grid item className={classes.rowLayout} xs container direction="column">
                                        <Grid item xs>
                                            <Typography>{link.from}</Typography>
                                        </Grid>

                                        <Grid className={classes.button} item>
                                            <Button
                                                className={classes.button}
                                                variant="contained"
                                                color="secondary"
                                                component={Link}
                                                to={`/detail/${link._id}`}
                                            >
                                                Open
                                            </Button>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>

                    </>
                )
            })}
        </Grid>
    )
}
