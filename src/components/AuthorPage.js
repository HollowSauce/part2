import React from "react";
import Authors from "./Authors.js";
import SelectAward from "./SelectAward.js";
import SearchBox from "./SearchBox.js";

/**
 * Author page for part2
 * 
 * Handles the previous and next buttons as well as returning all the correct display information
 * from other classes within a div
 * 
 * @author Bob Auchterlounie
 */
class AuthorPage extends React.Component {
    // Add search to state
    constructor(props) {
        super(props)
        this.state = {
            award: "",
            search: "",
            page: 1
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAwardSelect = this.handleAwardSelect.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    /*
    The reason why we are passing the ````handlAwardSelectmethod as a prop is because this method
    needs to update state in the parent component. If the method is defined directly in the``` 
    component it will not be able to do this. Therefore, a method needs to be passed from parent 
    to child.*/

    // Add a handler method
    handleSearch = (e) => {
        this.setState({search:e.target.value, page:1})
    }

    //can do like this way for anything
    handleAwardSelect = (e) => {
        this.setState({award:e.target.value, page:1})
    }

    /**
     * New method for handling the 'next' button
     */
    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }

    /**
     * New method for handling the 'previous' button
     */
    handlePreviousClick = () => {
    this.setState({page:this.state.page-1})
    }

    // Add the <SearchBox /> component with props
    render() {
        //console.log(this.state.award)
        return (
            <div>
                <SearchBox search={this.state.search} handleSearch={this.handleSearch} />
                <SelectAward award={this.state.award} handleAwardSelect={this.handleAwardSelect} />
                <Authors award={this.state.award} 
                    search={this.state.search}
                    page={this.state.page} 
                    handleNextClick={this.handleNextClick} 
                    handlePreviousClick={this.handlePreviousClick}/>
            </div>
       
        )
    }
}

export default AuthorPage;