import React, {Component} from 'react'

class Map extends Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }

    state = {
        isScriptReady: false,
    };

    componentDidMount() {
        const ApiKey = 'AIzaSyCdH-NvXfoWzdwnhd2xYP7DsIQ54kSRAic';
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
                {title: 'Riviera Bakehouse', location: {lat: 41.0107634, lng: -73.8490496}},
                {title: 'By the Way Bakery', location: {lat: 40.9974559, lng: -73.8778848}},
                {title: 'Red Barn Bakery', location: {lat: 41.038161, lng: -73.870015}},
                {title: 'Domenicks Nepperhan Italian', location: {lat: 40.974258, lng: -73.86907}},
                {title: 'Lulu Cake Boutique', location: {lat: 41.0032598, lng: -73.8564513}}
            ];
            let map = new window.google.maps.Map(this.mapRef.current, {
                center: {lat: 41.0085382, lng: -73.8683036},
                zoom: 12,
            });
            for (let i = 0; i < locations.length; i++) {
                // Get the position from the location array.

                let position = locations[i].location;
                let title = locations[i].title;
                // Create a marker per location, and put into markers array.
                let marker = new window.google.maps.Marker({
                    position: position,
                    title: title,
                    animation: window.google.maps.Animation.DROP,
                    id: i
                });
                // Push the marker to our array of markers.
                markers.push(marker);
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
                // Create an onclick event to open an infowindow at each marker.
                /*
                marker.addListener('click', function() {
                    populateInfoWindow(this, largeInfowindow);
                }); */
            }
            map.fitBounds(bounds);
        }
    }


    render(){
        return(
            <div className='map' ref={this.mapRef}>
            </div>
        )
    }
}

export default Map