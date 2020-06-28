import React, { useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { getOneEvent, deleteEventReq, updateEventReq } from "../store/homeEvents";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    media: {
        height: 500,
        width: 500,
        paddingTop: "56.25%", // 16:9
    },
}));

const EditModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('')
    const handleOpen = () => {
        setOpen(true);
    };
    console.log(props)

    const updateValue = cb => e => cb(e.target.value);

    const updateEvent = e => {
        e.preventDefault();
        let eventId = window.location.href.split("/")[4];
        props.updateEventReq(eventId, description, props.token)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <IconButton onClick={handleOpen}>
                <VisibilityIcon />
            </IconButton> */}
            <Button variant="contained" onClick={handleOpen}>Edit event </Button>
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
                        <Grid item>
                            <div >Description:</div>
                            <TextField
                                style={{ marginBottom: '50px', }}
                                variant="outlined"
                                type="caption"
                                onChange={updateValue(setDescription)}

                            />
                            <Button variant="contained" onClick={updateEvent}>Edit</Button>
                        </Grid >
                        {/* <CardMedia
                            className={classes.media}
                            image={props.image}
                        ></CardMedia> */}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {

        updateEventReq: (...args) => dispatch(updateEventReq(...args)),
    };
};

export default connect(

    mapDispatchToProps
)(
    EditModal
);