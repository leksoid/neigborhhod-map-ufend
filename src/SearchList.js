import React, {Component} from 'react'

class SearchList extends Component{

    state = {
        query: ''
    };

    updateQeury = (query)=>{
        this.setState({query: query.trim()})
    };

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default SearchList;