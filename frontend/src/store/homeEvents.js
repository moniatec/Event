import { apiBaseUrl } from "../config";
const HOME_EVENTS = "EVENT/homeEvents/HOME_EVENTS";
const EVENT = "EVENT/homeEvents/EVENT";

export const homeEvents = (list) => ({ type: HOME_EVENTS, list });
export const getEvent = (resEvent) => ({ type: EVENT, resEvent });
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
    // console.log(res)
    if (res.ok) {
        const resEvent = await res.json();
        // console.log(resEvent.event)
        dispatch(getEvent(resEvent))
        console.log(resEvent.event)
    }
}

export default function reducer(state = { list: [] }, action) {
    switch (action.type) {
        case HOME_EVENTS: {
            return {
                ...state,
                list: action.list
            }
        }
        case EVENT: {

            return {
                ...state,
                resEvent: action.resEvent
            }
        }
        default:
            return state;
    }
}