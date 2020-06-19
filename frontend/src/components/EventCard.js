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
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const EventCard = (props) => {
    const classes = useStyles();
    console.log(props)
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={props.event.photoUrl}
                    title="Contemplative Reptile"
                />
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
            </CardActionArea>
            <CardActions>

                {/* <Button size="small" color="primary">
                    Join
                </Button> */}
                <JoinBtn eventId={props.event.id} />

                <NavLink style={{ color: 'white' }} to={`/events/${props.event.id}`}>
                    <Button size="small" color="primary">
                        Learn More
                </Button>
                </NavLink>
            </CardActions>
        </Card >
    );
}

export default EventCard;