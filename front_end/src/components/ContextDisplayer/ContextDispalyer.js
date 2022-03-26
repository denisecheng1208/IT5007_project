import React, { Component } from 'react'
import MDEditor from '@uiw/react-md-editor'

import './ContextDisplayer.css'

export default class ContextDispalyer extends Component {
    state = {
        userId: "",
    }

    onContextClick = (idx) => {
        this.props.changeDisplayState({commentsOnDisplay: idx})
    }

    render() {
        return (
            <div className='Wrapper'>
                <div className="offset-1 col-10 contextWrapper">
                    {
                        this.props.context.map((val, idx) => {
                            return (
                                <div className="markDownContextWrapper" key={idx} onClick={() => this.onContextClick(idx)}>
                                    <MDEditor.Markdown height={400} className="markDownContext" source={this.props.context[idx]}/>
                                </div>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
        )
    }
}