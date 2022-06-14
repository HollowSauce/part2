import React from "react";
import Login from "./Login.js";
import Logout from "./Logout.js";
import ReadingList from "./ReadingList.js";

/**
 * Displays the page for the readinglist
 * 
 * Displays the sign in option to the readinglist. Once entered it is sent to the authenticate api
 * if the token is correct the readinglist is gatered from the readinglist api and displayed onto the
 * page with a logout button
 * 
 * @author Bob Auchterlounie
 */
class ReadingListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            authenticated: false, 
            email: "", 
            password: "",
            token: null
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('myReadingListToken')) {
            this.setState({
                authenticated:true,
                token: localStorage.getItem('myReadingListToken')
            });
        }
    }

    handleLoginClick = () => {
        let url = "http://unn-w18013532.newnumyspace.co.uk/kf6012/coursework/part1/api/authenticate" 
    
        // Send the email and password as 'Form Data'.
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
    
        // A fetch request with 'POST' method specified
        fetch(url, { method: 'POST',
                     headers : new Headers(),
                     body:formData
                   })
        .then( (response) => {
            // Successful authentication will return
            // a 200 status code.
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            console.log(data)
            // If results include a token, change state
            // to authenticated
            if ("token" in data.results) {
                this.setState({ 
                    authenticated: true,
                    token: data.results.token
                })
                localStorage.setItem('myReadingListToken', data.results.token);
            }
        })
        .catch ((err) => {
            console.log("something went wrong ", err)
            }
        );
    }

    //handles the logout click
    handleLogoutClick = () => {
        this.setState({
            authenticated:false,
            token: null
        })
        localStorage.removeItem('myReadingListToken');
    }

    //handles password  
    handlePassword = (e) => {
        this.setState({password:e.target.value})
    }

    //handles email
    handleEmail = (e) => {
        this.setState({email:e.target.value})
    }
	
    render() {

        let page = (
            <Login 
                handleEmail={this.handleEmail} 
                handlePassword={this.handlePassword}
                handleLoginClick={this.handleLoginClick}
            />
        )
        if (this.state.authenticated) {
            page = (
                <div>
                    <Logout handleLogoutClick={this.handleLogoutClick}/>
                    <ReadingList token={this.state.token}/>
                </div>
            )
        }

        return (
            <div>{page}</div>
        )
    }
}

export default ReadingListPage;