import React, {Component} from 'react'
import SearchList from "./SearchList";

class Sidebar extends Component{
    dosomething = () => {
      if (window.screen.availWidth < 600)  {
        window.document.querySelector('.sidebar').style.display = 'none';
        window.document.querySelector('.fas.fa-search-location').style.display = 'block';
      }
    }


    render(){
        return(
            <div className='sidebar'>
                <div className='header'>
                    <h1>
                        Westchester Bakeries
                    </h1>
                    <i class="fas fa-times-circle" onClick={()=>this.dosomething()}></i>
                </div>
                <SearchList
                    filterLocations={(query)=>this.props.filterVenues(query)}
                    clickListItem={(venue)=>this.props.clickListItem(venue)}
                    locations={this.props.locations}
                />
            </div>
        )
    }
}

export default Sidebar;
