import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'

class SearchList extends Component{

    state = {
        query: ''
    };

    updateQeury = (query)=>{
        this.setState({query: query})
        this.props.filterLocations(query);
    };

    dosomething = () => {
      if (window.screen.availWidth < 600) {
        window.document.querySelector('.sidebar').style.display = 'none';
        window.document.querySelector('.fas.fa-search-location').style.display = 'block';
      }
    }

    render(){
        const {query} = this.state;
        return(
            <nav>
                <input
                    className='search-venues'
                    type='text'
                    placeholder='Search venues ...'
                    value={query}
                    onChange={(event)=> this.updateQeury(event.target.value)}
                    aria-label="Search Field"
                />
                <ul className='venues-list'>
                    {this.props.locations != null ? this.props.locations.map((venue)=>(
                        <li
                            tabIndex={0}
                            aria-label={`Bakery name`}
                            key={venue.id}
                            onClick={()=>{
                              this.props.clickListItem(venue.name)
                              this.dosomething();
                            }}
                            role="listitem button"
                        >
                            <p>{venue.name}</p>
                        </li>
                        )

                    ) : (
                      <p>No venues found, some Foursquare API error</p>
                    )}
                </ul>
            </nav>
        )
    }
}

export default SearchList;
