import { apiBaseUrl } from "../config";
const TOKEN_KEY = "EVENT/authentication/token";
const SET_TOKEN = "EVENT/authentication/SET_TOKEN";
const REMOVE_TOKEN = "EVENT/authentication/REMOVE_TOKEN";
const MY_EVENTS = "EVENT/authentication/MY_EVENTS";
const ERROR_MESSAGE = "EVENT/authentication/ERROR_MESSAGE";

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = (token, currentUserId) => ({ type: SET_TOKEN, token, currentUserId });
export const getEvents = (list) => ({ type: MY_EVENTS, list });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const currentUserId = window.localStorage.getItem("currentUserId");
    if (token) {

        dispatch(setToken(token, currentUserId));
    }
};

export const errorMessage = (messageType, message) => ({
    type: ERROR_MESSAGE,
    messageType,
    message,
});

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
    } else if (res.status === 400) {
        const { message } = await res.json();
        const messageType = "register";
        dispatch(errorMessage(messageType, message));
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
    } else if (res.status === 401) {
        const { message } = await res.json();
        const messageType = "login";
        dispatch(errorMessage(messageType, message));
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

    const userId = window.localStorage.getItem("currentUserId");
    const res = await fetch(`${apiBaseUrl}/users/${userId}/events`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const list = await res.json();
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

        case ERROR_MESSAGE: {
            const newState = Object.assign({}, state);
            const { messageType, message } = action;
            newState["error"] = { [messageType]: message };
            return newState;
        }

        case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.token;
            delete newState.currentUserId;
            delete newState.list;
            delete newState.error;
            delete newState.list1;
            delete newState.list2;
            delete newState.resEvent;
            delete newState.event;
            return newState;
        }
        case MY_EVENTS: {
            return {
                ...state,
                list: action.list

            };
        }

        default:
            return state;
    }
}