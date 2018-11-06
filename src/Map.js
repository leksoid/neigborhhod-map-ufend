import React, {Component} from 'react'

const ApiKey = 'AIzaSyCdH-NvXfoWzdwnhd2xYP7DsIQ54kSRAic';
const FAPI_CLIENT_ID = 'H4MWPFTV2MD22GEGS2HYNECXWWNOQBU0AHIB5PSJG0U4LRN4';
const FAPI_CLIENT_SECRET = 'FEJNQMXTTUJBI1MCVMIRKGAGRAUKFSLR423UKN0LSII3YTT1';
let map;
let style = [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#dec55c"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 65
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "color": "#fcb32c"
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#5fa7cd"
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]

class Map extends Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }

    state = {
        isScriptReady: false,
    };

    getVenueId = (marker) => {
        let p = marker.getPosition().toUrlValue();
        let request = new Request(`https://api.foursquare.com/v2/venues/search?ll=${p}&client_id=${FAPI_CLIENT_ID}&query=${marker.title}&client_secret=${FAPI_CLIENT_SECRET}&llAcc=1000&radius=1000&v=20181029&limit=1`,{
            method: 'GET'
        });
        return fetch(request)
            .then((response) => response.json())
            .then((result) => {
                return result.response.venues.length > 0 ? result.response.venues[0].id : "No venue found in DB";
            });
    };

    displayFoursquareData = (marker,info) => {
        this.getVenueId(marker)
            .then(id => {
                let detailsRequest = new Request(`https://api.foursquare.com/v2/venues/${id}?client_id=${FAPI_CLIENT_ID}&client_secret=${FAPI_CLIENT_SECRET}&v=20181029`);
                fetch(detailsRequest)
                    .then((response)=>response.json())
                    .then((result)=>{
                        info
                            .setContent(`<div class="infoWindow" id="${result.response.venue.id}">
                                            <h4><a href="${result.response.venue.url}" target="_blank">${marker.title}</a></h4>
                                            <h5>People say!</h5>
                                            <p>...<i>${result.response.venue.tips.groups[0].items[0].text}</i>...</p>
                                            <img src="${result.response.venue.bestPhoto.prefix}100x100${result.response.venue.bestPhoto.suffix}"> 
                                            <p>Provided by <a href="https://developer.foursquare.com/" target="_blank">Foursquare API</a></p>
                                         </div>`)
                    })
            });
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
                {title: 'By The Way Bakery', location: {"lat": 40.9974559, "lng": -73.8778848}},
                {title: 'Red Barn Bakery', location: {"lat": 41.038161, "lng": -73.870015}},
                {title: 'Domenicks Nepperhan Italian', location: {"lat": 40.974258, "lng": -73.86907}},
                {title: 'Lulu Cake Boutique', location: {"lat": 41.0032598, "lng": -73.8564513}}
            ];
            map = new window.google.maps.Map(this.mapRef.current, {
                center: {lat: this.props.lat, lng: this.props.lng},
                zoom: this.props.zoom,
                styles: style,
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
                let info = new window.google.maps.InfoWindow();
                marker.addListener('click', ()=> {
                    console.log(marker.position);
                    info.open(map, marker);
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    this.displayFoursquareData(marker,info);
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