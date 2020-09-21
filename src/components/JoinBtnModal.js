import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '@material-ui/core/Button';
import { sendJoinReq } from "../store/homeEvents";
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

const JoinBtn = (props) => {
    const classes = useStyles();
    const [disableBtn, setDisableBtn] = useState(false);

    const [open, setOpen] = React.useState(false);

    let userId = window.localStorage.getItem("currentUserId");
    let eventsJoin = props.eventsJoin
    let eventId = props.eventId
    React.useEffect(() => {
        if (eventsJoin) {
            for (let i = 0; i < eventsJoin.length; i++) {
                if (eventsJoin[i].eventId === eventId) {
                    setDisableBtn(true);
                }
            }
        }
    }, []);

    const handleJoin = async () => {
        props.sendJoinReq(userId, eventId);
        setDisableBtn(true);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    if (props) {
        return (
            <div className={classes.root}>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleJoin}
                    disabled={disableBtn}>
                    Join
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h1 id="transition-modal-title">Congratulations!</h1>
                            <p id="transition-modal-description">You've joined the event. </p>
                        </div>
                    </Fade>
                </Modal>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    JoinBtn
);