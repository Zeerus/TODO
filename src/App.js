import React, { Component } from 'react';
import TODOModule from './TODOModule.js';
import './App.css';

class App extends Component{
    constructor(){
        super();
        this.state = {}
    }

    storeData(dataName, data){
        var jsonData = JSON.stringify(data);
        localStorage.setItem(dataName, jsonData);
    }

    loadData(dataName){
        //Just to be safe purge Dialogs, object of dialog content does not json well.
        var loadedData = JSON.parse(localStorage.getItem(dataName));
        if(typeof loadedData !== undefined && loadedData){
            loadedData['dialog'] = undefined;
        }
        return loadedData;
    }

    render(){
        return(
            <div>
                <TODOModule
                    storeData={(dataName, data) => this.storeData(dataName, data)}
                    loadData={(dataName) => this.loadData(dataName)}/>
            </div>
        );
    }
}

export default App;
