import React, { Component } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Map from "./Map";
import escapeRegExp from 'escape-string-regexp'

const FAPI_CLIENT_ID = 'H4MWPFTV2MD22GEGS2HYNECXWWNOQBU0AHIB5PSJG0U4LRN4';
const FAPI_CLIENT_SECRET = 'FEJNQMXTTUJBI1MCVMIRKGAGRAUKFSLR423UKN0LSII3YTT1';

class App extends Component {

    state = {
        baseLat: 29.7844913,
        baseLng: -95.7800231,
        zoom: 10,
        locations: [],
        filteredLocations: []
    };

    componentDidMount() {
          this.getAllVenuesOnMapLoad().then((locations) => {
              this.setState({
                locations: locations,
                filteredLocations: locations
              })
          })
      }

    getAllVenuesOnMapLoad = () => {
        let request = new Request(`https://api.foursquare.com/v2/venues/search?ll=41.0111915,-73.8486300&client_id=${FAPI_CLIENT_ID}&query=bakery&client_secret=${FAPI_CLIENT_SECRET}&v=20181029`,{
            method: 'GET'
        });
        return fetch(request).then(res => res.json())
            .then(data => data.response.venues)
            .catch(error => console.error(error))
    };

    clickListItem = (venue) => {
      this.setState({ venueFromList: venue})
    }

    updateQuery = (query) => {
      this.setState({
        ...this.state,
        venueFromList: null,
        filteredLocations: this.filterVenues(this.state.locations, query)
      });
    }

    filterVenues = (locations, query) => {
      const match = new RegExp(escapeRegExp(query),'i');
      return locations.filter((venues) => match.test(venues.name))
    }

    dosomething = () => {
      if (window.screen.availWidth < 600) {
        window.document.querySelector('.sidebar').style.display = 'block';
        window.document.querySelector('.fas.fa-search-location').style.display = 'none';
      }

    }

    render(){
        return (
            <div className='app'>
              <div><i class="fas fa-search-location" onClick={()=>this.dosomething()}/></div>
                <Sidebar
                    filterVenues={this.updateQuery}
                    locations={this.state.filteredLocations}
                    clickListItem={this.clickListItem}
                />
                <Map
                    dataVenues={this.state.filteredLocations}
                    selectedVenue={this.state.venueFromList}
                    lat={this.state.baseLat}
                    lng={this.state.baseLng}
                    zoom={this.state.zoom}
                />
            </div>
        )
    }
}

export default App;
