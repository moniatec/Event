import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import JoinBtn from './JoinBtn'
import { getOneEvent, deleteEventReq, updateEventReq } from "../store/homeEvents";
import MemberModal from './MemberModal'
import '../index.css';

const useStyles = makeStyles((theme) => ({
    paperEvent: {
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
    root: {
        flexGrow: 1,
    },

    img: {
        margin: 'auto',
        display: 'block',
        width: 800,
        height: 600,
    },
}));



const EventPage = (props) => {
    console.log(props)
    const [description, setDescription] = useState('')
    const classes = useStyles();
    React.useEffect(() => {
        let id = window.location.href.split("/")[4];
        props.getOneEvent(id);
    }, [])

    const handleDelete = () => {
        let eventId = window.location.href.split("/")[4];
        props.deleteEvent(eventId)
    }

    const updateEvent = e => {
        e.preventDefault();
        let eventId = window.location.href.split("/")[4];
        props.updateEventReq(eventId, description, props.token)
    }

    const updateValue = cb => e => cb(e.target.value);
    if (props.event) {
        const event1 = props.event.event
        const members1 = props.event.members
        const eventsJoin = props.event.members
        const memb = members1.members
        let testJoin = false
        for (let i = 0; i < (Object.values(memb)).length; i++) {
            if ((Object.values(memb))[i].id === props.currentUserId) {
                testJoin = true
            }
        }
        return (
            <div className={classes.paperEvent}>
                <Paper elevation={3} >
                    <div className={classes.root}>
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
                                        <Typography gutterBottom variant="h5" component="h2"   >
                                            {event1.eventName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ marginBottom: '30px', }}>
                                            Hosted By {event1.host.username}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Time: {Date(event1.time)}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom style={{ marginBottom: '50px', }}>
                                            Location: {event1.location}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Description:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ marginBottom: '50px', }} >
                                            {event1.description}
                                        </Typography>
                                        {testJoin === false ?
                                            <JoinBtn
                                                eventId={event1.id}
                                                eventsJoin={eventsJoin}
                                            />
                                            : <div></div>
                                        }
                                    </Grid>
                                    <Grid>
                                        {event1.hostId === parseInt(props.currentUserId) ?
                                            <>
                                                <MemberModal
                                                    members={members1.members}
                                                />
                                                <Grid item>
                                                    <div style={{ marginLeft: '100px' }} >Description:</div>
                                                    <TextField
                                                        style={{ marginBottom: '20px', marginLeft: '100px', width: '100px' }}
                                                        variant="outlined"
                                                        type="caption"
                                                        onChange={updateValue(setDescription)}
                                                    />
                                                    <Button variant="contained" onClick={updateEvent} style={{ marginTop: '10px', marginLeft: '10px' }}>Edit</Button>
                                                </Grid >
                                                <Grid item>
                                                    <NavLink style={{ color: 'white' }} to="/home">
                                                        <Button variant="contained" onClick={handleDelete} style={{ marginBottom: '50px', marginLeft: '120px' }}>Cancel Event</Button>
                                                    </NavLink>
                                                </Grid >
                                            </>
                                            :
                                            <div>

                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </div >
        );
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}


const mapStateToProps = state => {
    if (state.homeEvents.resEvent)
        return {
            token: state.authentication.token,
            currentUserId: state.authentication.currentUserId,
            event: state.homeEvents.resEvent,
        };
};

const mapDispatchToProps = dispatch => {
    return {
        getOneEvent: (...args) => dispatch(getOneEvent(...args)),
        deleteEvent: (...args) => dispatch(deleteEventReq(...args)),
        updateEventReq: (...args) => dispatch(updateEventReq(...args)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    EventPage
);
