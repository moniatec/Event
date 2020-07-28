
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { logout } from "../store/authentication";
import '../index.css';
import "../css/nav.css";


const useStyles = makeStyles((theme) => ({
    root1: {
        flexGrow: 1,
        backgroundImage: theme.gradientBackground,
        marginBottom: 64,
        width: "100%",
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
        // marginLeft: 80,
        width: "min-content",
    }
}));

const NavBar = (props) => {
    const classes = useStyles();

    const toggleNav = () => {
        const navMenu = document.querySelector(".mobile-nav-overlay");

        if (navMenu.style.visibility === "hidden") {
            navMenu.style.visibility = "visible";
            navMenu.style.height = "20%";
        } else {
            navMenu.style.visibility = "hidden";
            navMenu.style.height = 0;
        }
    };

    const logOut = () => {

        const navMenu = document.querySelector(".mobile-nav-overlay");
        // if (navMenu.style.visibility === "visible") {
        //     toggleNav();
        // }
        props.logout();
    }

    const navigation = props.token ? (

        <Grid container spacing={3} id="navbar-items">
            <Grid item xs={10}>
                <NavLink style={{ color: 'white', }} to="/home">
                    <Button color="inherit">Event-App</Button>
                </NavLink>
                <NavLink style={{ color: 'white', marginLeft: '50px' }} to="/my_events">
                    <Button color="inherit">MyEvents</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/create">
                    <Button color="inherit">Host an Event</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/search">
                    <Button color="inherit">Search</Button>
                </NavLink>



            </Grid>



            <Grid item xs={2}>
                <NavLink style={{ color: 'white' }} to="/login">
                    <div className={classes.logout} style={{ color: 'white' }}>
                        <Button className={classes.logout} color="inherit" onClick={logOut}>Logout</Button>
                    </div>
                </NavLink>
            </Grid>


        </Grid >
    ) : (
            <>
                <NavLink style={{ color: 'white' }} to="/signup">
                    <Button color="inherit">Register</Button>
                </NavLink>
                <NavLink style={{ color: 'white' }} to="/login">
                    <Button color="inherit">Login</Button>
                </NavLink>

                <Link
                    style={{ color: 'white', marginRight: '20px', marginLeft: '1100px' }}
                    color="inherit"
                    href="https://github.com/moniatec"
                    target="_blank"
                >
                    CONTACT
                </Link>
                <Link style={{ color: 'white', marginRight: '20px' }} href="https://github.com/moniatec/Event" target="_blank">
                    ABOUT
                </Link>
            </>
        )


    const mobileNavigation = props.token ? (
        <div
            className="mobile-nav-overlay"
            style={{ height: "20%", visibility: "hidden" }}
        >
            <NavLink style={{ color: 'white', marginLeft: '50px' }} to="/my_events" onClick={toggleNav}>
                <Button color="inherit">MyEvents</Button>
            </NavLink>
            <NavLink style={{ color: 'white' }} to="/create" onClick={toggleNav}>
                <Button color="inherit">Host an Event</Button>
            </NavLink>
            <NavLink style={{ color: 'white' }} to="/search" onClick={toggleNav}>
                <Button color="inherit">Search</Button>
            </NavLink>
            <div className={classes.logout} style={{ color: "white" }}>
                <Button className={classes.logout} color="inherit" onClick={logOut}>
                    Logout
                </Button>
            </div>
        </div>
    ) : (
            <div
                className="mobile-nav-overlay"
                style={{
                    height: "20%",
                    visibility: "hidden"
                }}
            >

                <NavLink style={{ color: "white" }} to="/signup" onClick={toggleNav}>
                    <Button color="inherit">Register</Button>
                </NavLink>
                <NavLink style={{ color: "white" }} to="/login" onClick={toggleNav}>
                    <Button color="inherit">Login</Button>
                </NavLink>
                <Link
                    style={{ color: 'white' }}
                    color="inherit"
                    href="https://github.com/moniatec"
                    target="_blank"
                    onClick={toggleNav}

                >
                    CONTACT
                </Link>
                <Link style={{ color: 'white' }} href="https://github.com/moniatec/Event" target="_blank" onClick={toggleNav}>
                    ABOUT
                </Link>
            </div>
        );



    return (
        <div className={classes.root1}>
            <AppBar position="fixed" className={classes.root1}>
                <Toolbar
                // style={{ justifyContent: "center" }}
                >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" id="mobile-menu-icon">
                        {/* <MenuIcon onClick={toggleNav} /> */}
                    </IconButton>
                    <NavLink
                        style={{ color: "white" }}
                        to="/home"
                        className="mobile-home-btn"
                    >
                        <Button color="inherit">Event-App</Button>
                    </NavLink>
                    {navigation}
                </Toolbar>
            </AppBar>
            {/* {mobileNavigation} */}
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