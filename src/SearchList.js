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

    render(){
        const {query} = this.state;
        return(
            <div>
                <input
                    className='search-venues'
                    type='text'
                    placeholder='Search venues ...'
                    value={query}
                    onChange={(event)=> this.updateQeury(event.target.value)}
                />
                <ul className='venues-list'>
                    {this.props.locations != null ? this.props.locations.map((venue)=>(
                        <li
                            key={venue.id}
                            onClick={()=>this.props.clickListItem(venue.name)}
                        >
                            <p>{venue.name}</p>
                        </li>
                        )

                    ) : (
                      <p>No venues found, some Foursquare API error</p>
                    )}
                </ul>
            </div>
        )
    }
}

export default SearchList;
