import React from 'react';

/**
 * Creates a log out button
 * 
 * html button with onClick property to log out
 * 
 * @author Bob Auchterlounie
 */
class Logout extends React.Component {

render() {
  return (
    <div>
      <button id="logOut" onClick={this.props.handleLogoutClick}>Log out</button>
    </div>
  );
}
}

export default Logout;