import React, { Component } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { ChatLeftText, PlusSquare, BookmarkCheck } from 'react-bootstrap-icons'
import './ContextDisplayer.css'
import Textarea from '@uiw/react-md-editor/lib/components/TextArea/Textarea'

export default class ContextDispalyer extends Component {
    state = {
        userId: "",
        displayAddCommentTab: false,
        addCommentTabOnDisplay: 0,
        blog: this.props.blogInfo,
        segments: this.props.context,
    }

    static getDerivedStateFromProps(nextProps, prevState){
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

    onContextClick = (idx) => {
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

    render() {
        return (
            <div className='Wrapper row'>
                <div className="row offset-1 col-9 title">
                    <span className="col-8 titleDisplay" >{this.state.blog == null? "loading" : this.state.blog.title}</span>
                    <span className="offset-2 col-2 type">
                        <BookmarkCheck/>&nbsp;&nbsp;&nbsp;{this.state.blog == null? "loading" : this.state.blog.type}
                    </span>
                </div>
                <button className='editBtn offset-1 col-1 btn btn-warning' onClick={this.onEdit}>Edit</button>
                <div className="offset-1 col-10 contextWrapper">
                    {
                        this.state.segments == null? "loading" : this.state.segments.map((val, idx) => {
                            return (
                                <div className="markDownContextWrapper row" key={idx} >
                                    <MDEditor.Markdown height={400} className="markDownContext col-11" source={this.state.segments[idx].context} />
                                    <div className="ctrlBtn col-1 row">
                                        <div className="btnWrapper">
                                            <button className='showComment btn col-12' onClick={() => this.onContextClick(idx)}>
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
                                                <textarea placeholder="Input your comments!" rows="5" type="text" className=' col-10'></textarea>
                                                <div className="col-2">
                                                    <button className="btn submitCommentBtn">Submit</button>
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