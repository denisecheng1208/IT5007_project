import './Header.css';
import React, { Component } from 'react'
import { Search } from 'react-bootstrap-icons';

export default class Header extends Component {
  render() {
    return (
      <div className='header row'>
        <div className='col-1' logo>
          <div className="imgWrapper">
            <img src="https://tse1-mm.cn.bing.net/th/id/R-C.da34ea3f91321449391ee30727449a6b?rik=%2fn7O8xKK6JcquQ&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20170711%2f10673188_205056582000_2.jpg&ehk=wqrNnaFxGkCelyLA0VVW3zNcTL1werNiJqVSz0Qxnhc%3d&risl=&pid=ImgRaw&r=0"></img>
          </div>
        </div>

        <div className='col-1 home headerCompo'>
          <a href='/'>
            <button className='btn'>
              Home
            </button>
          </a>
        </div>

        <div className='col-1 listBtn headerCompo'>
          <a href='/displayBlog'>
            <button className='btn'>
              A Blog
            </button>
          </a>
        </div>

        <div className='col-1 accountBtn headerCompo'>
          <a href='/account'>
            <button className='btn'>
              Account
            </button>
          </a>
        </div>

        <div className='col-1 createBlogBtn headerCompo'>
          <a href='/edit'>
            <button className='btn'>
              Edit Blog
            </button>
          </a>
        </div>

        <div className='col-1 createBlogBtn headerCompo'>
          <a href='/newBlog'>
            <button className='btn'>
              New Blog
            </button>
          </a>
        </div>

        <div className='offset-1 col-3 search headerCompo'>
          <input placeholder="Search now!"></input> &nbsp;
          <button className="searchBtn btn btn-default btn-lg">
            <Search color="black" size={25} />
          </button>
        </div>

        <div className='col-1 logIn headerCompo'>
          <a href='/login'>
            <button className='btn logInBtn btn-lg'>
              Sign in
            </button>
          </a>
        </div>

        <div className='col-1 signUp headerCompo'>
          <a href='/signup'>
            <button className='btn signUpBtn btn-lg'>
              Sign up
            </button>
          </a>
        </div>
      </div>
    )
  }
}