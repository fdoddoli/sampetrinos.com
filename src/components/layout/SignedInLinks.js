import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const SignedInLinks = (props) => {

    return(
        <div>
            <ul className="right hide-on-med-and-down">
                <li><a onClick={props.signOut} className='blue-color-accent'>Log Out</a></li>
                <li><NavLink to='/profile-details' className='btn btn-floating white blue-color-accent'>
                    {props.profile.initials}
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

export default connect(null, mapDispatchToProps)(SignedInLinks);