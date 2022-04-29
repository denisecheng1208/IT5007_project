import React, { Component } from 'react'
import './AccountInfo.css'
import { PersonLinesFill, ListStars, FileEarmarkText, Phone, Envelope } from 'react-bootstrap-icons'
import { Routes, Route } from "react-router-dom";
import cookie from 'react-cookies'

export default class AccountInfo extends Component {
    state = {
        username: "Tom and Jerry",
        email: "TechForum@gmail.com",
        phone: "82884033",
        blogs: [{ title: "Coding with C++", time: "2012-12-05" },
        { title: "Coding with Java", time: "2022-03-15" },
        { title: "Coding with Node.js", time: "2019-07-28" },
        { title: "I Know Why The Caged Bird Sings", time: "2015-08-31" },
        { title: "Life and Death Are Wearing Me Out: A Novel", time: "1998-03-15" },],

        phoneChange: false,
        emailChange: false,
        passwordChange: false,
    }

    componentDidMount = () => {
        this.loadData()
    }

    loadData = () => {
        async function findUserByUsername(username) {
            var jsonData = {}
            jsonData.query = `query FindUserByUsername($username: String!){
                findUserByUsername(username: $username){
                    username
                    password
                    email
                    phone
                    blogs{
                        id
                        title
                        publishDate
                    }
                }
            }`
            jsonData.variables = {
                username: username,
            }
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
            })
        }

        async function findBlogs(username) {
            var jsonData = {}
            jsonData.query = `query FindAllBlogsByUserName($username: String!){
                findAllBlogsByUserName(username: $username){
                    title
                    id
                    publishDate
                }
            }`
            jsonData.variables = {
                username: username,
            }
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
            })
        }

        var response = findUserByUsername(cookie.load("username"))

        response.then(result => {
            if (result.ok) {
                return result.json()
            } else {
                alert("Error!")
                return null
            }
        }).then(result => {
            var dbResult = result.data.findUserByUsername
            this.setState({
                blogs: dbResult.blogs,
                username: dbResult.username,
                phone: dbResult.phone,
                email: dbResult.email,
            })
        }).then(result => {
            var responseBlogs = findBlogs(cookie.load("username"))

            responseBlogs.then(result => {
                if (result.ok) {
                    return result.json()
                } else {
                    alert("Error!")
                    return null;
                }
            }).then(result => {
                this.setState({ blogs: result.data.findAllBlogsByUserName })
            })
        })
    }

    onChangePassword = () => {
        if (this.state.passwordChange) {
            //define a query function
            async function updatePassword(username, password) {
                var jsonData = {}
                jsonData.query = `mutation UpdatePassword($username: String!, $newPassword: String!){
                    updatePassword(username: $username, newPassword: $newPassword)
                }`
                jsonData.variables = {
                    username: username,
                    newPassword: password,
                }
                return await fetch("http://localhost:5000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                }).catch(error => {
                    window.alert(error)
                    return
                })
            }

            if (this.state.newPassword != this.state.newPasswordRepeat) {
                console.log(this.state.newPassword)
                console.log(this.state.newPasswordRepeat)
                alert("Input doesn't match!")
                return
            }

            var response = updatePassword(this.state.username, this.state.newPassword)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
                    cookie.remove("username")
                    window.location.href = "http://localhost:3000/"
                } else {
                    alert("Error!")
                }
            })
        }
        // if phoneChange = false, then setState to true to display text area
        else {
            this.setState({ passwordChange: true })
        }
    }

    onPhoneChange = () => {
        if (this.state.phoneChange) {

            //define a query function
            async function updatePhone(user) {
                var jsonData = {}
                jsonData.query = `mutation UpdatePhone($username: String!, $newPhone: String!){
                    updatePhone(username: $username, newPhone: $newPhone)
                }`
                jsonData.variables = {
                    username: user.username,
                    newPhone: user.phone,
                }
                return await fetch("http://localhost:5000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                }).catch(error => {
                    window.alert(error)
                    return
                })
            }

            var user = {
                username: this.state.username,
                phone: this.state.phone,
                email: this.state.email,
            }

            var response = updatePhone(user)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
                    window.location.reload()
                } else {
                    alert("Error!")
                }
            })
        }
        // if phoneChange = false, then setState to true to display text area
        else {
            this.setState({ phoneChange: true })
        }
    }

    onEmailChange = () => {
        if (this.state.emailChange) {

            //define a query function
            async function updateEmail(user) {
                var jsonData = {}
                jsonData.query = `mutation UpdateEmail($username: String!, $newEmail: String!){
                    updateEmail(username: $username, newEmail: $newEmail)
                }`
                jsonData.variables = {
                    username: user.username,
                    newEmail: user.email,
                }
                return await fetch("http://localhost:5000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                }).catch(error => {
                    window.alert(error)
                    return
                })
            }

            var user = {
                username: this.state.username,
                phone: this.state.phone,
                email: this.state.email,
            }
            console.log(this.state.email)
            var response = updateEmail(user)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
                    window.location.reload()
                } else {
                    alert("Error!")
                }
            })
        }
        // if emailChange = false, then setState to true to display text area
        else {
            this.setState({ emailChange: true })
        }
    }


    render() {
        return (
            <div className="row wrapper">
                <div className='profile row offset-3 col-6'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<PersonLinesFill />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Profile
                    </div>

                    <ul className="col-10 offset-1 userInfo">
                        <li className="firstRow row">
                            <div className="imgWrapper col-3">
                                <img src="https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/eaf81a4c510fd9f9313a02ef232dd42a2834a403.jpg"></img>
                            </div>
                            <div className="username col-4">
                                Username: <span>{this.state.username}</span>
                            </div>
                            <div className="col-4 password">
                                <button className="btn changePassword" onClick={this.onChangePassword}> {this.state.passwordChange ? "Submit" : "Change Password"} </button>
                                &nbsp;&nbsp;&nbsp;
                                {this.state.passwordChange ? <button className="btn btnCancle" onClick={() => this.setState({ passwordChange: false })}>Cancel</button> : null}
                            </div>
                            {
                                this.state.passwordChange ?
                                    <div>
                                        <div className='"col-12 passwordInput'>
                                            <input onChange={(event) => this.setState({ newPassword: event.target.value })} placeholder="new password" />
                                        </div>
                                        &nbsp;
                                        <div className='"col-12 passwordInput'>
                                            <input onChange={(event) => this.setState({ newPasswordRepeat: event.target.value })} placeholder="retype password" />
                                        </div>
                                    </div>
                                    : null
                            }

                        </li>

                        <li className="secondRow row">
                            <div className="phone col-12">
                                {
                                    this.state.phoneChange ?
                                        <input type="text" defaultValue={this.state.phone} onChange={(event) => this.setState({
                                            phone: event.target.value,
                                        })} /> :
                                        <span><Phone />&nbsp;&nbsp;&nbsp;<span>{this.state.phone}</span>&nbsp;&nbsp;&nbsp;</span>
                                }&nbsp;&nbsp;&nbsp;
                                <button className='btn' onClick={this.onPhoneChange}>{this.state.phoneChange ? "Submit" : "Change"}</button>
                                &nbsp;&nbsp;&nbsp;
                                {
                                    this.state.phoneChange ? <button className="btn canclePhone" onClick={() => this.setState({ phoneChange: false })}>Cancel</button> : null
                                }
                            </div>
                            <div className="email col-12">
                                {
                                    this.state.emailChange ?
                                        <input type="text" defaultValue={this.state.email} onChange={(event) => this.setState({
                                            email: event.target.value,
                                        })} /> :
                                        <span>
                                            <Envelope />&nbsp;&nbsp;&nbsp;<span>{this.state.email}</span>&nbsp;&nbsp;&nbsp;
                                        </span>
                                }&nbsp;&nbsp;&nbsp;
                                <button className='btn' onClick={this.onEmailChange}>{this.state.emailChange ? "Submit" : "Change"}</button>
                                &nbsp;&nbsp;&nbsp;
                                {
                                    this.state.emailChange ? <button className="btn cancleEmail" onClick={() => this.setState({ emailChange: false })}>Cancel</button> : null
                                }
                            </div>
                        </li>

                    </ul>
                </div>

                <div className='row offset-3 col-6 blogs'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Blogs
                    </div>

                    <ul className="col-10 offset-1 blogList">
                        {
                            this.state.blogs.map((cur, idx) => {
                                return (<li key={idx} className="blog row">
                                    <FileEarmarkText className='col-1' />
                                    <div className="col-8">
                                        {cur.title}
                                    </div>
                                    <div className="col-3">
                                        {cur.publishDate}
                                    </div>
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
