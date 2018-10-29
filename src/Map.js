import React, {Component} from 'react'

const ApiKey = 'AIzaSyCdH-NvXfoWzdwnhd2xYP7DsIQ54kSRAic';
const FAPI_CLIENT_ID = 'H4MWPFTV2MD22GEGS2HYNECXWWNOQBU0AHIB5PSJG0U4LRN4';
const FAPI_CLIENT_SECRET = 'FEJNQMXTTUJBI1MCVMIRKGAGRAUKFSLR423UKN0LSII3YTT1';
let map;

class Map extends Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }

    state = {
        isScriptReady: false,
    };

    displayFInfo = (marker) => {
        let p = marker.getPosition().toUrlValue();
        let request = new Request(`https://api.foursquare.com/v2/venues/search?ll=${p}&client_id=${FAPI_CLIENT_ID}&client_secret=${FAPI_CLIENT_SECRET}&llAcc=10&radius=100&v=20181029`,{
            method: 'GET'
        });
        fetch(request).then((response) => console.log(response.json()));
    };

    componentDidMount() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', () => {
            this.setState({ isScriptReady: true });
        });
        document.body.appendChild(script);
    }

    componentDidUpdate() {
        if (this.state.isScriptReady) {
            let bounds = new window.google.maps.LatLngBounds();
            let markers =[];
            let locations = [
                {title: 'Riviera Bakehouse', location: {"lat": 41.0111915, "lng": -73.8486300}},
                {title: 'By the Way Bakery', location: {lat: 40.9974559, lng: -73.8778848}},
                {title: 'Red Barn Bakery', location: {lat: 41.038161, lng: -73.870015}},
                {title: 'Domenicks Nepperhan Italian', location: {lat: 40.974258, lng: -73.86907}},
                {title: 'Lulu Cake Boutique', location: {lat: 41.0032598, lng: -73.8564513}}
            ];
            map = new window.google.maps.Map(this.mapRef.current, {
                center: {lat: this.props.lat, lng: this.props.lng},
                zoom: this.props.zoom,
            });
            for (let i = 0; i < locations.length; i++) {
                let position = locations[i].location;
                let title = locations[i].title;
                let marker = new window.google.maps.Marker({
                    position: position,
                    title: title,
                    animation: window.google.maps.Animation.DROP,
                    id: i
                });
                markers.push(marker);
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
                let info = new window.google.maps.InfoWindow({
                    content: `${marker.title}`
                });
                marker.addListener('click', ()=> {
                    console.log(marker.position);
                    info.open(map, marker);
                    this.displayFInfo(marker);
                });
            }
            map.fitBounds(bounds);
        }
    }


    render(){
        return(
            <div
                className='map'
                ref={this.mapRef}
                role='application'
                aria-label='map'
            >
            </div>
        )
    }
}

export default Map