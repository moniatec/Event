import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import '../index.css';

import { connect } from "react-redux";
const useStyles = makeStyles({
    root: {
        width: "100%",
        // maxWidth: 500,
        marginTop: 100,
    },
    container: {
        marginTop: 300,
        width: "100%",
        // maxWidth: 200,
        marginLeft: 200,
    },
    title1: {
        marginLeft: 500,
    },
    art: {
        color: "#eca1a6",
    },
    title2: {
        marginLeft: 400,
    },
    // title3: {
    //     marginLeft: 200,
    // },
});

const Splash = () => {
    // useEffect(() => {
    //     (async () => {
    //         props.getProducts();
    //     })();
    // }, []);
    // console.log(props);
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
                <div className={classes.root}>
                    <Typography
                        className={classes.title1}
                        variant="h3"
                        component="h3"
                        gutterBottom
                    >
                        Welcome to <b className={classes.art}> Event-App </b>
                    </Typography>
                    <Typography className={classes.title2} variant="h3" gutterBottom>
                        <p>Want check our awesome events,</p>
                    </Typography>
                    <Typography className={classes.title3} variant="h3" gutterBottom>
                        <p style={{ marginLeft: '600px' }}>Join events you like,</p>
                        <p style={{ marginLeft: '400px' }}>And even host your own events!</p>
                    </Typography>
                </div>
            </Grid>

        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        // products: state.products.list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getProducts: () => dispatch(getProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);