import React, {Component} from 'react'
import SearchList from "./SearchList";

class Sidebar extends Component{
    closeSidebar = () => {
      if (window.screen.availWidth < 600)  {
        window.document.querySelector('.sidebar').style.display = 'none';
        window.document.querySelector('.fas.fa-search-location').style.display = 'block';
      }
    }


    render(){
        return(
            <aside className='sidebar'>
                <header className='header'>
                    <h1>
                        Westchester Bakeries
                    </h1>
                    <i className="fas fa-times-circle" onClick={()=>this.closeSidebar()}></i>
                </header>
                <SearchList
                    filterLocations={(query)=>this.props.filterVenues(query)}
                    clickListItem={(venue)=>this.props.clickListItem(venue)}
                    locations={this.props.locations}
                />
            </aside>
        )
    }
}

export default Sidebar;
