import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getOneEvent } from "../store/homeEvents";
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
        padding: theme.spacing(2),
    },
    root1: {
        flexGrow: 1,
    },
    // paper: {
    //     padding: theme.spacing(2),
    //     margin: 'auto',
    //     maxWidth: 500,
    // },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const EventPage = (props) => {
    console.log(props)
    const classes = useStyles();
    React.useEffect(() => {
        let id = window.location.href.split("/")[4];
        // console.log(id)
        props.getOneEvent(id);

        console.log(props)

    }, [])
    console.log(props)
    return (
        <div className={classes.root}>

            <Paper elevation={3} >
                <div className={classes.root1}>

                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                {/* <img className={classes.img} alt="complex"  > {props.resEvent}</img> */}
                                <div event={props.event}>hi </div>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Standard license
                </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ID: 1030114
                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                        Remove
                </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">$19.00</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </Paper>
        </div>
    );
}


const mapStateToProps = state => {
    console.log(state)
    return {
        event: state.homeEvents.resEvent
    };

};

const mapDispatchToProps = dispatch => {
    return {
        getOneEvent: (...args) => dispatch(getOneEvent(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    EventPage
);
