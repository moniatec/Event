import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sendJoinReq } from "../store/homeEvents";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const JoinBtn = (props) => {
    // console.log(props)
    const classes = useStyles();

    React.useEffect(() => {
        let userId = parseInt(window.localStorage.getItem("currentUserId"));

    }, []);

    const handleJoin = async () => {
        let eventId = props.eventId
        console.log(eventId)
        // let followedId = window.location.href.split("/")[4];
        let userId = window.localStorage.getItem("currentUserId");
        console.log(userId)
        props.sendJoinReq(userId, eventId);
        // setFollowed("following");
        console.log(props)
    }

    // const handleDeleteJoin = async () => {
    //     // let followedId = window.location.href.split("/")[4];
    //     let userId = window.localStorage.getItem("currentUserId");
    //     props.sendDeleteJoinReq(userId, followedId);
    //     // setFollowed("not following");
    // }


    if (props) {
        return (

            <div className={classes.root}>
                {/* <Button variant="contained" color="primary" onClick={handleUnfollow}>
                        UnFollow
          </Button> */}
                <Button
                    size="small"
                    color="primary"
                    onClick={handleJoin}>
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
        // sendUnfollowReq: (...args) => dispatch(sendUnfollowReq(...args)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    JoinBtn
);