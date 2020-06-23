const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
const SET_IMG = 'EVENT/upload/SET_IMG';


const setImgUrl = (previewImgUrl) => (
    {
        type: SET_IMG,
        previewImgUrl,
    }
);

// THUNKS
export const updateImg = (newImg) => async (dispatch) => {
    try {
        const data = new FormData();

        data.append('file', newImg);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const imgObj = await res.json()
        console.log(imgObj)
        dispatch(setImgUrl(imgObj.secure_url))
    } catch (err) {
        console.error(err);
    }
}






// REDUCER
export default function reducer(state = {}, action) {
    // Object.freeze(state);
    // const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_IMG: {
            return {
                ...state,
                previewImgUrl: action.previewImgUrl,
            }
        }
        default: return state;
    }
}