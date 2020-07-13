import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getHomeEvents } from "../store/homeEvents";
import EventCard from "./EventCard";
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root1: {
        marginTop: 100
    },

}));
const Home = (props) => {
    const classes = useStyles();

    React.useEffect(() => {
        props.getHomeEvents();

    }, [])

    return (
        <div className={classes.root1}>
            < Grid
                container
                spacing={10}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {
                    props.events.map((event) => (
                        <Grid item spacing={3}>
                            <EventCard
                                key={event.id}
                                event={event}

                            />
                        </Grid>
                    ))
                }
            </Grid >
        </div>

    );

}

const mapStateToProps = state => {

    return {
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        events: state.homeEvents.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeEvents: () => dispatch(getHomeEvents()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Home
);