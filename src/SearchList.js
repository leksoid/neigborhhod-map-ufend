import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'

class SearchList extends Component{

    state = {
        query: ''
    };

    updateQeury = (query)=>{
        this.setState({query: query.trim()})
    };


    render(){
        const {query} = this.state;
        let searchResults;
        if(query){
            const match = new RegExp(escapeRegExp(query),'i')
            searchResults = this.props.locations.filter((venues) => match.test(venues.name))
        } else {
            searchResults = this.props.locations;
        }
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
                    {searchResults.map((venue)=>(
                        <li
                            key={venue.id}
                            onClick={()=>this.props.selectListItem(venue)}
                        >
                            <p>{venue.name}</p>
                        </li>
                        )

                    )}
                </ul>
            </div>
        )
    }
}

export default SearchList;