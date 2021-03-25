import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import '../css/splash.css';
import { connect } from "react-redux";


const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    container: {
        marginTop: 300,
        width: "100%",
        marginLeft: 200,
        alignItems: 'center'
    },
    title1: {
        // marginLeft: 50,
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
        <div>
            <Grid
                container
                spacing={10}
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Grid
                    container
                    item spacing={3}
                    justify="center"
                >
                    <div className={classes.title1} id='text' style={{ marginTop: '100px' }}>
                        <Typography
                            variant="h3"
                            component="h3"
                            gutterBottom
                        >
                            Welcome to <b className={classes.art}> Event-App </b>
                        </Typography>
                    </div>
                </Grid>
                <Grid
                    container
                    item spacing={3}
                    justify="center"
                >
                    <div
                        className={classes.root}
                        justify="center"
                        // id='splash' 
                        alt="" >
                        <img
                            alt=''
                            className='splash-image'
                            src={"images/splash_event.jpg"}
                            style={{
                                margin: "20 auto",
                                borderRadius: "5px",
                                maxWidth: "100%",
                            }}
                        />
                    </div>

                </Grid>

            </Grid>
        </div>
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