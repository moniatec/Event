import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../store/authentication";
import Link from "@material-ui/core/Link";
import "../css/loginForm.css";
import '../index.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            authentication: null,
            currentUserId: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.register(
            this.state.username,
            this.state.email,
            this.state.password
        );
    }

    updateUserName = (e) => {
        this.setState({ username: e.target.value });
    };

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    render() {
        if (this.props.token) {
            return <Redirect to="/home" />;
        }
        return (
            <main className="centered middled">
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h1>Create Account</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="username">
                                <label htmlFor="username">UserName</label>
                                <input
                                    type="text"
                                    placeholder="Enter UserName"
                                    value={this.state.username}
                                    onChange={this.updateUserName}
                                />
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.updateEmail}
                                />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Passowrd"
                                    value={this.state.password}
                                    onChange={this.updatePassword}
                                />
                            </div>
                            <div className="createAccount">
                                <button type="submit">Create Account</button>
                                {this.props.errorMessage ?
                                    <h3 className="logError">Error: Something went wrong. Please try again.</h3>
                                    :
                                    <></>
                                }
                                <Link href="/login">
                                    <small>Already Have an Account?</small>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    if (state && state.authentication && state.authentication.error && state.authentication.error.register) {
        return {
            token: state.authentication.token,
            errorMessage: state.authentication.error.register,
        };
    } else {
        return {
            token: state.authentication.token,
            currentUserId: state.authentication.currentUserId,
        };
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userName, email, password) =>
            dispatch(register(userName, email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);