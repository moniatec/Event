import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./authentication";
import homeEvents from "./homeEvents"
import image from "./image"

const persistConfig = {
    key: "root",
    storage,
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authentication,
    homeEvents,
    image
});

const persistedReducer = persistReducer(persistConfig, reducer)

const configureStore = (initialState) => {
    return createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
};

export default configureStore;