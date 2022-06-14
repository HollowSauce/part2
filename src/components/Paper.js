import React from "react";
import Authors from "./Authors.js";

/**
 * Shows information about specific paper
 * 
 * Each paper is its own element, when clicked the details of the abstract, author and award correlating to that author
 * are displayed which are gathered from the papers api
 * 
 * @author Bob Auchterlounie
 */
class Paper extends React.Component {

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
        let details = "";

        if (this.state.display) {
            
            details = <div>
                        <p>{this.props.paper.abstract}</p>
                        <Authors paperid={this.props.paper.paper_id}/>
                      </div>
        }    

        return(
            <div>
                <p onClick={this.handleClick}>{this.props.paper.title}</p>
                {details}
            </div>
        )
    }
}

export default Paper;