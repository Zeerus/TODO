import React, { Component } from 'react';
import TODOModule from './TODOModule.js';
import './App.css';

class App extends Component{
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div>
                <TODOModule />
            </div>
        );
    }
}

export default App;
