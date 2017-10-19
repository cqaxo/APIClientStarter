/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
  onSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signUpUser(formProps);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor={field.input.name}>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
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
        <Field name="email" label="Email" component={this.renderField} type="user" />
        <Field name="password" label="Password" component={this.renderField} type="password" />
        <Field
          name="passwordConfirm"
          label="Confirm Password"
          component={this.renderField}
          type="password"
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email address';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
    errors.passwordConfirm = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(connect(mapStateToProps, actions)(SignUp));
