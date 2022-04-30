import React, { Component } from 'react'
import './ContextEditor.css'
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import cookie from 'react-cookies'
import { ip } from '../../const';

export default class ContextEditor extends Component {
  state = {
    userId: "",
    title: "",
    type: "",
    blog: {},
    segments: [],
    toRemove: [],
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
      return await fetch("http://" + ip + ":5000/graphql", {
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
        blog: result.data.findBlogById,
        title: result.data.findBlogById.title,
        type: result.data.findBlogById.type,
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
      return await fetch("http://" + ip + ":5000/graphql", {
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
    var newVal = [...cur, { context: "", sequence: cur.length }]
    this.setState({ segments: newVal })
  }

  submit = () => {
    async function deleteSegment(segmentId) {
      var jsonData = {};
      jsonData.query = `mutation DeleteSegment($segmentId: String!){
        deleteSegment(segmentId: $segmentId)
          }`;
      jsonData.variables = {
        segmentId: segmentId,
      };
      return await fetch("http://" + ip + ":5000/graphql", {
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

    async function updateBlogTitle(blogId, newTitle) {
      var jsonData = {};
      jsonData.query = `mutation UpdateBlogTitle($blogId: String!, $newTitle: String!){
          updateBlogTitle(blogId: $blogId, newTitle: $newTitle)
          }`;
      jsonData.variables = {
        blogId: blogId,
        newTitle: newTitle,
      };
      return await fetch("http://" + ip + ":5000/graphql", {
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

    async function updateBlogType(blogId, newType) {
      var jsonData = {};
      jsonData.query = `mutation UpdateBlogType($blogId: String!, $newType: String!){
          updateBlogType(blogId: $blogId, newType: $newType)
          }`;
      jsonData.variables = {
        blogId: blogId,
        newType: newType,
      };
      return await fetch("http://" + ip + ":5000/graphql", {
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
      return await fetch("http://" + ip + ":5000/graphql", {
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

    async function updateSegment(segmentId, segmentContext) {
      var jsonData = {};
      jsonData.query = `mutation UpdateSegment($segmentId: String!, $segmentContext: String!){
        updateSegment(segmentId: $segmentId, segmentContext: $segmentContext)
          }`;
      jsonData.variables = {
        segmentId: segmentId,
        segmentContext: segmentContext,

      };
      return await fetch("http://" + ip + ":5000/graphql", {
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

    updateBlogTitle(cookie.load("blogIdOnDisplay"), this.state.title)
    .then(result => {
      if (result.ok) {
        return true
      } else {
        alert("Error!")
      }
    }).then(result => {
      updateBlogType(cookie.load("blogIdOnDisplay"), this.state.type)
      .then(result => {
        if (result.ok) {
          return true
        } else {
          alert("Error!")
        }
      })
    }).then(result => {
      for(var i=0;i<this.state.segments.length;i++){
        if(this.state.segments[i].id != null){
          updateSegment(this.state.segments[i].id, this.state.segments[i].context)
          .then(result => {
            if (result.ok) {
              return true
            } else {
              alert("Error!")
            }
          })
        }else{
          // addSegment(username, blogId, context, sequence)
          addSegment(cookie.load("username"), cookie.load("blogIdOnDisplay"), this.state.segments[i].context, i)
          .then(result => {
            if (result.ok) {
              return true
            } else {
              alert("Error!")
            }
          })
        }
      }
    }).then(result => {
      for(var j=0;j<this.state.toRemove.length;j++){
        deleteSegment(this.state.toRemove[j])
        .then(result => {
          if (result.ok) {
            return true
          } else {
            alert("Error!")
          }
        })
      }
    }).then(result => {
      window.location.href = "http://" + ip + ":3000/blogDetail"
    })
  }

  removeEditor = (target) => {
    var newVal = this.state.segments.filter((val, idx) => idx != target)
    this.setState({ segments: newVal, toRemove: [...this.state.toRemove, this.state.segments[target].id] })
  }

  render() {
    return (
      <div className='contextContainer col-10 offset-1'>
        <div className="row offset-1 col-10 title">
          <div className="row col-8 titleWrapper">
            <span className="col-1">Title:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input className="col-11 titleInput" type='text' defaultValue={this.state.blog == null ? "loading" : this.state.blog.title} onChange={(event) => { this.setState({ title: event.target.value }) }}></input>
          </div>
          <select onChange={(event) => this.setState({type: event.target.value})} value={this.state.type} className="offset-2 col-2 type">
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
