import React, { Component } from 'react'
import './CommentsDisplayer.css'
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import cookie from 'react-cookies'

export default class CommentsDisplayer extends Component {

    state = {
        id: "3124",

        blog: {
            segments: [],
            title: "",
            type: "",
        },
        comments: { 0: [] },
        segments: [],
        commentsOnDisplay: this.props.commentsOnDisplay,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.comments !== prevState.comments || nextProps.segments !== prevState.segments) {
            return {
                comments: nextProps.comments,
                segments: nextProps.segments,
            }
        }
        return null
    }

    componentDidMount = () => {

    }

    toggle = () => {
        var cur = this.props.displayComments;
        this.props.changeDisplayState({ displayComments: !cur })
    }

    render() {
        if (this.props.displayComments) {
            return (
                <div className="row asideWrapper">
                    <div className="col-1 btn asideBtnWrapper">
                        <div className="asideBtnWrapper2 btn" onClick={this.toggle}>
                            <ArrowRight />
                        </div>
                    </div>

                    <aside className="col-11">
                        <ul className="commentsList">
                            {
                                this.state.comments[this.props.commentsOnDisplay] == null ? null : this.state.comments[this.props.commentsOnDisplay].map((cur, idx) => {
                                    return (<li className="comment col-12" key={idx}>
                                        <div className="row col-12 commentorInfo">
                                            <div className='commentorPic col-3'>
                                                <img src={cur.picture == null ? "https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c" : cur.picture} />
                                            </div>
                                            <div className='commentorName col-4'>
                                                {cur.commentOwnerUsername}
                                            </div>
                                            <div className='commentorDate col-5'>
                                                {cur.commentDate}
                                            </div>
                                        </div>
                                        <div className="commentBody">
                                            {cur.context}
                                        </div>
                                    </li>)
                                })
                            }
                        </ul>
                    </aside>
                </div>
            )
        } else {
            return (
                <div className="btn asideBtnWrapperNondisplay">
                    <div className="asideBtnWrapper2" onClick={this.toggle}>
                        <ArrowLeft />
                    </div>
                </div>
            )
        }
    }
}
