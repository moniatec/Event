import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../store/authentication";
import Button from "@material-ui/core/Button";

const LogoutBtn = (props) =>
    props.loggedOut ? (
        <Redirect to="/" />
    ) : (
            <div id="logout-button-holder">
                <Button color="inherit" onClick={props.logout}>
                    LogOut
                </Button>
            </div>
        );
const mapStateToProps = (state) => {
    return {
        loggedOut: !state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);