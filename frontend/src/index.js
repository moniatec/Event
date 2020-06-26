import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// const preloadedState = {
//   user: {
//     token: localStorage.getItem("TOKEN_KEY"),
//     currentUserId: localStorage.getItem("currentUserId"),
//   },
//   image: {
//     previewImgUrl:
//       "https://res.cloudinary.com/dri7mslsq/image/upload/v1592448181/post_r2bonf.jpg",
//   },
// };

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
