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
            let map = new window.google.maps.Map(this.mapRef.current, {
                center: {lat: 41.0085382, lng: -73.8683036},
                zoom: 12,
            });
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