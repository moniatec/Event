import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getHomeEvents, getMembersForJoin } from "../store/homeEvents";
import EventCard from "./EventCard";
import { makeStyles } from '@material-ui/core/styles';
import PaginationTest from './PaginationTest';
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
        let userId = window.localStorage.getItem("currentUserId");
        props.getMembersForJoin(userId);

    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    const events = props.events
    const eventsJoin = props.members

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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

const mapStateToProps = state => {

    return {
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        events: state.homeEvents.list,
        members: state.homeEvents.list2,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeEvents: () => dispatch(getHomeEvents()),
        getMembersForJoin: (...args) => dispatch(getMembersForJoin(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Home
);