import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createEvent } from "../store/homeEvents";
import Grid from '@material-ui/core/Grid';
import "../css/loginForm.css";
import Upload from './Upload';
import Paper from '@material-ui/core/Paper';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            eventName: "",
            time: "",
            description: "",
            location: "",
            photoUrl: "",
            // hostId: 1
        };
        // console.log(this.hostId)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.createEvent(
            this.state.eventName,
            this.state.time,
            this.state.description,
            this.state.location,
            this.state.photoUrl,
            // this.state.hostId,
        );
    }

    updateEventName = (e) => {
        this.setState({ eventName: e.target.value });
    };

    updateTime = (e) => {
        this.setState({ time: e.target.value });
    };

    updateLocation = (e) => {
        this.setState({ location: e.target.value });
    };

    updateDescription = (e) => {
        this.setState({ description: e.target.value });
    };

    updatePhoto = (url) => {
        this.setState({ photoUrl: url });
    };

    render() {
        // if (this.props.token) {
        //     return <Redirect to="/home" />;
        // }
        return (
            <main className="centered middled">
                <div className="wrapper">
                    <Paper elevation={3} style={{
                        // padding: theme.spacing(2),
                        margin: 'auto',
                        maxWidth: 1000,
                        height: 500
                    }}>
                        {/* <div className="form-wrapper" style={{ marginTop: '150px' }}> */}
                        <h1>Create An Event</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item style={{
                                    // padding: theme.spacing(2),
                                    marginLeft: 60,
                                    marginTop: 40,
                                }}>
                                    <div className="eventName">
                                        <label htmlFor="eventName">EventName</label>
                                        <input
                                            type="text"
                                            placeholder="Enter eventName"
                                            value={this.state.eventName}
                                            onChange={this.updateEventName}
                                        />
                                    </div>
                                    <div className="time">
                                        <label htmlFor="time">Time</label>
                                        <input
                                            type="text"
                                            placeholder="Enter time"
                                            value={this.state.time}
                                            onChange={this.updateTime}
                                        />
                                    </div>
                                    <div className="location">
                                        <label htmlFor="location">Location</label>
                                        <input
                                            type="location"
                                            placeholder="Enter location"
                                            value={this.state.location}
                                            onChange={this.updateLocation}
                                        />
                                    </div>
                                    <div className="description">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="description"
                                            placeholder="Enter description"
                                            value={this.state.description}
                                            onChange={this.updateDescription}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <div className="photoUrl">
                                        {/* <label htmlFor="photoUrl">photoUrl</label> */}

                                        <Upload
                                            updatePhoto={this.updatePhoto} />

                                    </div>
                                </Grid>
                                <div className="createEvent">
                                    <button type="submit">Create Event</button>

                                </div>
                            </Grid>
                        </form>
                        {/* </div> */}
                    </Paper>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // token: state.authentication.token,
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        event: state.homeEvents.event
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (eventName, time, description, location, photoUrl) =>
            dispatch(createEvent(eventName, time, description, location, photoUrl)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);