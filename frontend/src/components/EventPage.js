import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import { getOneEvent } from "../store/homeEvents";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: 50,
            margin: 'auto',
            width: 1200,
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
    // image: {
    //     width: 128,
    //     height: 128,
    // },
    img: {
        margin: 'auto',
        display: 'block',
        // maxWidth: '100%',
        // maxHeight: '100%',
        width: 800,
        height: 600,
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
    console.log(props.event)
    if (props.event) {
        const event1 = props.event.event
        console.log(event1)
        return (
            <div className={classes.root}>

                <Paper elevation={3} >
                    <div className={classes.root1}>

                        <Grid container spacing={2}>

                            <Grid item>
                                <img
                                    component="img"
                                    alt="Contemplative Reptile"

                                    className={classes.img}
                                    src={event1.photoUrl}
                                    title="Contemplative Reptile"
                                />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs >
                                        <Typography gutterBottom variant="h5" component="h2"  >
                                            {event1.eventName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            HOSTED BY {event1.host.username}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Time: {event1.time}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Location: {event1.location}
                                        </Typography>

                                        <Typography variant="body2" gutterBottom>
                                            {event1.description}
                                        </Typography>

                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/* <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid> */}
                            </Grid>
                        </Grid>

                    </div>
                </Paper>
            </div>
        );
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    if (state.homeEvents.resEvent)
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
