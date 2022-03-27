import React, { Component } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { ChatLeftText, PlusSquare } from 'react-bootstrap-icons'
import './ContextDisplayer.css'
import Textarea from '@uiw/react-md-editor/lib/components/TextArea/Textarea'

export default class ContextDispalyer extends Component {
    state = {
        userId: "",
        displayAddCommentTab: true,
        addCommentTabOnDisplay: 0,
    }

    onContextClick = (idx) => {
        if(idx == this.props.commentsOnDisplay){
            this.props.changeDisplayState({ displayComments: !this.props.displayComments })
        }else{
            this.props.changeDisplayState({ commentsOnDisplay: idx, displayComments: true})
        }
        
    }

    addComments = (idx) => {
        var cur = this.state.displayAddCommentTab
        this.setState({ displayAddCommentTab: !cur, addCommentTabOnDisplay: idx })
    }

    render() {
        return (
            <div className='Wrapper'>
                <div className="offset-1 col-10 contextWrapper">
                    {
                        this.props.context.map((val, idx) => {
                            return (
                                <div className="markDownContextWrapper row" key={idx} >
                                    <MDEditor.Markdown height={400} className="markDownContext col-11" source={this.props.context[idx]} />
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
                                        this.state.displayAddCommentTab && this.state.addCommentTabOnDisplay == idx? 
                                           (<div className='addCommentTab row'>
                                                <hr className = "offset-5 col-2"/>
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