import React from "react";
import Paper from "./Paper.js";

/**
 * Filtering of the Papers page
 * 
 * Javascript class for updating and filtering the Paper page. The possible filters are search
 * by paper title and abstract, as well as possible awards. The class also slices the papers
 * list to 10 per page which are then displayed and navigable by the created previous and next buttons
 * 
 * @author Bob Auchterlounie
 */
class Papers extends React.Component {

    constructor(props) {
        super(props)
        this.state = { results : [] }
    }

    componentDidMount() {
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
        this.fetchData(url)
    }

    //fetches the JSON data from the papers api
    fetchData = (url) =>{
        if (this.props.authorid !== undefined) {
            url += "?author_id=" + this.props.authorid
        } else if (this.props.randomPaper) {
            url += "?id=random"
        } else if(this.props.award !== undefined && this.props.award !== "") {
            url += "?award=" + this.props.award
        }

        fetch(url)
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });     
    }

    //refreshes the page if an award has been changed by the user
    componentDidUpdate(prevProps) {
        if (prevProps.award !== this.props.award) {
            let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/papers"
            this.fetchData(url)
        }
    }

    //filters the paper to only the one selected by the user
    filterByAward = (paper) => {
        return ((paper.award === this.props.award) || (this.props.award===""))
    }

    //filters the papers by either title or abstract when the user types in the searchbox
    filterSearch = (s) => {
        return (
            s.title.toLowerCase().includes(this.props.search.toLowerCase()) 
         || s.abstract.toLowerCase().includes(this.props.search.toLowerCase())
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
            const pageSize = 10
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
                {/*Use filteredResults*/filteredResults.map( (paper, i) => (<div className="paperResults" key = {i}><Paper paper={paper}/> </div>) )}
                {buttons}
            </div>

            
        )
    }
}

export default Papers;