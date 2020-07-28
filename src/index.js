import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { persistStore, persistReducer } from "redux-persist";
import { persistGate, PersistGate } from "redux-persist/integration/react";
// const preloadedState = {
//   authentication: {
//     token: localStorage.getItem("TOKEN_KEY"),
//     currentUserId: localStorage.getItem("currentUserId"),
//   },
// }
//   image: {
//     previewImgUrl:
//       "https://res.cloudinary.com/dri7mslsq/image/upload/v1592448181/post_r2bonf.jpg",
//   },
// };

const store = configureStore();
let persistor = persistStore(store)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
