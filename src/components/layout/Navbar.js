import React, {Component} from 'react';
import 'materialize-css/js/sidenav';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedInLinksMobile from './SignedInLinksMobile';
import SignedOutLinksMobile from './SignedOutLinksMobile';
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
        const linksMobile = auth.uid ? <SignedInLinksMobile profile={profile}/> : <SignedOutLinksMobile/>
        const logo = auth.uid ? <Link to='/dashboard' className="logo bold blue-color-accent">Sampetrinos.com</Link> : <Link to='/' className="logo bold blue-color-accent">Sampetrinos.com</Link>
        return(
            <div>
                <div className="navbar-fixed">
                    <nav className="nav-wrapper white">
                        <div className="container">
                            <a href="#" className="sidenav-trigger" data-target="mobile-links"><i className="material-icons blue-color-accent">menu</i></a>
                            {auth.isLoaded && links}
                            {auth.isLoaded && logo}
                        </div>
                    </nav>
                </div>

                <ul id="mobile-links" className="sidenav">
                    <li>{linksMobile}</li>
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