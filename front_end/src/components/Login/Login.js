import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {
    submitLogin(e) {
        e.preventDefault();
        alert("Sign in successfully!");
        // submit form
    }

    render() {
        return (
            <div className="offset-4 col-4 loginWrapper">
                <br/>
                <h2>Sign in to TechForum</h2>
                <br/>
                <br/>
                <form name="login" onSubmit={this.submitLogin}>
                    <label>UserName</label>&nbsp;
                    <input type="text" name="username" />
                    <br/>
                    <br/>
                    <label>Password</label>&nbsp;
                    <input type="text" name="password" />
                    <br/>
                    <br/>
                    <button className='btn btn-danger'>Sign in</button>
                </form>
                <br/>
                <div>
                    New to TechForum? <a href="javascript:void(0)" onClick={() => {}}>Create an account</a>
                </div>
            </div>
        );
    }

}