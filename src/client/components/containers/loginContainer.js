import React, { Component } from 'react';

class LoginContainer extends Component {

  render() {
    return (
      <div className="login-form">
        <form>
          <div className="avatar">
            <img src="/src/assets/img/avatar.png" alt="Avatar" />
          </div>
          <h2 className="text-center">Member Login</h2>
          <div className="form-group">
            <input type="text" className="form-control" name="username" placeholder="Username" required="required" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
          </div>
          <div className="clearfix">
            <a href="#" className="pull-right">Forgot Password?</a>
          </div>
        </form>
        <p className="text-center small">Don't have an account? <a href="/register">Sign up here!</a></p>
      </div>
    );
  }
}

export default LoginContainer;
