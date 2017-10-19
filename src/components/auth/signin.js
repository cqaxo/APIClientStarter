/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {
  onSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signInUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <label htmlFor="email">Email</label>
        <Field name="email" className="form-group form-control" component="input" />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          className="form-group form-control"
          component="input"
          type="password"
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function validate(values) {
  // Console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = 'Enter an email';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'SignInForm',
})(connect(mapStateToProps, actions)(SignIn));
