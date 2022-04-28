import React, { Component } from 'react'
import './ContextEditor.css'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import cookie from 'react-cookies'

export default class ContextEditor extends Component {
  state = {
    userId: "",
    title: "test",
    type: "Back_End",
    blog: {},
    segments: [],
  }

  componentDidMount = () => {
    this.loadDataForBlog()
    this.loadDataForSegment()
  }

  loadDataForBlog = () => {
    async function findBlogById(blogId) {
      var jsonData = {}
      jsonData.query = `query FindBlogById($blogId: String!){
        findBlogById(blogId: $blogId){
            title
            type
            id
            publishDate
          }
        }`
      jsonData.variables = {
        blogId: blogId,
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

    var response = findBlogById(cookie.load("blogIdOnDisplay"))

    response.then(result => {
      if (result.ok) {
        return result.json()
      } else {
        alert("Error!")
        return null
      }
    }).then(result => {
      this.setState({
        blog: result.data.findBlogById
      })
    })
  }

  loadDataForSegment = () => {
    async function findSegmentsByBlogId(blogId) {
      var jsonData = {}
      jsonData.query = `query FindSegmentsByBlogId($blogId: String!){
        findSegmentsByBlogId(blogId: $blogId){
            id
            context
            sequence
          }
        }`
      jsonData.variables = {
        blogId: blogId,
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

    var response = findSegmentsByBlogId(cookie.load("blogIdOnDisplay"))

    response.then(result => {
      if (result.ok) {
        return result.json()
      } else {
        alert("Error!")
        return null
      }
    }).then(result => {
      this.setState({
        segments: result.data.findSegmentsByBlogId,
      })
    })
  }

  onEditorContextChange = (newVal, idx) => {
    var cur = this.state.segments
    cur[idx].context = newVal
    this.setState({ segments: cur })
  }

  addNewEditor = () => {
    var cur = this.state.segments
    var newVal = [...cur, {context: "", sequence: cur.length}]
    this.setState({ segments: newVal })
  }

  submit = () => {
    async function addBlog(username, segments, title, type) {
      var jsonData = {};
      jsonData.query = `mutation AddBlog($username: String!, $segments: String!, $title: String!, $type: String!){
            addBlog(username: $username, segments: $segments, title: $title, type: $type)
          }`;
      jsonData.variables = {
        username: username,
        segments: segments,
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

    var response = addBlog(this.state.username, this.state.title, this.state.type)

    response.then(result => {
      if (result.ok) {
        alert("Success!")
      } else {
        alert("Error!")
      }
    })
  }

  removeEditor = (target) => {
    var newVal = this.state.segments.filter((val, idx) => idx != target)
    this.setState({ segments: newVal })
  }

  onTypeChange = (event) => {
    this.setState({ type: event.target.value })
  }

  render() {
    return (
      <div className='contextContainer col-10 offset-1'>
        <div className="row offset-1 col-10 title">
          <input className="col-8 titleInput" type='text' defaultValue={this.state.blog == null ? "loading" : this.state.blog.title} onChange={(val) => { this.setState({ title: val }) }}></input>
          <select onChange={(val) => this.onTypeChange(val)} defaultValue={this.state.blog == null ? "loading" : this.state.blog.type} className="offset-2 col-2 type">
            <option value={"Front_End"}>Front End</option>
            <option value={"Back_End"}>Back End</option>
          </select>
        </div>
        {
          this.state.segments.map((cur, idx) => {
            return (
              <div className="editorWrapper row" key={idx}>
                <MDEditor className="offset-1 col-10" height={500} value={this.state.segments[idx].context} onChange={(value) => this.onEditorContextChange(value, idx)} />
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
