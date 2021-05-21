import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getMyEvents } from "../store/authentication";
import { getMembersForJoin } from "../store/homeEvents";
import EventCard from "./EventCard";
import PaginationTest from './PaginationTest';
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    },
}));
const MyEvents = (props) => {
    const classes = useStyles();
    React.useEffect(() => {
        // props.getMyEvents();
        let userId = window.localStorage.getItem("currentUserId");
        console.log(userId)
        props.getMyEvents(userId);
        props.getMembersForJoin(userId);
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    console.log(props)
    // const events = props.events.events
    const eventsJoin = props.members
    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (props.events) {
        const events = props.events.events
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
                                    eventsJoin={eventsJoin}
                                />
                            </Grid>
                        ))
                    }
                </Grid >
                <PaginationTest
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
    return {
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        events: state.authentication.list,
        members: state.homeEvents.list2,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMyEvents: (...args) => dispatch(getMyEvents(...args)),
        getMembersForJoin: (...args) => dispatch(getMembersForJoin(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MyEvents
);