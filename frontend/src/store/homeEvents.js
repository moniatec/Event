import { apiBaseUrl } from "../config";
const HOME_EVENTS = "EVENT/homeEvents/HOME_EVENTS";
const EVENT = "EVENT/homeEvents/EVENT";
const JOIN = "EVENT/homeEvents/JOIN";
const SET_EVENT = "EVENT/homeEvents/SET_EVENT";
const DEL_EVENT = "EVENT/homeEvents/DEL_EVENT";
const UPDATE_EVENT = "EVENT/homeEvents/UPDATE_EVENT";

export const sendJoin = (userId, eventId) => ({ type: JOIN, userId, eventId });
export const homeEvents = (list) => ({ type: HOME_EVENTS, list });
export const getEvent = (resEvent, resMember) => ({ type: EVENT, resEvent, resMember });
export const setEvent = (event) => ({ type: SET_EVENT, event });
export const deleteEvent = (eventId) => ({ type: DEL_EVENT, eventId, });
export const updateEvent = (eventObj, eventId) => ({ type: UPDATE_EVENT, eventObj, eventId })

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

export const createEvent = (eventName, time, description, location, photoUrl) => async (dispatch, getState) => {
    // const currentUserId = window.localStorage.getItem(currentUserId);
    // const hostId = currentUserId
    const {
        authentication: { token, currentUserId },
    } = getState();
    const hostId = currentUserId
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

export const deleteEventReq = (eventId) => async (dispatch, getState) => {
    const {
        authentication: { token, currentUserId },
    } = getState();
    try {
        const res = await fetch(`${apiBaseUrl}/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        dispatch(deleteEvent(eventId));
        window.location.href = window.location.href;
        return
    } catch (err) {
        console.error(err)
    }
}

export const updateEventReq = (eventId, description, token) => async (dispatch) => {
    try {
        const body = JSON.stringify({ eventId, description, token })
        const res = await fetch(`${apiBaseUrl}/events/${eventId}`, {
            method: "PUT",
            body,
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const eventObj = await res.json();


        dispatch(updateEvent(eventObj, eventId));

        return
    } catch (err) {
        console.error(err);
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
        case UPDATE_EVENT: {
            // const newState = Object.assign({}, state);
            // newState.events[action.description] = action.eventObj;
            // return newState;
            return {
                ...state,
                event: action.eventObj,
            }
        }
        default:
            return state;
    }
}