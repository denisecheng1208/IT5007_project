import React, { Component } from 'react'

export default class Login extends Component {
    submitLogin(e) {
        e.preventDefault();
        alert("Sign in successfully!");
        // submit form
    }

    render() {
        return (
            <div className="offset-1 col-10">
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
                    <button>Sign in</button>
                </form>
                <br/>
                <div>
                    New to TechForum? <a href="javascript:void(0)" onClick={() => {}}>Create an account</a>
                </div>
            </div>
        );
    }

}