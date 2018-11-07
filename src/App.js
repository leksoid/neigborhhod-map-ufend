import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Map from "./Map";

const FAPI_CLIENT_ID = 'H4MWPFTV2MD22GEGS2HYNECXWWNOQBU0AHIB5PSJG0U4LRN4';
const FAPI_CLIENT_SECRET = 'FEJNQMXTTUJBI1MCVMIRKGAGRAUKFSLR423UKN0LSII3YTT1';

class MarkerService {
    // TODO make Add and Activate functions

    add(venue){
        this.activeMarker = venue;
        console.log(this.activeMarker);
    }
    activate(){

    }
}

class App extends Component {

    state = {
        baseLat: 29.7844913,
        baseLng: -95.7800231,
        zoom: 12,
        locations:[],  // TODO pass to search
        filteredLocations:[] // TODO pass to map
    };

    componentDidMount() {
        this.getAllVenuesOnMapLoad().then((locations) => {
            this.setState({locations})
        })
        // TODO init new marker service
        this.markerService = new MarkerService();
    };

    getAllVenuesOnMapLoad = () => {
        let request = new Request(`https://api.foursquare.com/v2/venues/search?ll=41.0111915,-73.8486300&client_id=${FAPI_CLIENT_ID}&query=bakery&client_secret=${FAPI_CLIENT_SECRET}&v=20181029`,{
            method: 'GET'
        });
        return fetch(request).then(res => res.json())
            .then(data => data.response.venues)
    };

    render(){
        return (
            <div className='app'>
                <Sidebar
                    addMarkerToService={(venue)=>this.markerService.add(venue)}
                    locations={this.state.locations}
                />
                <Map
                    dataVenues={this.state.locations}
                    lat={this.state.baseLat}
                    lng={this.state.baseLng}
                    zoom={this.state.zoom}
                />
            </div>
        )
    }
}

export default App;
