import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import mutation from "../../mutations";
import { auth } from "../../utils";
import Error from "../Error";

const initialData = {
  username: "",
  password: ""
};

export class SignIn extends Component {
  state = {
    formData: initialData
  };

  _validateForm = () => {
    const {
      formData: { username, password }
    } = this.state;

    const isValid = !username || !password;

    return isValid;
  };

  _onChange = ({ target: { name, value } }) =>
    this.setState({ formData: { ...this.state.formData, [name]: value } });

  _onSubmit = signIn => async event => {
    event.preventDefault();

    const {
      data: {
        signIn: { token }
      }
    } = await signIn({ variables: { input: this.state.formData } });

    if (token) {
      // save token to localstorge
      auth.setItemToken(token);

      // Refetch the current User
      await this.props.refetch();

      this.setState({ formData: initialData });

      // redirect to homepage
      this.props.history.push("/");
    }
  };

  _renderForm = (signIn, { data, loading, error }) => {
    const { formData } = this.state;

    return (
      <div className="row">
        <form
          className="col s12 m6 offset-m3"
          onSubmit={this._onSubmit(signIn)}
        >
          <h1 className="center-align">Sign In</h1>
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
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={this._onChange}
              />
              <label htmlFor="password">Password</label>
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
        <Mutation mutation={mutation.user.SIGNIN_USER}>
          {this._renderForm}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignIn);
