import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";

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

export default function MemberModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <VisibilityIcon />
            </IconButton>
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
                        <Grid>
                            Members:
                                            {props.members.map(member => (
                            <Grid item spacing={3}

                                key={member.id}

                                username={member.username}>
                                {member.username}
                            </Grid>

                        ))}
                        </Grid>
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