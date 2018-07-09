import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './../../actions/userActions';

class RegisterContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullname: '',
                username: '',
                password: ''
            }
        };

        this.userSubmit = this.userSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * handle change event
     */
    handleChange(event){
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(this.state.user);
    }

    /**
     * user register
     */
    userSubmit() {
        const { user } = this.state;
        if (user.fullname && user.username && user.password) {
            this.props.actionHandler(userActions.userRegister(user));
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div className="login-form">
                <form name="register">
                    <div className="avatar">
                        <img src="/src/assets/img/avatar.png" alt="Avatar" />
                    </div>
                    <h2 className="text-center">Member Registeration</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" name="fullname" placeholder="Fullname" value={user.fullname} onChange={this.handleChange} required="required" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Username" value={user.username} onChange={this.handleChange} required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" value={user.password} onChange={this.handleChange} required="required" />
                    </div>
                    <div className="form-group">
                        <button type="button"  onClick={this.userSubmit} className="btn btn-primary btn-lg btn-block">Sign up</button>
                    </div>
                </form>
                <p className="text-center small">I have an account? <a href="/login">Sign in here!</a></p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {

    return {
        actionHandler(action) {
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
