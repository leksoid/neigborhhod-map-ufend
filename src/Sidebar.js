import React, {Component} from 'react'
import SearchList from "./SearchList";

class Sidebar extends Component{
    render(){
        return(
            <div className='sidebar'>
                <div className='header'>
                    <h1>
                        Westchester Bakeries
                    </h1>
                </div>
                <SearchList
                    filterLocations={(query)=>this.props.filterVenues(query)}
                    clickListItem={(venue)=>this.props.clickListItem(venue)}
                    locations={this.props.locations}
                />
                <div className='footer'></div>
            </div>
        )
    }
}

export default Sidebar;
