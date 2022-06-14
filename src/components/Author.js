import React from "react";
import Papers from "./Papers.js";

/**
 * Shows information about specific author
 * 
 * Each author is its own element, when clicked the details of the paper correlating to that author
 * are displayed which are gathered from the authors api
 * 
 * @author Bob Auchterlounie
 */
class Author extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    handleClick = () => {
        this.setState({display:!this.state.display})
    }

    render() {
        let details = ""

        if (this.state.display) {
            
            details = <div>
                        <Papers authorid={this.props.author.author_id}/>
                      </div>
        }    

        return(
            <div>
                <p onClick={this.handleClick}>{this.props.author.first_name} {this.props.author.last_name}</p>
                {details}
            </div>
        )
    }
}

export default Author;