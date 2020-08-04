import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createEvent, getOneEvent } from "../store/homeEvents";
import Grid from '@material-ui/core/Grid';
import "../css/loginForm.css";
import { NavLink } from 'react-router-dom';
import Upload from './Upload';
import Paper from '@material-ui/core/Paper';
import '../index.css';
import EventPage from './EventPage';
import Calendar from "react-calendar";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            eventName: "",
            // time: "",
            time: new Date(),
            description: "",
            location: "",
            photoUrl: "",
            event: null,
            submitEnabled: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkSubmitButton = () => {
        if (this.state.eventName.length > 0 && this.state.location.length > 0
            && this.state.description.length > 0 && this.state.photoUrl.length > 0) {
            // this.submitEnabled = true;

            this.setState({ submitEnabled: true });
            console.log(this.state.submitEnabled)
        } else {
            // this.submitEnabled = false;

            this.setState({ submitEnabled: false });
            console.log(this.state.submitEnabled)
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.createEvent(
            this.state.eventName,
            this.state.time,
            this.state.description,
            this.state.location,
            this.state.photoUrl,

        );
        console.log(this.props)
        // this.props.getOneEvent(this.props.event.id);
    }

    updateEventName = (e) => {
        this.setState({ eventName: e.target.value });
        this.checkSubmitButton()
    };

    updateTime = (date) => {
        // this.setState({ time: e.target.value });
        this.setState({ time: date });
        this.checkSubmitButton()
    };

    updateLocation = (e) => {
        this.setState({ location: e.target.value });
        this.checkSubmitButton()
    };

    updateDescription = (e) => {
        this.setState({ description: e.target.value });
        this.checkSubmitButton()
    };

    updatePhoto = (url) => {
        this.setState({ photoUrl: url });
        this.checkSubmitButton()
    };

    render() {
        console.log(this.props)
        if (this.props.event) {
            return <Redirect to="/home" />;
        }
        // const test = this.props.createEvent.event
        // console.log(test)
        return (
            <main className="centered middled">
                <div className="wrapper">
                    <Paper elevation={3} style={{

                        margin: 'auto',
                        maxWidth: 1000,
                        height: 500
                    }}>

                        <h1>Host Your Awesome Event Here</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item style={{

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

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"

                                                id="date-picker-inline"

                                                value={this.state.time}
                                                onChange={this.updateTime}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>

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


                                        <Upload
                                            updatePhoto={this.updatePhoto} />

                                    </div>
                                </Grid>

                                <div className="createEvent">
                                    {this.state.submitEnabled ?
                                        // <NavLink style={{ color: 'white' }} to={`/events/${this.props.event.id}`}>
                                        <button type="submit" className="createEventBtn" >Submit</button>
                                        // </NavLink>
                                        :
                                        <button type="submit" disabled >Submit</button>
                                    }


                                </div>

                            </Grid>
                        </form>

                    </Paper>
                </div>
            </main >
        );
    }
}

const mapStateToProps = (state) => {
    return {

        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        event: state.homeEvents.event
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (eventName, time, description, location, photoUrl) =>
            dispatch(createEvent(eventName, time, description, location, photoUrl)),
        // getOneEvent: (...args) => dispatch(getOneEvent(...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);