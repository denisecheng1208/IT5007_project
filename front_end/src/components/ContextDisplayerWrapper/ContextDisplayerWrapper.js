import React, { Component } from 'react'
import CommentsDisplayer from '../CommentsDisplayer/CommentsDisplayer'
import ContextDispalyer from '../ContextDisplayer/ContextDispalyer'
import cookie from 'react-cookies'

export default class ContextsDisplayerWrapper extends Component {
  state = {
    displayComments: false,
    commentsOnDisplay: 0,
    segments: [],
    comments: { 0: [] },
  }

  componentDidMount = () => {
    this.loadDataForBlog()
    this.loadDataForSegment()
  }

  loadDataForSegment = () => {
    async function findCommentsBySegmentId(segmentId) {
      var jsonData = {}
      jsonData.query = `query FindCommentsBySegmentId($segmentId: String!){
            findCommentsBySegmentId(segmentId: $segmentId){
                id
                context
                commentOwnerUsername
                commentDate
              }
            }`
      jsonData.variables = {
        segmentId: segmentId,
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
      this.setState({ segments: result.data.findSegmentsByBlogId })
      return true
    }).then(result => {
      this.state.segments.forEach(cur => {
        var response = findCommentsBySegmentId(cur.id)
        response.then(result => {
          if (result.ok) {
            return result.json()
          } else {
            alert("Error!")
            return null
          }
        }).then(result => {
          var tmp = this.state.comments
          tmp[cur.sequence] = result.data.findCommentsBySegmentId
          this.setState({ comments: tmp})
        })
      })
    })
  }

  loadDataForBlog = () => {
    async function findBlogById(blogId) {
      var jsonData = {}
      jsonData.query = `query FindBlogById($blogId: String!){
        findBlogById(blogId: $blogId){
            title
            type
            id
            username
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

  render() {
    if (this.state.displayComments) {
      return (
        <div className='col-12 row'>
          <div className='col-9 row'>
            <ContextDispalyer blogInfo={this.state.blog} commentsOnDisplay={this.state.commentsOnDisplay} displayComments={this.state.displayComments} context={this.state.segments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
          <div className='col-3 row'>
            <CommentsDisplayer segments={this.state.segments} commentsOnDisplay={this.state.commentsOnDisplay} comments={this.state.comments} displayComments={this.state.displayComments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='col-12 row'>
          <div className='offset-1 col-10 row'>
            <ContextDispalyer blogInfo={this.state.blog} displayComments={this.state.displayComments} context={this.state.segments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
          <div className='col-1 row'>
            <CommentsDisplayer segments={this.state.segments} commentsOnDisplay={this.state.commentsOnDisplay} comments={this.state.comments} displayComments={this.state.displayComments} changeDisplayState={(newState) => this.setState(newState)} />
          </div>
        </div>
      )
    }
  }
}