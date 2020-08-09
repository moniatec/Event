import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import '../css/splash.css';
import { connect } from "react-redux";


const useStyles = makeStyles({
    root1: {
        width: "100%",
        marginTop: 100,
        marginLeft: 60,
        display: 'flex',

    },
    container: {
        marginTop: 300,
        width: "100%",
        marginLeft: 200,
    },
    title1: {
        marginLeft: 50,
    },
    art: {
        color: "#eca1a6",
    },
    title2: {

        marginTop: 100,
    },

});

const Splash = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={10}
            direction="column"
            justify="center"
            alignItems="flex-start"
        >
            <Grid item spacing={3} justify="center">
                <div className={classes.root1}>
                    <img
                        className='splash-image'
                        src={"images/splash_event.jpg"}
                        style={{
                            margin: "20 auto",
                            borderRadius: "5px",
                            maxWidth: "100%",
                        }}
                    />
                    <div className={classes.title1}>
                        <Typography
                            variant="h3"
                            component="h3"
                            gutterBottom
                        >
                            Welcome to <b className={classes.art}> Event-App </b>
                        </Typography>
                        <Typography
                            className={classes.title2}
                            variant="h4" gutterBottom>
                            <p>Want check our awesome events,</p>
                        </Typography>
                        <Typography
                            variant="h4" gutterBottom>
                            <p>Join events you like,</p>
                            <p >And even host your own events!</p>
                        </Typography>
                    </div>
                </div>
            </Grid>

        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);