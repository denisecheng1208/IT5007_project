import React, { Component } from 'react'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import './NewBlog.css'
import cookie from 'react-cookies'

export default class NewBlog extends Component {
  state = {
    username: "",
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
    async function addBlog(username, title, type) {
      var jsonData = {};
      jsonData.query = `mutation AddBlog($username: String!, $title: String!, $type: String!){
                  addBlog(username: $username, title: $title, type: $type)
                }`;
      jsonData.variables = {
        username: username,
        title: title,
        type: type,
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

    async function addSegment(username, blogId, context, sequence) {
      var jsonData = {};
      jsonData.query = `mutation AddSegment($username: String!, $blogId: String!, $context: String!, $sequence: Int!){
                addSegment(username: $username, blogId: $blogId, context: $context, sequence: $sequence)
                }`;
      jsonData.variables = {
        username: username,
        blogId: blogId,
        context: context,
        sequence: sequence,
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

    var response = addBlog(cookie.load("username"), this.state.title, this.state.type)

    response.then(result => {
      if (result.ok) {
        return result.json()
      } else {
        alert("Error!")
        return null
      }
    }).then(result => {
      return result.data.addBlog
    }).then(blogId => {
      for (var i = 0; i < this.state.segments.length; i++) {
        addSegment(cookie.load("username"), blogId, this.state.segments[i], i)
      }
      alert("Success!")
      window.location.href = "http://localhost:3000/"
    })

  }

  render() {
    return (
      <div className='contextContainer col-10 offset-1'>
        <div className="row offset-1 col-10 title">
          <div className="row col-8 titleWrapper">
            <span className="col-1">Title:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input className="col-11 titleInput" type='text' defaultValue={this.state.blog == null ? "loading" : this.state.blog.title} onChange={(event) => { this.setState({ title: event.target.value }) }}></input>
          </div>
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
