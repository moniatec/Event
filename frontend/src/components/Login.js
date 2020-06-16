import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../store/authentication";
import "../css/loginForm.css";
import Link from "@material-ui/core/Link";
// import Home from "./Home";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "user",
            email: "user@user.com",
            password: "123",
            authentication: null,
            currentUserId: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
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
                        <h1>Log In</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="username">
                                <label htmlFor="username">UserName</label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.updateUserName}
                                />
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.updateEmail}
                                />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Passowrd"
                                    value={this.state.password}
                                    onChange={this.updatePassword}
                                />
                            </div>
                            <div className="logIn">
                                <button type="submit">Log In</button>
                                <Link href="/signup">
                                    <small>Create An Acount</small>
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
    return {
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);