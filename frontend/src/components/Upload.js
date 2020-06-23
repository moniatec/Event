import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';
// import Image from './Image';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { updateImg } from '../store/image'
import '../index.css';
const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

const useStyles = makeStyles((theme) => ({
    // container: {
    //   margin: 'auto',
    //   maxWidth: 500,
    //   maxHeight: 500,
    // },
    img: {
        maxWidth: 200,
        maxHeight: 200,
    },

    paper: {
        width: 500,
        height: 500,
        margin: 'auto',
        justifyContent: 'space-around',

    },




}));

const Upload = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    console.log(props)
    const updateValue = cb => e => cb(e.target.value);
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', cloudinaryPreset);
        setLoading(true)
        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
            method: "POST",
            body: data,
        })
        const file = await res.json()
        console.log(file)
        setImage(file.url)
        return (file.secure_url)
        setLoading(false)
    }
    const handleNewImage = async (e) => {
        const newImg = e.target.files[0];
        // props.updateImg(newImg);
        const url = await uploadImage(e);
        props.updatePhoto(url)
        setLoading(true)


    }

    console.log(props)

    return (
        <Container className={classes.container}>
            <div className={classes.post} >
                <InputLabel htmlFor="image-upload" style={{ margin: '20px' }} >Select Image</InputLabel>
                <Input id="image-upload" type="file" label="Image" style={{ display: 'none', width: '200px', margin: '20px' }} onChange={handleNewImage} className={classes.img} />
                {/* <Input type="file" name="file" placeholder="upload here" onChange={uploadImage} className={classes.img} /> */}
            </div>
            <Paper elevation={3} className={classes.paper} >
                {/* <div>Image Preview:</div> */}
                <img src={image} alt='preview' className={"imgUpload"} />
            </Paper>

        </Container>
    )
}

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        previewImgUrl: state.image.previewImgUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // post: (...args) => dispatch(post(...args)),
        updateImg: (newImg) => dispatch(updateImg(newImg)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Upload
);