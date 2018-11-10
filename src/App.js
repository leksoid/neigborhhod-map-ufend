import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Map from "./Map";

const FAPI_CLIENT_ID = 'H4MWPFTV2MD22GEGS2HYNECXWWNOQBU0AHIB5PSJG0U4LRN4';
const FAPI_CLIENT_SECRET = 'FEJNQMXTTUJBI1MCVMIRKGAGRAUKFSLR423UKN0LSII3YTT1';

class MarkerService {

    add(marker){
      this.markerList = marker;
      console.log(this.markerList);
      return this.markerList;
    }

    activate(venue){
      this.selectedVenue = venue;
      console.log(this.toggleInfo());
      return this.toggleInfo();
      //return this.selectedVenue;
    }

    toggleInfo(){
      this.foundMarker = this.markerList.find(e => e.title === this.selectedVenue)
      return this.foundMarker;
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

    addMarkerToState=()=>{
      this.setState({marker: this.markerService.toggleInfo()});
    }

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
                    locations={this.state.locations}
                    activate={(venue)=>this.markerService.activate(venue)}
                />
                <Map
                    addMarker={(marker,f)=>this.markerService.add(marker,f)}
                    toggleInfo={()=>this.markerService.toggleInfo()}
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
