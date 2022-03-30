import React, { Component } from 'react'
import './AccountInfo.css'
import { PersonLinesFill, ListStars, FileEarmarkText, Phone, Envelope } from 'react-bootstrap-icons'

export default class AccountInfo extends Component {
    state = {
        blogs: [{title: "Coding with C++", time: "2012-12-05"},
        {title: "Coding with Java", time: "2022-03-15"},
        {title: "Coding with Node.js", time: "2019-07-28"},
        {title: "I Know Why The Caged Bird Sings", time: "2015-08-31"},
        {title: "Life and Death Are Wearing Me Out: A Novel", time: "1998-03-15"},],

        user: {username: "Tom and Jerry", email: "TechForum@gmail.com", "phone": "82884033",
              }
    }

  render() {
    return (
      <div className="row wrapper">
        <div className='profile row offset-3 col-6'>
            <div className='col-12 colorBar'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<PersonLinesFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Profile
            </div>

            <ul className="col-10 offset-1 userInfo">
                <li className="firstRow row">
                    <div className="imgWrapper col-3">
                        <img src="https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/eaf81a4c510fd9f9313a02ef232dd42a2834a403.jpg"></img>
                    </div>
                    <div className="username col-8">
                        Username: <span>{this.state.user.username}</span>
                    </div>
                </li>

                <li className="secondRow row">
                    <div className="phone col-6">
                        <Phone/>&nbsp;&nbsp;&nbsp;<span>{this.state.user.phone}</span>&nbsp;&nbsp;&nbsp;
                        <button className='btn'>Change</button>
                    </div>
                    <div className="email col-6">
                        <Envelope/>&nbsp;&nbsp;&nbsp;<span>{this.state.user.email}</span>&nbsp;&nbsp;&nbsp;
                        <button className='btn'>Change</button>
                    </div>
                </li>
            </ul>
        </div>     

        <div className='row offset-3 col-6 blogs'>
            <div className='col-12 colorBar'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Blogs
            </div>

            <ul className="col-10 offset-1 blogList">
                {
                    this.state.blogs.map((cur, idx) => {
                        return (<li key={idx} className="blog row">
                            <FileEarmarkText className='col-1'/>
                            <div className="col-9">
                                {cur.title}
                            </div>
                            <div className="col-2">
                                {cur.time}
                            </div>
                        </li>)
                    })
                }
            </ul>
        </div> 
      </div>
    )
  }
}
