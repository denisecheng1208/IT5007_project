import React, { Component } from 'react'
import './WelcomePage.css'
import { ListStars, FileEarmarkText } from 'react-bootstrap-icons'


const initialDocs1 = [
    {
       id: 1, owner: 'Ravan', created: new Date('2018-08-15'), 
       title: 'HTML tutorial', type: 1,
    },
    {
        id: 2, owner: 'Emma', created: new Date('2018-08-16'), 
        title: 'CSS tutorial', type: 1,
    },
    {
        id: 3, owner: 'Ella', created: new Date('2018-08-17'), 
        title: 'React tutorial', type: 1,
    },
    {
        id: 4, owner: 'Bob', created: new Date('2018-08-18'), 
        title: 'Angular tutorial', type: 1,
    },
    {
        id: 5, owner: 'Lily', created: new Date('2018-08-19'), 
        title: 'Vue tutorial', type: 1,
    },
];

const initialDocs2 = [
    {
        id: 6, owner: 'Bob', created: new Date('2018-08-17'), 
        title: 'JAVA tutorial', type: 2,
    },
    {
        id: 7, owner: 'Mona', created: new Date('2018-08-18'), 
        title: 'MongoDB tutorial', type: 2,
    },
    {
        id: 8, owner: 'ChengXin', created: new Date('2018-08-19'), 
        title: 'Python tutorial', type: 2,
    },
    {
        id: 9, owner: 'ShiZheng', created: new Date('2018-08-20'), 
        title: 'C++ tutorial', type: 2,
    },
    {
        id: 10, owner: 'PonyMa', created: new Date('2018-08-21'), 
        title: 'Golong tutorial', type: 2,
    },
];

export default class WelcomePage extends Component {
    state = {
        docs1 : [],
        docs2 : [],
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({docs1: initialDocs1, docs2: initialDocs2});
    }

    render() {
        const docs1List = this.state.docs1.map(d =>
            <li key={d.id}> {d.title} </li>
        );

        const docs2List = this.state.docs2.map(d =>
            <li key={d.id}> {d.title} </li>
        );

        return (
            <div className="row wrapper">
                <div className='row offset-3 col-6 welcome'>Welcome to TechForum !</div>

                <div className='row offset-3 col-6 blocks'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Front End
                    </div>

                    <ul className="col-10 offset-1 blockList">
                    {
                        this.state.docs1.map( d => {
                            return (
                            <li key={d.id} className="block row">
                                <FileEarmarkText className='col-1'/>
                                <div className="col-7">
                                    {d.title}
                                </div>
                                <div className="col-2">
                                    {d.created.toLocaleDateString()}
                                </div>
                                <div className="col-2">
                                    {d.owner}
                                </div>
                            </li>)
                        })
                    }
                     </ul>
                </div> 

                <div className='row offset-3 col-6 blocks'>
                    <div className='col-12 colorBar'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ListStars/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back End
                    </div>

                    <ul className="col-10 offset-1 blockList">
                    {
                        this.state.docs2.map( d => {
                            return (
                            <li key={d.id} className="block row">
                                <FileEarmarkText className='col-1'/>
                                <div className="col-6">
                                    {d.title}
                                </div>
                                <div className="col-2">
                                    {d.created.toLocaleDateString()}
                                </div>
                                <div className="col-2">
                                    {d.owner}
                                </div>
                            </li>)
                        })
                    }
                     </ul>
                </div> 
            </div>
        );
    }

}