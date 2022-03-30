import React, { Component } from 'react'
import './CommentsDisplayer.css'
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

export default class CommentsDisplayer extends Component {

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
                                this.props.comments[this.props.commentsOnDisplay].map((cur, idx) => {
                                    return (<li className="comment col-12" key={idx}>
                                        <div className="row col-12 commentorInfo">
                                            <div className='commentorPic col-3'>
                                                <img src={cur.picture} />
                                            </div>
                                            <div className='commentorName col-4'>
                                                {cur.name}
                                            </div>
                                            <div className='commentorDate col-5'>
                                                {cur.timestamp}
                                            </div>
                                        </div>
                                        <div className="commentBody">
                                            {cur.content}
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
