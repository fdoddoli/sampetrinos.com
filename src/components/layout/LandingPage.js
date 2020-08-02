import React, {Component} from 'react';
import 'materialize-css/js/parallax';

class LandingPage extends Component{
    
    componentDidMount(){
        const elems = window.document.querySelectorAll('.parallax');
        const options = {}
        window.M.Parallax.init(elems, options);
    }
    
    render(){
        return(
            <div className="container">
                <div className="header">
                    <h3 className="bold center title-landing-page">Welcome to Sampetrinos</h3>
                    <h6 className="text-landing-page">Sampetrinos is an online directory that connects people who are interested in each other.</h6>
                    <h6 className="text-landing-page">Only the people you like will be able to see you. (Girls Only)</h6>
                </div>
                <div className="usage">
                    <h6 className="bold text-landing-page">You can use Sampetrinos to:</h6>
                    <h6 className="text-landing-page">Like people (Girls Only)</h6>
                    <h6 className="text-landing-page">Discover who likes you</h6>
                    <h6 className="text-landing-page">Chat with people you like who also like you back</h6>
                </div>
                <div className="action">
                <h6 className="text-landing-page">To get started, click sign up to register. If you already have an account, click login.</h6>
                </div>
            </div>
            
        )
    }
} 

export default LandingPage;