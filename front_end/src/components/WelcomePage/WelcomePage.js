import React, { Component } from 'react'
import './WelcomePage.css'
import { ListStars, FileEarmarkText } from 'react-bootstrap-icons'
import cookie from 'react-cookies'

export default class WelcomePage extends Component {
    state = {
        front_end_blogs: [],
        back_end_blogs: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        async function findBlogs(blogType) {
            var jsonData = {}
            jsonData.query = `query FindBlogsByType($blogType: String!){
                findBlogsByType(blogType: $blogType){
                    title
                    id
                    username
                    publishDate
                }
            }`
            jsonData.variables = {
                blogType: blogType,
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

        var response_front = findBlogs("Front_End")
        var response_back = findBlogs("Back_End")

        response_front.then(result => {
            if (result.ok) {
                return result.json()
            } else {
                alert("Error!")
                return null;
            }
        }).then(result => {
            this.setState({front_end_blogs: result.data.findBlogsByType})
        })

        response_back.then(result => {
            if (result.ok) {
                return result.json()
            } else {
                alert("Error!")
                return null;
            }
        }).then(result => {
            this.setState({back_end_blogs: result.data.findBlogsByType})
        })
    }

    displayBlog = (blogId) => {
        cookie.save("blogIdOnDisplay", blogId)
        window.location.href = "http://localhost:3000/blogDetail"
    }

    render() {
    
        return (
            <div className="row wrapper">
                <div className='col-12 welcome'>Welcome to TechForum !</div>

                <div className='row offset-3 col-6 blocks'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Front End
                    </div>

                    <ul className="col-10 offset-1 blockList">
                    {
                        this.state.front_end_blogs.map( d => {
                            return (
                            <li key={d.id} className="block row">
                                <FileEarmarkText className='col-1'/>
                                <div className="btn col-7" onClick={ () => this.displayBlog(d.id)} >
                                    {d.title}
                                </div>
                                <div className="col-3">
                                    {d.publishDate}
                                </div>
                                <div className="col-1">
                                    {d.username}
                                </div>
                            </li>)
                        })
                    }
                     </ul>
                </div> 

                <div className='row offset-3 col-6 blocks'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back End
                    </div>

                    <ul className="col-10 offset-1 blockList">
                    {
                        this.state.back_end_blogs.map( d => {
                            return (
                            <li key={d.id} className="block row">
                                <FileEarmarkText className='col-1'/>
                                <div className="btn col-7" onClick={ () => this.displayBlog(d.id)}>
                                    {d.title}
                                </div>
                                <div className="col-3">
                                    {d.publishDate}
                                </div>
                                <div className="col-1">
                                    {d.username}
                                </div>
                            </li>)
                        })
                    }
                     </ul>
                </div> 
            </div>
        );
    }

}