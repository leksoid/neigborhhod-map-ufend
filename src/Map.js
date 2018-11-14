import React, {Component} from 'react'

const ApiKey = 'AIzaSyCerM6vRi2bzbh7LCueDd5ujWhyhzVVjPQ';
const FAPI_CLIENT_ID = 'MXNSOZOYERHQ5M0YYOZXZ11PI3HHNSU1KNURXGRQ3CLQJQPY';
const FAPI_CLIENT_SECRET = 'BOHDDWLOIK3U0N3HXTBMJTW2JJR2YTGEZ5RGDN0L1VDXBA2B';;
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
                "visibility": "on"
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
                return result.response.venues != undefined ? result.response.venues[0].id : "No venue found in DB";
            }).catch(error => alert(`Foursquare API error: ${error}`));
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
                                            <h4><a href="${result.response.venue.url}" target="_blank" role="link">${marker.title}</a></h4>
                                            <h5>People say!</h5>
                                            <p>...<i>${result.response.venue.tips.groups[0].items[0].text}</i>...</p>
                                            <img src="${result.response.venue.bestPhoto.prefix}100x100${result.response.venue.bestPhoto.suffix}" alt="${marker.title} bakery">
                                            <p>Provided by <a href="https://developer.foursquare.com/" target="_blank">Foursquare API</a></p>
                                         </div>`)
                    })
            }).catch(error => alert(`Foursquare API error: ${error}`));
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
        script.onerror = window.gm_authFailure = () => {
          alert("Google Map authorization error. Either API key is invalid or the quota exceeded, try check again later");
        };
    }

    populateMapWithMarkers = () => {
        let locations = [];
        if (this.props.dataVenues !== undefined){
          for (let i=0;i<this.props.dataVenues.length;i++){
              let position = {
                  title: this.props.dataVenues[i].name,
                  location: {
                      "lat": this.props.dataVenues[i].location.lat,
                      "lng": this.props.dataVenues[i].location.lng}
              };
                  locations.push(position);
          }
        }
        return locations;
    };

    removeBounce = (marker) =>{
      setTimeout(function(){marker.setAnimation(null)},2000);
    }

    toggleMarkerInfoWindow = (info,map,marker) => {
      info.open(map,marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      this.removeBounce(marker);
      this.displayFoursquareData(marker,info);
    };

    componentDidUpdate() {
        let markers =[];
        if (this.state.isScriptReady) {
            let bounds = new window.google.maps.LatLngBounds();
            let locations = this.populateMapWithMarkers();
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
                    this.toggleMarkerInfoWindow(info,map,marker);
                });

            }
            map.fitBounds(bounds);
        }
        if (this.props.selectedVenue != undefined){
          let toggledMarker = markers.filter(e=>e.title === this.props.selectedVenue);
          let toggledInfo = new window.google.maps.InfoWindow();
          this.toggleMarkerInfoWindow(toggledInfo,map,toggledMarker[0]);
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
