import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sendJoinReq } from "../store/homeEvents";
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root1: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const JoinBtn = (props) => {
    console.log(props)
    const classes = useStyles();
    const [disableBtn, setDisableBtn] = useState(false);
    // let eventId = props.eventId
    let userId = window.localStorage.getItem("currentUserId");
    // props.getMembersForJoin(userId);
    let eventsJoin = props.eventsJoin
    let eventId = props.eventId
    React.useEffect(() => {
        let userId = parseInt(window.localStorage.getItem("currentUserId"));
        for (let i = 0; i < eventsJoin.length; i++) {
            if (eventsJoin[i].eventId == eventId) {
                setDisableBtn(true);
            }
        }
    }, []);




    const handleJoin = async () => {
        // let eventId = props.eventId
        // let userId = window.localStorage.getItem("currentUserId");
        props.sendJoinReq(userId, eventId);
        setDisableBtn(true);
    }




    if (props) {
        return (

            <div className={classes.root1}>

                <Button
                    size="small"
                    color="primary"
                    onClick={handleJoin}
                    disabled={disableBtn}>
                    Join
                </Button>
            </div>


        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }

}


const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        members: state.homeEvents.resEvent,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sendJoinReq: (...args) => dispatch(sendJoinReq(...args)),
        // getMembersForJoin: (...args) => dispatch(getMembersForJoin(...args)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    JoinBtn
);