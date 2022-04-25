import React, { Component } from 'react'
import './Signup.css'

export default class Signup extends Component {
    submitSignup(e) {
        e.preventDefault();

        async function addUser(user) {
            var jsonData = {};
            jsonData.query = `mutation AddUser($name: String!, $pw: String!, $phone: String!, $email: String!){
                    addUser(username: $name, password: $pw, phone: $phone, email: $email)
                }`;
            jsonData.variables = {
                name: user.username,
                pw: user.password,
                phone: user.phone,
                email: user.email
            };
            return await fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            }).catch(error => {
                window.alert(error)
                return
            });
        }

        let username = document.forms.signup.username.value.replace(/(^\s*)|(\s*$)/g, "");
        let password = document.forms.signup.password.value.replace(/(^\s*)|(\s*$)/g, "");
        let password2 = document.forms.signup.password2.value.replace(/(^\s*)|(\s*$)/g, "");
        let phone = document.forms.signup.phone.value.replace(/(^\s*)|(\s*$)/g, "");
        let email = document.forms.signup.email.value.replace(/(^\s*)|(\s*$)/g, "");

        var phonePatt = /^[0-9]+$/;
        var emailPatt = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

        if (!username || username === "") 
            alert("Please input a username!"); //*************************** uid
        else if (!password || password === "")
            alert("Please input a valid password!");
        else if (password !== password2)
            alert("The two password inputs are different!");
        else if (!phonePatt.test(phone))
            alert("Invalid Phone!");
        else if (!emailPatt.test(email))
            alert("Invalid Email!");
        else { // submit form
            var user = {username: username, password: password, phone: phone, email: email};
            var response = addUser(user);

            response.then(result => {
                if (result.ok) {
                    document.forms.signup.username.value = "";
                    document.forms.signup.password.value = "";
                    document.forms.signup.password2.value = "";
                    document.forms.signup.phone.value = "";
                    document.forms.signup.email.value = "";

                    alert("Sign up successfully!");
                    //route to welcome page and hide sign in (log in automatically)**************************
                } else {
                    console.log("error!")
                }
            });
        }
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
                    Already have an account? <a href='/login'>Sign in</a>
                </div>
            </div>
        );
    }

}