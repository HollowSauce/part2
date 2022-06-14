import React from 'react';


/**
 * Creates a login input with log in button
 * 
 * Simple imput fields with a button with an onClick property
 * 
 * @author Bob Auchterlounie
 */
class Login extends React.Component {

render() {
  return (
    <div>
       <input
         type='text' 
         placeholder='email'
         value={this.props.email}
         onChange={this.props.handleEmail}
       />
       <input
         type='password' 
         placeholder='password'
         value={this.props.password}
         onChange={this.props.handlePassword}
       />
      <button onClick={this.props.handleLoginClick}>Log in</button>
    </div>
  );
}
}

export default Login;