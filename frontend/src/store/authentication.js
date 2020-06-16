import { apiBaseUrl } from "../config";

const TOKEN_KEY = "EVENT/authentication/token";
const SET_TOKEN = "EVENT/authentication/SET_TOKEN";
const REMOVE_TOKEN = "EVENT/authentication/REMOVE_TOKEN";

export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setToken = (token, currentUserId) => ({ type: SET_TOKEN, token, currentUserId });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
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
        dispatch(setToken(token));
    }
};

export const logout = () => async (dispatch, getState) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("currentUserId");
    dispatch(removeToken());
};

export default function reducer(state = {}, action) {
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

        default:
            return state;
    }
}