import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate, Link } from "react-router-dom";

import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    nameUser: "",
    gender: "",
    balance: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    //window.location.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, nameUser, gender, password, balance } = this.state;
    const userDetails = {
      username,
      name: nameUser,
      gender,
      password,
      balance,
    };
    const url = "https://roziroti-backend.vercel.app/register/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok === true) {
      window.location.replace("/login");
      window.location.reload();
    } else {
      this.onSubmitFailure(data.errorMsg);
    }
  };

  onChangeBalance = (event) => {
    this.setState({ balance: event.target.value });
  };

  renderPasswordField = () => {
    const { password, balance } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />

        <label className="input-label" htmlFor="balance">
          Balance
        </label>
        <input
          type="password"
          id="balance"
          className="password-input-field"
          value={balance}
          onChange={this.onChangeBalance}
        />
      </>
    );
  };

  onChangeName = (event) => {
    this.setState({ nameUser: event.target.value });
  };

  onChangeGender = (event) => {
    this.setState({ gender: event.target.value });
  };

  renderUsernameField = () => {
    const { username, nameUser, gender } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />

        <label className="input-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="username-input-field"
          value={nameUser}
          onChange={this.onChangeName}
        />

        <label className="input-label" htmlFor="gender">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          className="username-input-field"
          value={gender}
          onChange={this.onChangeGender}
        />
      </>
    );
  };

  render() {
    const {
      showSubmitError,
      errorMsg,
      username,
      nameUser,
      gender,
      password,
      balance,
    } = this.state;
    console.log(username, nameUser, gender, password, balance);
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            register
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <p>
            have a accout ?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
