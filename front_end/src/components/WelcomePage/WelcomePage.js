import React, { Component } from 'react'

const initialDocs1 = [
    {
      id: 1, owner: 'Ravan', created: new Date('2018-08-15'), 
      title: 'HTML tutorial', type: 1,
    },
    {
        id: 2, owner: 'Emma', created: new Date('2018-08-16'), 
        title: 'CSS tutorial', type: 1,
    },
];

const initialDocs2 = [
    {
      id: 3, owner: 'Bob', created: new Date('2018-08-17'), 
      title: 'JAVA tutorial', type: 2,
    },
    {
        id: 4, owner: 'Mona', created: new Date('2018-08-18'), 
        title: 'MongoDB tutorial', type: 2,
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
            <div className="offset-1 col-10">
                <div className='col-5'>
                    <label>Front End</label>
                    <br/>
                    <ul>
                        {docs1List}
                    </ul>
                </div>
                <br/>
                <div className='col-5'>
                    <label>Back End</label>
                    <ul>
                        {docs2List}
                    </ul>
                </div>
            </div>
        );
    }

}