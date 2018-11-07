import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import mutation from "../../mutations";
import { auth } from "../../utils";
import Error from "../Error";

const initialData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export class SignUp extends Component {
  state = {
    formData: initialData
  };

  _validateForm = () => {
    const {
      formData: { username, email, password, confirmPassword }
    } = this.state;
    const isValid =
      !username || !email || !password || password !== confirmPassword;

    return isValid;
  };

  _onChange = ({ target: { name, value } }) =>
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });

  _onSubmit = signUp => async event => {
    event.preventDefault();

    const {
      data: {
        signUp: { token }
      }
    } = await signUp({ variables: { input: this.state.formData } });

    if (token) {
      // save token to locastorage
      auth.setItemToken(token);

      this.setState({ formData: initialData });

      // Refetch the current User
      await this.props.refetch();

      // Redirect to homepage
      this.props.history.push("/");
    }
  };

  _renderForm = (signUp, { data, loading, error }) => {
    const { formData } = this.state;

    return (
      <div className="row">
        <form
          className="col s12 m6 offset-m3"
          onSubmit={this._onSubmit(signUp)}
        >
          <h1 className="center-align">Sign Up</h1>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={this._onChange}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={this._onChange}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={this._onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={this._onChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            {error && <Error error={error} />}
            <div className="input-field col s12">
              <button
                type="submit"
                disabled={loading || this._validateForm()}
                className="btn waves-effect waves-light right"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <Mutation mutation={mutation.user.SIGNUP_USER}>
          {this._renderForm}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignUp);
