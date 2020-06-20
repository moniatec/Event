import { apiBaseUrl } from "../config";
const HOME_EVENTS = "EVENT/homeEvents/HOME_EVENTS";
const EVENT = "EVENT/homeEvents/EVENT";
const JOIN = "EVENT/homeEvents/JOIN";
const SET_EVENT = "EVENT/homeEvents/SET_EVENT";

export const sendJoin = (userId, eventId) => ({ type: JOIN, userId, eventId });
export const homeEvents = (list) => ({ type: HOME_EVENTS, list });
export const getEvent = (resEvent, resMember) => ({ type: EVENT, resEvent, resMember });
export const setEvent = (event) => ({ type: SET_EVENT, event });

export const getHomeEvents = () => async (dispatch, getState) => {
    const {
        authentication: { token },
    } = getState();

    const res = await fetch(`${apiBaseUrl}/events`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const list = await res.json();
        // console.log(list)
        dispatch(homeEvents(list.events))

    }
}

export const getOneEvent = (eventId) => async (dispatch, getState) => {
    const {
        authentication: { token },
    } = getState();

    const res = await fetch(`${apiBaseUrl}/events/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const res2 = await fetch(`${apiBaseUrl}/events/${eventId}/members`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res2)
    if (res.ok && res2.ok) {
        const resEvent = await res.json();
        const resMember = await res2.json();
        console.log(resEvent.event)
        dispatch(getEvent(resEvent, resMember))
        console.log(resEvent.event)
    }
}

export const sendJoinReq = (userId, eventId) => async dispatch => {
    const res = await fetch(`${apiBaseUrl}/events/${eventId}/join`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,

        })
    });
    console.log(userId)
    if (res.ok) {
        console.log(res)


        dispatch(sendJoin(userId, eventId));
    }
}

export const createEvent = (eventName, time, description, location, photoUrl, hostId) => async (dispatch) => {
    const res = await fetch(`${apiBaseUrl}/events`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, time, description, location, photoUrl, hostId }),
    });

    if (res.ok) {
        const { event } = await res.json();

        dispatch(setEvent(event));
    }
};

export default function reducer(state = { list: [] }, action) {
    switch (action.type) {
        case HOME_EVENTS: {
            return {
                ...state,
                list: action.list
            }
        }
        case EVENT: {

            // return {
            //     ...state,
            //     resEvent: action.resEvent,
            //     resMember: action.resMember
            // }
            const newState = Object.assign({}, state)
            newState.resEvent = {
                event: action.resEvent.event,
                members: action.resMember.members
            }
            return newState
        }
        case JOIN: {


            const newState = Object.assign({}, state)
            newState.resEvent = {
                ...state.resEvent,
                members: parseInt(action.userId)
            }
            return newState
        }
        case SET_EVENT: {
            return {
                ...state,
                list: [
                    ...state.list,
                    action.event
                ]

            };
        }
        default:
            return state;
    }
}