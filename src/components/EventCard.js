import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { NavLink } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import JoinBtn from './JoinBtn'
import JoinBtnModal from './JoinBtnModal'
import '../index.css';
const useStyles = makeStyles({
    card: {
        width: 400,
        height: 550
    },
    actions: {
        height: 350,
        // height: 500,
        marginBottom: 150
    }
});

const EventCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <div className={classes.actions}>

                    <NavLink style={{ color: 'white' }} to={`/events/${props.event.id}`} eventsJoin={props.eventsJoin}>
                        <CardMedia
                            component="img"
                            alt={props.event.eventName}
                            height="280"
                            maxWidth="100%"
                            image={props.event.photoUrl}
                            title={props.event.eventName}
                            style={{ objectFit: 'contain' }}
                        >
                        </CardMedia>
                    </NavLink>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.event.eventName}
                        </Typography>
                        <Typography gutterBottom component="h4">
                            {props.event.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.event.description}
                        </Typography>
                    </CardContent>
                </div>
                <CardActions  >

                    {/* <JoinBtn
                        eventId={props.event.id}
                        eventsJoin={props.eventsJoin}
                    /> */}
                    <JoinBtnModal
                        eventId={props.event.id}
                        eventsJoin={props.eventsJoin}
                    />

                    <NavLink style={{ color: 'white' }} to={`/events/${props.event.id}`} >
                        <Button size="small" color="primary" eventsJoin={props.eventsJoin}>
                            Learn More
                </Button>
                    </NavLink>
                </CardActions>
            </CardActionArea>
        </Card >
    );
}

export default EventCard;