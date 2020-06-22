import { apiBaseUrl } from "../config";
import { getOneEvent } from './homeEvents'
const TOKEN_KEY = "EVENT/authentication/token";
const SET_TOKEN = "EVENT/authentication/SET_TOKEN";
const REMOVE_TOKEN = "EVENT/authentication/REMOVE_TOKEN";
const MY_EVENTS = "EVENT/authentication/MY_EVENTS";

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = (token, currentUserId) => ({ type: SET_TOKEN, token, currentUserId });
export const getEvents = (list) => ({ type: MY_EVENTS, list });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
        // const currentUserId = window.localStorage.getItem(currentUserId);
        dispatch(setToken(token));
    }
};

export const register = (username, email, password) => async (dispatch) => {
    const res = await fetch(`${apiBaseUrl}/users`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
        const { token, currentUserId } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem("currentUserId", currentUserId);
        dispatch(setToken(token, currentUserId));
    }
};

export const login = (email, password) => async (dispatch) => {
    const res = await fetch(`${apiBaseUrl}/users/token`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const { token, currentUserId } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem("currentUserId", currentUserId);
        dispatch(setToken(token, currentUserId));
    }
};

export const logout = () => async (dispatch, getState) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("currentUserId");
    dispatch(removeToken());
};

export const getMyEvents = () => async (dispatch, getState) => {
    const {
        authentication: { token, currentUserId },
    } = getState();
    // const userId = currentUserId
    const userId = window.localStorage.getItem("currentUserId");
    const res = await fetch(`${apiBaseUrl}/users/${userId}/events`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const list = await res.json();
        // console.log(list.events)
        // const eventId = Object.values(list.events[0])
        // console.log(Object.values(list.events[0]))
        // dispatch(getOneEvent(eventId))
        dispatch(getEvents(list.events));

    }

}

export default function reducer(state = { list: [] }, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
                currentUserId: action.currentUserId,
            };
        }

        case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.token;
            return newState;
        }
        case MY_EVENTS: {
            return {
                ...state,
                // events: [
                //     ...state.events,
                //     action.events
                // ]
                list: action.list

            };
            // const newState = { ...state };
            // delete newState.token;
            // return newState;
        }

        default:
            return state;
    }
}