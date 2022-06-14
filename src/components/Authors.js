import React from "react";
import Author from "./Author.js";

/**
 * Filtering of the Authors page
 * 
 * Javascript class for updating and filtering the Author page. The possible filters are search
 * by author first and last name, as well as possible awards. The class also slices the authors
 * list to 25 per page which are then displayed and navigable by the created previous and next buttons
 * 
 * @author Bob Auchterlounie
 */
class Authors extends React.Component {

    constructor(props) {
        super(props)
        this.state = { results : [] }
    }

    componentDidMount() {
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/authors"
        this.fetchData(url)
       
    }

    //Refreshes the page if it finds awards has been changed
    componentDidUpdate(prevProps) {
        if (prevProps.award !== this.props.award) {
            let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/authors"
            this.fetchData(url)
        }
    }

    //fetches the json information found after changing the url
    fetchData = (url) => {
        if (this.props.paperid !== undefined) {
            url += "?paper_id=" + this.props.paperid
        } else if (this.props.award !== undefined && this.props.award !== "") {
            url += "?award=" + this.props.award
        }

        fetch(url)
        .then( (response) => {
            if(response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    //filters the results when searching author first or last name
    filterSearch = (s) => {
        return (
            s.first_name.toLowerCase().includes(this.props.search.toLowerCase()) 
         || s.last_name.toLowerCase().includes(this.props.search.toLowerCase())
        )
    }
    
    render() {
        let noData = "" 
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }
        
        let filteredResults = this.state.results
    
        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch) 
        }

        let buttons = ""
    
        /** 
        * New if statement here checking for page prop
        */
        if (this.props.page !== undefined) {
            const pageSize = 25
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
            
            buttons = (
               <div>
                   <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                   <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
               </div>
            )
            filteredResults = filteredResults.slice(pageMin,pageMax)
         }
    
        return (
            <div>
                {noData}
                {/*Use filteredResults*/filteredResults.map( (author, i) => (<div className="paperResults" key= {i}><Author author={author}/></div>) )}
                {buttons}
            </div>

            
        )
    }
}

export default Authors;