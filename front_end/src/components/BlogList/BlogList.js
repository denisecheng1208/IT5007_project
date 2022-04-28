import React, { Component } from 'react'
import './BlogList.css'
import { PersonLinesFill, ListStars, FileEarmarkText, Phone, Envelope } from 'react-bootstrap-icons'
import { Routes, Route } from "react-router-dom";
import cookie from 'react-cookies'

export default class AccountInfo extends Component {
    state = {
        blogs: [{ title: "Coding with C++", time: "2012-12-05" },
        { title: "Coding with Java", time: "2022-03-15" },
        { title: "Coding with Node.js", time: "2019-07-28" },
        { title: "I Know Why The Caged Bird Sings", time: "2015-08-31" },
        { title: "Life and Death Are Wearing Me Out: A Novel", time: "1998-03-15" },],
    }

    componentDidMount = () => {
        this.loadDataForBlogs()
    }

    loadDataForBlogs = () => {
        async function findBlogs(username) {
            var jsonData = {}
            jsonData.query = `query FindAllBlogsByUserName($username: String!){
                findAllBlogsByUserName(username: $username){
                    title
                    id
                    username
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

        var response = findBlogs(cookie.load("username"))

        response.then(result => {
            if (result.ok) {
                return result.json()
            } else {
                alert("Error!")
                return null;
            }
        }).then(result => {
            this.setState({ blogs: result.data.findAllBlogsByUserName })
        })
    }

    displayBlog = (blogId) => {
        cookie.save("blogIdOnDisplay", blogId)
        window.location.href = "http://localhost:3000/blogDetail"
    }

    render() {
        return (
            <div className="row wrapper">

                <div className='row offset-3 col-6 blogs'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Blogs
                    </div>

                    <ul className="col-10 offset-1 blogList">
                        {
                            this.state.blogs.map((cur, idx) => {
                                return (<li key={idx} className="blog row">
                                    <FileEarmarkText className='col-1' />
                                    <div className="col-8 btn" onClick={ () => this.displayBlog(cur.id) }>
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
