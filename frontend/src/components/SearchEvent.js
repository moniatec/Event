import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { searchEvent } from '../store/homeEvents'
import EventCard from "./EventCard";
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const SearchEvent = (props) => {
    const classes = useStyles();
    console.log(props)
    // const [event, setEvent] = useState('')


    const handleSearch = (e) => {
        const eventSearch = e.target.value;
        console.log(eventSearch)
        console.log(props)
        props.searchEvent(eventSearch);
        // setEvent(e.target.value)
        console.log(eventSearch)

    }
    // React.useEffect(() => {
    //     // const eventSearch = e.target.value;
    //     props.searchEvent();

    // }, [])

    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                />
            </div>
            {props.events ?
                <div className={classes.root}>
                    < Grid
                        container
                        spacing={10}
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                    >
                        {
                            props.events.map((event) => (
                                <Grid item spacing={3}>
                                    <EventCard
                                        key={event.id}
                                        event={event}

                                    />

                                </Grid>
                            ))
                        }
                    </Grid >
                </div>
                :
                <div>loading</div>
            }










        </>

    );

}

const mapStateToProps = state => {
    console.log(state)

    return {
        token: state.authentication.token,
        currentUserId: state.authentication.currentUserId,
        events: state.homeEvents.list1,


    }
};

const mapDispatchToProps = dispatch => {
    return {

        searchEvent: (...args) => dispatch(searchEvent(...args)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    SearchEvent
);