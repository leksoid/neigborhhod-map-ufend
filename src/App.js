import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Map from "./Map";

class App extends Component {
    render(){
        return (
            <div className='app'>
                <Sidebar/>
                <Map/>
            </div>
        )
    }
}

export default App;
