import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Map from "./Map";

class App extends Component {

    state = {
        baseLat: 29.7844913,
        baseLng: -95.7800231,
        zoom: 12,
    };


    render(){
        return (
            <div className='app'>
                <Sidebar/>
                <Map
                    lat={this.state.baseLat}
                    lng={this.state.baseLng}
                    zoom={this.state.zoom}
                />
            </div>
        )
    }
}

export default App;
