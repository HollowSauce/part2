import React from "react";

/**
 * Creates an instance of checkbox for each paper
 * 
 * Each paper is assigned a checkbox with relating paper_id. Depending on the activity of the checkbox
 * (clicked or unlicked) it adds and removes the paper_id correlating to that box to the readinglist table
 * along with the userid which is passed in from readinglist
 * 
 * @author Bob Auchterlounie
 */
class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {checked:false}
    }
   
    componentDidMount() {
        let filteredList = this.props.readinglist.filter((item) => (this.isOnList(item)))
        if (filteredList.length > 0) {
            this.setState({checked:true})
        } 
    }
    
    /* If the checkbox is on the list it sets the checkbox item*/
    isOnList = (item) => {
        return (item.paper_id === this.props.paper_id)
    }

    // Handles the change of the checkbox (ticked or unticked)
    handleOnChange = () => {
        if (this.state.checked) {
            this.removeFromReadingList()
        } else {
            this.addToReadingList()
        }
    }

    /*Adds the paper_id relating to the checkbox clicked to the readinglist table */
    addToReadingList = () => {   
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/readingList"
    
        let formData = new FormData();
        formData.append('token', localStorage.getItem('myReadingListToken'));
        formData.append('add', this.props.paper_id);
    
        fetch(url, {   method: 'POST',
            headers : new Headers(),
            body:formData})
            .then( (response) => { 
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState({checked:!this.state.checked})
                } else {
                    throw Error(response.statusText);
                }
            })
            .catch ((err) => { 
                console.log("something went wrong ", err) 
            });
        }
    
    /*Removes the paper_id relating to the checkbox clicked to the readinglist table */
    removeFromReadingList = () => {
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/readingList"
         
        let formData = new FormData();
        formData.append('token', localStorage.getItem('myReadingListToken'));
        formData.append('remove', this.props.paper_id);
    
        fetch(url, {  method: 'POST',
                      headers : new Headers(),
                      body:formData})
        .then( (response) => {
            if ((response.status === 200) || (response.status === 204)) {
                this.setState({checked:!this.state.checked})
            } else {
                throw Error(response.statusText);
            }
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    render() {
        return (
            <input
              type="checkbox" 
              id="readlist" 
              name="readlist" 
              value="paper" 
              checked={this.state.checked}
              onChange={this.handleOnChange}
            />
        )
    }
}
    
export default CheckBox;