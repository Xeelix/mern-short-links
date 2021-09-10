import { Box, Card, CardContent, Divider, Grid, makeStyles, Paper, Typography, Link } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        whiteSpace: "unset",
        wordBreak: "break-all"
    },
    title: {
        paddingBottom: theme.spacing(1)
    },
    linkTo: {
        marginTop: theme.spacing(2)
    },
    p: {
        fontSize: "1.15em",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    leftSpacing: {
        marginLeft: theme.spacing(0.4)
    }
}));

export default function LinkCard({ link }) {
    const classes = useStyles();

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item md={12} xs={12}>
                    <Box my={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.title} variant="h4" >Generated link </Typography>
                            <Divider />


                            <Typography className={classes.linkTo} variant='h5'>
                                <Link href={link.to} target="_blank" rel="noopener noreferrer" underline="hover">
                                    {link.to}
                                </Link>
                            </Typography>
                            <div className={classes.p}>
                                From:
                                <Link className={classes.leftSpacing} href={link.from} target="_blank" rel="noopener noreferrer" underline="hover">
                                    {link.from}
                                </Link>
                            </div>
                            <p className={classes.p}>
                                Clicks count:
                                <strong className={classes.leftSpacing}>
                                    {link.clicks}
                                </strong>
                            </p>
                            <p className={classes.p}>
                                Date of creation:
                                <strong className={classes.leftSpacing}>
                                    {new Date(link.date).toLocaleDateString()}
                                </strong>
                            </p>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}
