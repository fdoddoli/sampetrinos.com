import React, {Component} from 'react';
import 'materialize-css/js/sidenav';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';



class Navbar extends Component{


   componentDidMount(){
        const elems = window.document.querySelectorAll('.sidenav');
        const options = {}
        window.M.Sidenav.init(elems, options);
    }
    
    render(){
        const {auth, profile} = this.props;
        const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
        return(
            <div>
                <nav className="nav-wrapper white">
                    <div className="container">
                        <a href="#" className="sidenav-trigger" data-target="mobile-links"><i className="material-icons black-text">menu</i></a>
                        <Link to='/' className="brand-logo black-text">Sampetrinos.com</Link>
                        {auth.isLoaded && links}
                    </div>
                </nav>

                <ul id="mobile-links" className="sidenav">
                    <li>{links}</li>
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);