import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOutLinksMobile = () => {
    return(
        <ul className="right show-on-small">
            <li><NavLink to='/signup' className='blue-color-accent'>Sign Up</NavLink></li>
            <li><NavLink to='/signin' className='blue-color-accent'>Login</NavLink></li>
        </ul>
    )
}

export default SignedOutLinksMobile;