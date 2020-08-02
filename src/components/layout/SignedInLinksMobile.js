import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinksMobile = (props) => {

    return(
        <div>
            <ul className="right show-on-small">
                <li><a onClick={props.signOut} className='blue-color-accent'>Log Out</a></li>
                <li><NavLink to='/profile-details' className='blue-color-accent'>
                    Profile
                </NavLink></li>
            </ul>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
   
}

export default connect(null, mapDispatchToProps)(SignedInLinksMobile);