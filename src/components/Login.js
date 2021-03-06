import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../store/authentication";
import "../css/loginForm.css";
import Link from "@material-ui/core/Link";
import '../index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Demo User",
            email: "demoUser@demo.com",
            password: "123",
            authentication: null,
            currentUserId: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password, this.state.username);
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
                                <button type="submit" >Log In</button>
                                {this.props.errorMessage ?
                                    <h3 className="logError">Error: Invalid login credentials</h3>
                                    :
                                    <></>
                                }
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
    if (state && state.authentication && state.authentication.error && state.authentication.error.login) {
        return {
            token: state.authentication.token,
            errorMessage: state.authentication.error.login,
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
        login: (email, password, username) => dispatch(login(email, password, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);