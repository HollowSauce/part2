import React from "react";

/**
 * A dropdown list for selecting papers by award
 * 
 * The awards are hardcoded here to be referenced by award_id which is passed to the author and paper
 * api endpoints
 * 
 * @author Bob Auchterlounie
 */

class SelectAward extends React.Component {

    render() {
        return (
            <label>
                Award:
                <select value={this.props.award} onChange={this.props.handleAwardSelect}>
                    <option value="">Any</option>
                    <option value="any">At least one</option>
                    <option value="1">Best paper</option>
                    <option value="2">Best paper honourable mention</option>
                    <option value="3">Best pictorial</option>
                    <option value="4">Best pictorial honourable mention</option>
                    <option value="5">Special recognition for diversity and inclusion</option>
                </select>
            </label>
                
        )
    }
}

export default SelectAward;