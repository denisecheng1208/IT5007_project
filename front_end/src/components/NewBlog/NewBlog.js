import React, { Component } from 'react'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import './NewBlog.css'

export default class NewBlog extends Component {
    state = {
        userId: "",
        title: "",
        type: "Front_End",
        segments: [""],
    }

    onEditorContextChange = (newVal, idx) => {
        var cur = this.state.segments
        cur[idx] = newVal
        this.setState({ segments: cur })
    }

    addNewEditor = () => {
        var cur = this.state.segments
        var newVal = [...cur, '']
        this.setState({ segments: newVal })
    }

    removeEditor = (target) => {
        var newVal = this.state.segments.filter((val, idx) => idx != target)
        this.setState({ segments: newVal })
    }

    onTypeChange = (event) => {
        this.setState({ type: event.target.value })
    }

    submit = () => {

    }

    render() {
        return (
            <div className='contextContainer col-10 offset-1'>
                <div className="row offset-1 col-10 title">
                    <input className="col-8 titleInput" type='text' defaultValue={this.state.title} onChange={(val) => { this.setState({ title: val }) }}></input>
                    <select onChange={(val) => this.onTypeChange(val)
                    } defaultValue={this.state.type} className="offset-2 col-2 type">
                        <option value={"Front_End"} >Front End</option>
                        <option value={"Back_End"}>Back End</option>
                    </select>
                </div>
                {
                    this.state.segments.map((cur, idx) => {
                        return (
                            <div className="editorWrapper row" key={idx}>
                                <MDEditor className="offset-1 col-10" height={500} value={this.state.segments[idx]} onChange={(value) => this.onEditorContextChange(value, idx)} />
                                <div className="btnWrapper col-1">
                                    <button className='btn removeEditor' onClick={() => this.removeEditor(idx)}>
                                        Delete
                                    </button>
                                </div>
                            </div>)
                    })
                }
                <div className="addNewEditor">
                    <button className='btn newTab' onClick={this.addNewEditor}>
                        New tab
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='btn submit' onClick={this.submit}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}
