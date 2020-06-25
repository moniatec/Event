import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getMyEvents } from "../store/authentication";
import EventCard from "./EventCard";
import EventPage from "./EventPage";
import Pagination from './Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    },

}));
const MyEvents = (props) => {
    const classes = useStyles();
    // console.log(props.events)
    React.useEffect(() => {
        props.getMyEvents();

    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    const events = props.events.events

    // Get current posts
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (props.events.events) {
        const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);



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
                        currentEvents.map((event) => (
                            <Grid item spacing={3}>
                                <EventCard
                                    key={event.id}
                                    event={event}

                                />

                            </Grid>
                        ))
                    }
                </Grid >
                <Pagination
                    eventsPerPage={eventsPerPage}
                    totalEvents={events.length}
                    paginate={paginate}
                />
            </div>

        );
    }
    else {
        return (
            <div>Loading</div>
        )
    }

}

const mapStateToProps = state => {
    // console.log(state)
    return {
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        events: state.authentication.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMyEvents: () => dispatch(getMyEvents()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MyEvents
);