import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getHomeEvents } from "../store/homeEvents";
import EventCard from "./EventCard";
import { makeStyles } from '@material-ui/core/styles';
import PaginationTest from './PaginationTest';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    },

}));
const HomePagination = (props) => {
    const classes = useStyles();
    // console.log(props)
    React.useEffect(() => {
        props.getHomeEvents();

    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    const events = props.events

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


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
            <PaginationTest
                eventsPerPage={eventsPerPage}
                totalEvents={events.length}
                paginate={paginate}
            />
        </div>

    );

}

const mapStateToProps = state => {
    console.log(state)
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
    HomePagination
);