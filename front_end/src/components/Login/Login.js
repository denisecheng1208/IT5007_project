import React, { Component } from 'react'
import './Login.css'
import cookie from 'react-cookies'

export default class Login extends Component {
    submitLogin(e) {
        e.preventDefault();

        async function checkPassword(user) {
            var jsonData = {};
            jsonData.query = `query myQuery($name: String!, $pw: String!){
                checkPassword(name: $name, pwInput: $pw)
              }`;
            jsonData.variables = {
                name: user.username,
                pw: user.password
            };
            return await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(jsonData),
            }).catch(error => {
                window.alert(error)
                return
            });
        }

        let username = document.forms.login.username.value.replace(/(^\s*)|(\s*$)/g, "");
        let password = document.forms.login.password.value;

        if (!username || username === "") 
            alert("Please input a username!");

        else {
            var user = {username: username, password: password};
            var response = checkPassword(user);

            response.then(result => {
                return result.json()
            }).then(result => {
                if (result.data.checkPassword) {
                    document.forms.login.username.value = "";
                    document.forms.login.password.value = "";

                    alert("Login successfully!");
                    cookie.save('username', user.username, { path: '/' });
                    // route to welcome page
                    window.location.href = '/';
                    // hide sign in/signup display log out 
                    // **********************
                } else {
                    alert("Username or Password is not correct!");
                }
            });
        }

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
                    New to TechForum? <a href='/signup'>Create an account</a>
                </div>
            </div>
        );
    }

}