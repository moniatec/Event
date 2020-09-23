
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
    root: {
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
        // <div className={classes.root}></div>
        <div id="navbar-items">
            < Grid
                container
                spacing={10}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item spacing={3}>
                    <Link style={{ color: 'white', }} href="/home">
                        <Button color="inherit">Event-App</Button>
                    </Link>
                </Grid>
                <Grid item spacing={3}>
                    <Link style={{ color: 'white' }} href="/my_events">
                        <Button color="inherit">MyEvents</Button>
                    </Link>
                </Grid>
                <Grid item spacing={3}>
                    <Link style={{ color: 'white' }} href="/create">
                        <Button color="inherit">Host an Event</Button>
                    </Link>
                </Grid>
                <Grid item spacing={3}>
                    <Link style={{ color: 'white' }} href="/search">
                        <Button color="inherit">Search</Button>
                    </Link>
                </Grid>



                <Grid item xs={2}>
                    <Link style={{ color: 'white' }} href="/login">
                        <div className={classes.logout} style={{ color: 'white' }}>
                            <Button className={classes.logout} color="inherit" onClick={logOut}>Logout</Button>
                        </div>
                    </Link>
                </Grid>
            </Grid>

        </div >
    ) : (
            <div id="navbar-items2">
                {/* <Grid container spacing={3} > */}
                < Grid
                    container
                    spacing={10}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item spacing={3} >
                        <Link style={{ color: 'white', }} href="/">
                            <Button color="inherit">Event-App</Button>
                        </Link>
                    </Grid>
                    <Grid item spacing={3} >
                        <Link style={{ color: 'white' }} href="/signup">
                            <Button color="inherit">
                                Register
                        </Button>
                        </Link>
                    </Grid>
                    <Grid item spacing={3}>
                        <Link style={{ color: 'white' }} href="/login">
                            <Button color="inherit">
                                Login
                        </Button>
                        </Link>

                    </Grid>
                    <Grid item spacing={3}>

                        <Link
                            style={{ color: 'white' }}
                            color="inherit"
                            href="https://github.com/moniatec"
                            target="_blank"
                        >
                            <Button color="inherit">
                                CONTACT
                    </Button>
                        </Link>
                    </Grid>
                    <Grid item spacing={3}>
                        <Link style={{ color: 'white' }} href="https://github.com/moniatec/Event" target="_blank">
                            <Button color="inherit">
                                ABOUT
                    </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )


    const mobileNavigation = props.token ? (
        <div
            className="mobile-nav-overlay"
            style={{ height: "20%", visibility: "hidden" }}
        >
            <Link style={{ color: 'white', marginLeft: '50px' }} href="/my_events" onClick={toggleNav}>
                <Button color="inherit">MyEvents</Button>
            </Link>
            <Link style={{ color: 'white' }} href="/create" onClick={toggleNav}>
                <Button color="inherit">Host an Event</Button>
            </Link>
            <Link style={{ color: 'white' }} href="/search" onClick={toggleNav}>
                <Button color="inherit">Search</Button>
            </Link>
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

                <Link style={{ color: "white" }} href="/signup" onClick={toggleNav}>
                    <Button color="inherit">Register</Button>
                </Link>
                <Link style={{ color: "white" }} href="/login" onClick={toggleNav}>
                    <Button color="inherit">Login</Button>
                </Link>
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
        <div>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar style={{ justifyContent: "center" }}
                >
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" id="mobile-menu-icon">

                    </IconButton>

                    <Link
                        style={{ color: "white", marginLeft: '50px' }}
                        href="/home"
                        className="mobile-home-btn"
                    >
                        <Button color="inherit">Event-App</Button>
                    </Link>

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