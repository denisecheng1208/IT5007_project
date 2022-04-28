import React, { Component } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { ChatLeftText, PlusSquare, BookmarkCheck } from 'react-bootstrap-icons'
import './ContextDisplayer.css'
import Textarea from '@uiw/react-md-editor/lib/components/TextArea/Textarea'
import cookie from 'react-cookies'

export default class ContextDispalyer extends Component {
    state = {
        userId: "",
        displayAddCommentTab: false,
        addCommentTabOnDisplay: 0,
        blog: this.props.blogInfo,
        segments: this.props.context,
        comment: "",
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.blogInfo !== prevState.blog || nextProps.segments !== prevState.segments) {
            return {
                blog: nextProps.blogInfo,
                segments: nextProps.context
            }
        }
        return null
    }

    onEdit = () => {
        window.location.href = 'http://localhost:3000/edit'
    }

    onContextClick = (idx, segId) => {
        if (idx == this.props.commentsOnDisplay) {
            this.props.changeDisplayState({ displayComments: !this.props.displayComments })
        } else {
            this.props.changeDisplayState({ commentsOnDisplay: idx, displayComments: true })
        }

    }

    addComments = (idx) => {
        var cur = this.state.displayAddCommentTab
        this.setState({ displayAddCommentTab: !cur, addCommentTabOnDisplay: idx })
    }

    submitComments = (segmentId) => {
        async function addComment(commentOwnerUsername, segmentId, context) {
            var jsonData = {};
            jsonData.query = `mutation AddComment($commentOwnerUsername: String!, $segmentId: String!, $context: String!){
                    addComment(commentOwnerUsername: $commentOwnerUsername, segmentId: $segmentId, context: $context)
                }`;
            jsonData.variables = {
                commentOwnerUsername: commentOwnerUsername,
                segmentId: segmentId,
                context: context,
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

        var response = addComment(cookie.load("username"), segmentId, this.state.comment);
        response.then(result => {
            if (result.ok) {
                alert("Operation Success!");
            } else {
                console.log("error!")
            }
        }).then(result => {
            window.location.reload()
        });
    }

    render() {
        return (
            <div className='Wrapper row'>
                <div className="row offset-1 col-9 title">
                    <span className="col-8 titleDisplay" >{this.state.blog == null ? "loading" : this.state.blog.title}</span>
                    <span className="offset-2 col-2 type">
                        <BookmarkCheck />&nbsp;&nbsp;&nbsp;{this.state.blog == null ? "loading" : this.state.blog.type}
                    </span>
                </div>
                
                {   
                    this.state.blog != null && cookie.load("username") == this.state.blog.username? 
                    <button className='editBtn offset-1 col-1 btn btn-warning' onClick={this.onEdit}>Edit</button> : null
                }
                
                <div className="offset-1 col-10 contextWrapper">
                
                    {
                        
                        this.state.segments == null ? "loading" : this.state.segments.map((val, idx) => {
                            return (
                                <div className="markDownContextWrapper row" key={idx} >
                                    <MDEditor.Markdown height={400} className="markDownContext col-11" source={this.state.segments[idx].context} />
                                    <div className="ctrlBtn col-1 row">
                                        <div className="btnWrapper">
                                            <button className='showComment btn col-12' onClick={() => this.onContextClick(idx, val.id)}>
                                                <ChatLeftText />
                                            </button>
                                        </div>

                                        <div className="btnWrapper">
                                            <button className='addComment btn col-12' onClick={() => this.addComments(idx)}>
                                                <PlusSquare />
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        this.state.displayAddCommentTab && this.state.addCommentTabOnDisplay == idx ?
                                            (<div className='addCommentTab row'>
                                                <hr className="offset-5 col-2" />
                                                <textarea onChange={(event) => this.setState({ comment: event.target.value })} placeholder="Input your comments!" rows="5" type="text" className=' col-10'></textarea>
                                                <div className="col-2">
                                                    <button className="btn submitCommentBtn" onClick={() => this.submitComments(val.id)}>Submit</button>
                                                </div>

                                            </div>
                                            ) : null
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}