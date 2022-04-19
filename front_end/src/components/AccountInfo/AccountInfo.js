import React, { Component } from 'react'
import './AccountInfo.css'
import { PersonLinesFill, ListStars, FileEarmarkText, Phone, Envelope } from 'react-bootstrap-icons'
import { Routes, Route } from "react-router-dom";
export default class AccountInfo extends Component {
    state = {
        blogs: [{ title: "Coding with C++", time: "2012-12-05" },
        { title: "Coding with Java", time: "2022-03-15" },
        { title: "Coding with Node.js", time: "2019-07-28" },
        { title: "I Know Why The Caged Bird Sings", time: "2015-08-31" },
        { title: "Life and Death Are Wearing Me Out: A Novel", time: "1998-03-15" },],

        user: {
            id: "test",
            username: "Tom and Jerry",
            email: "TechForum@gmail.com",
            phone: "82884033",
        },

        phoneChange: false,
        emailChange: false,
        passwordChange: false,
    }

    loadDataForBlogs = () => {
        async function findBlogs(id) {
            var jsonData = {}
            jsonData.query = `query FindAllBlogsByUserId($userId: String!){
                findAllBlogsByUserId(userId: $userId)
            }`
            jsonData.variables = {
                userId: id,
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

        var response = findBlogs(this.state.user.id)

        response.then(result => {
            if (result.ok) {
                alert("Success!")
            } else {
                alert("Error!")
            }
        })
    }

    onChangePassword = () => {
        if (this.state.passwordChange) {
            //define a query function
            async function updatePassword(userId, password) {
                var jsonData = {}
                jsonData.query = `mutation UpdatePassword($userId: String!, $newPassword: String!){
                    updatePassword(userId: $userId, newPassword: $newPassword)
                }`
                jsonData.variables = {
                    userId: userId,
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

            var response = updatePassword(this.state.user.id, this.state.newPassword)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
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
                jsonData.query = `mutation UpdatePhone($userId: String!, $newPhone: String!){
                    updatePhone(userId: $userId, newPhone: $newPhone)
                }`
                jsonData.variables = {
                    userId: user.id,
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

            var response = updatePhone(this.state.user)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
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
                jsonData.query = `mutation UpdateEmail($userId: String!, $newEmail: String!){
                    updateEmail(userId: $userId, newEmail: $newEmail)
                }`
                jsonData.variables = {
                    userId: user.id,
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

            var response = updateEmail(this.state.user)

            response.then(result => {
                if (result.ok) {
                    alert("Success!")
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
                                Username: <span>{this.state.user.username}</span>
                            </div>
                            <div className="col-4 password">
                                <button className="btn changePassword" onClick={this.onChangePassword}> {this.state.passwordChange ? "Submit" : "Change Password"} </button>
                                &nbsp;&nbsp;&nbsp;
                                {this.state.passwordChange ? <button className="btn btnCancle" onClick={() => this.setState({ passwordChange: false })}>Cancle</button> : null}
                            </div>
                            {
                                this.state.passwordChange ?
                                    <div>
                                        <div className='"col-12 passwordInput'>
                                            <input onChange={(val) => this.setState({ newPassword: val })} placeholder="new password" />
                                        </div>
                                        &nbsp;
                                        <div className='"col-12 passwordInput'>
                                            <input onChange={(val) => this.setState({ newPassword: val })} placeholder="retype password" />
                                        </div>
                                    </div>
                                    : null
                            }

                        </li>

                        <li className="secondRow row">
                            <div className="phone col-12">
                                {
                                    this.state.phoneChange ?
                                        <input type="text" value={this.state.user.phone} onChange={(val) => this.setState({
                                            user: {
                                                username: this.state.user.username,
                                                email: this.state.user.email,
                                                phone: val,
                                            }
                                        })} /> :
                                        <span><Phone />&nbsp;&nbsp;&nbsp;<span>{this.state.user.phone}</span>&nbsp;&nbsp;&nbsp;</span>
                                }&nbsp;&nbsp;&nbsp;
                                <button className='btn' onClick={this.onPhoneChange}>{this.state.phoneChange ? "Submit" : "Change"}</button>
                                &nbsp;&nbsp;&nbsp;
                                {
                                    this.state.phoneChange ? <button className="btn canclePhone" onClick={() => this.setState({ phoneChange: false })}>Cancle</button> : null
                                }
                            </div>
                            <div className="email col-12">
                                {
                                    this.state.emailChange ?
                                        <input type="text" value={this.state.user.email} onChange={(val) => this.setState({
                                            user: {
                                                username: this.state.user.username,
                                                email: val,
                                                phone: this.state.user.phone,
                                            }
                                        })} /> :
                                        <span>
                                            <Envelope />&nbsp;&nbsp;&nbsp;<span>{this.state.user.email}</span>&nbsp;&nbsp;&nbsp;
                                        </span>
                                }&nbsp;&nbsp;&nbsp;
                                <button className='btn' onClick={this.onEmailChange}>{this.state.emailChange ? "Submit" : "Change"}</button>
                                &nbsp;&nbsp;&nbsp;
                                {
                                    this.state.emailChange ? <button className="btn cancleEmail" onClick={() => this.setState({ emailChange: false })}>Cancle</button> : null
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
                                    <div className="col-9">
                                        {cur.title}
                                    </div>
                                    <div className="col-2">
                                        {cur.time}
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
