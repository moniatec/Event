import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getHomeEvents } from "../store/homeEvents";
import EventCard from "./EventCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    },

}));
const Home = (props) => {
    const classes = useStyles();
    console.log(props)
    React.useEffect(() => {
        props.getHomeEvents();

    }, [])

    return (
        <div className={classes.root}>
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
                            <EventCard //pass product
                                key={event.id}
                                event={event}
                            // title={event.id}
                            // id={event.id}
                            // eventName={event.eventName}
                            // image={event.photoUrl}
                            // price={event.price}
                            // description={event.description}
                            />
                        </Grid>
                    ))
                }
            </Grid >
        </div>

    );

}

const mapStateToProps = state => {
    console.log(state)
    return {
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