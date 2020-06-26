
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { logout } from "../store/authentication";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: theme.gradientBackground,
        marginBottom: 64
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        marginLeft: 0,
        position: 'relative',
        marginRight: theme.spacing(2),
        width: '100%',
    },
    logout: {
        marginLeft: 80,

    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    console.log(props)
    const logOut = () => {
        props.logout();
    }

    const navigation = props.token ? (

        <Grid container spacing={3}>
            <Grid item xs={10}>
                <NavLink style={{ color: 'white' }} to="/home">
                    <Button color="inherit">Event</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/my_events">
                    <Button color="inherit">MyEvents</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/create">
                    <Button color="inherit">Create Event</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/search">
                    <Button color="inherit">Search</Button>
                </NavLink>
                {/* <SearchEvent className={classes.search} /> */}



            </Grid>



            <Grid item xs={2}>
                <NavLink style={{ color: 'white' }} to="/login">
                    <div className={classes.logout} style={{ color: 'white' }}>
                        <Button className={classes.logout} color="inherit" onClick={logOut}>Logout</Button>
                    </div>
                </NavLink>
            </Grid>
            {/* </Grid> */}

        </Grid >
    ) : (
            <>
                <NavLink style={{ color: 'white' }} to="/signup">
                    <Button color="inherit">Register</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/login">
                    <Button color="inherit">Login</Button>
                </NavLink>
            </>
        )


    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    {navigation}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUserId: state.authentication.currentUserId,
        token: state.authentication.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    NavBar
);