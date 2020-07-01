import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Input, InputLabel } from '@material-ui/core';
// import Image from './Image';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { updateImg } from '../store/image'
import '../index.css';
const { cloudinaryUrl, cloudinaryPreset, } = require("../config");

const useStyles = makeStyles((theme) => ({
    // container: {
    //   margin: 'auto',
    //   maxWidth: 500,
    //   maxHeight: 500,
    // },
    img: {
        maxWidth: 100,
        maxHeight: 100,
    },

    paper: {
        width: 240,
        height: 240,
        margin: 'auto',
        justifyContent: 'space-around',

    },

    imgUpload: {
        width: 240,
        height: 240,
    },




}));

const Upload = (props) => {
    const classes = useStyles();

    const [image, setImage] = useState("")

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', cloudinaryPreset);

        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
            method: "POST",
            body: data,
        })
        const file = await res.json()

        setImage(file.url)
        return (file.secure_url)

    }
    const handleNewImage = async (e) => {

        const url = await uploadImage(e);
        props.updatePhoto(url)



    }

    return (
        <Container className={classes.container}>
            <div className={classes.post} >
                <InputLabel htmlFor="image-upload" style={{
                    margin: '20px', marginBottom: '10px', marginLeft: '80px', marginTop: '50px', fontFamily: 'apple-system', color: '#111',
                    fontWeight: 'lighter',
                }} >Select Image</InputLabel>
                <Input id="image-upload" type="file" label="Image" style={{ display: 'none', width: '100px', margin: '20px', }} onChange={handleNewImage} className={classes.img} />
                {/* <Input type="file" name="file" placeholder="upload here" onChange={uploadImage} className={classes.img} /> */}
            </div>
            <Paper elevation={3} className={classes.paper} >
                {/* <div>Image Preview:</div> */}
                <img src={image} className={classes.imgUpload} />
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

        updateImg: (newImg) => dispatch(updateImg(newImg)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Upload
);