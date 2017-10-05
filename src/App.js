import React, { Component } from 'react';
import TODOModule from './TODOModule.js';
import FullScreenDialog from './FullScreenDialog.js'
import './App.css';

class App extends Component{
    render(){
        return(
            <div>
                <FullScreenDialog />
                <TODOModule />
            </div>
        );
    }
}

export default App;
