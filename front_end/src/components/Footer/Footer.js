import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer row">
        <div className="footerIntro offset-2 col-2">
          <h3>About us</h3>
          "An online blog system for programmers and discussions about cutting edge programming techniques"<br />
          Our mission is to make you program easier!
        </div>

        <div className="footerContact col-4">
          <ul className="footerContact ">
            <h4>Contact us via: </h4>
            <li><span>Tel:</span>  8888 8888</li>
            <li><span>Email:</span>  programForum@gmail.com</li>
            <li><span>Address:</span> No. 32, xxx Road, SG</li>
          </ul>
        </div>

        <div className="twoDCode col-2 row">
          <div className="col-12">Scan to learn more!</div>
          <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.bsenTl3oS4VhtsyLC3VgWAAAAA?pid=ImgDet&rs=1" />
        </div>

        <hr className="offset-1 col-10"></hr>
        <div className="copyright col-12">
          All Rights Reserved, Copyright @ 2022
        </div>
      </div>
    )
  }
}
