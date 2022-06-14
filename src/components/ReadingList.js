import React from "react";
import Paper from "./Paper";
import CheckBox from "./CheckBox";

/**
 * Gathers information for the readinglist from papers and readingList api
 * 
 * Gathers the list of papers from the papers api initially then uses the login token gathered
 * from readingListPage, sending it to the readingList api, returning a result set of which papers the
 * user has contained in their readinglist. Noticable by a ticked checkbox
 * 
 * @author Bob Auchterlounie
 */
class ReadingList extends React.Component {
 
    constructor(props){
        super(props)
        this.state = {
            results : [],
            readinglist : []
        }
    }
   
    componentDidMount() {
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/papers" 
    
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

        url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/readingList"

        let formData = new FormData();
        formData.append('token', localStorage.getItem('myReadingListToken'));

        fetch(url, {    method: 'POST',
                        headers : new Headers(),
                        body:formData})
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({readinglist:data.results})
            })
        .catch ((err) => { 
                console.log("something went wrong ", err) 
        });
    }

    render() {
        console.log(this.state.readinglist)
        return (
            <div>
                {this.state.results.map( (paper) => (                     
                    <div class="paperResults" key={paper.paper_id}>
                        <CheckBox readinglist={this.state.readinglist} paper_id={paper.paper_id} />
                        <Paper paper={paper}/> 
                    </div> 
                    ) 
                )}
            </div>
        )
    }
}
   
export default ReadingList;