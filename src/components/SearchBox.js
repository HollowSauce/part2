import React from "react";

/**
 * Text input to search through results
 * 
 * The search input is passed to whichever api endpoint is calling it and the results are filtered
 * depending on what the user enters
 * 
 * @author Bob Auchterlounie
 */
class SearchBox extends React.Component {

    render() {
           return (
               <label>
                   Search:
                   <input type='text' placeholder='search' value={this.props.search} onChange={this.props.handleSearch} />
               </label>
           )
       }
   }
   
export default SearchBox;