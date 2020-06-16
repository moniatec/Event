import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: 50,
            margin: 'auto',
            width: 1000,
            height: 600,
        },
    },
}));

const EventPage = (props) => {
    console.log(props)
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Paper elevation={3} >
                <h1>hi</h1>
            </Paper>
        </div>
    );
}


export default EventPage;
