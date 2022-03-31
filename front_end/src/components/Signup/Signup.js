import React, { Component } from 'react'
import './Signup.css'

export default class Signup extends Component {
    submitSignup(e) {
        e.preventDefault();
        alert("Sign up");

        let username = document.forms.signup.username.value.replace(/(^\s*)|(\s*$)/g, "");
        let password = document.forms.signup.password.value.replace(/(^\s*)|(\s*$)/g, "");
        let password2 = document.forms.signup.password2.value.replace(/(^\s*)|(\s*$)/g, "");

        if (!username || username === "")
            alert("Please input a username!");
        else if (!password || password === "")
            alert("Please input a valid password!");
        else if (password !== password2)
            alert("The two password inputs are different!");
        // submit form
    }

    render() {
        return (
            <div className="offset-4 col-4 signupWrapper">
                <br/>
                <h2>Sign up for new TechForum Account</h2>
                <br/>
                <br/>
                <form name="signup" onSubmit={this.submitSignup}>
                    <label>UserName</label>&nbsp;
                    <input type="text" name="username" />
                    <br/>
                    <br/>
                    <label>Password</label>&nbsp;
                    <input type="text" name="password" />
                    <br/>
                    <br/>
                    <label>Confirm Your Password</label>&nbsp;
                    <input type="text" name="password2" />
                    <br/>
                    <br/>
                    <label>Email</label>&nbsp;
                    <input type="text" name="email" />
                    <br/>
                    <br/>
                    <label>Phone</label>&nbsp;
                    <input type="text" name="phone" />
                    <br/>
                    <br/>
                    <button className='btn btn-danger'>Sign up</button>
                </form>
                <br/>
                <div>
                    Already have an account? <a href="javascript:void(0)" onClick={() => {}}>Sign in</a>
                </div>
            </div>
        );
    }

}