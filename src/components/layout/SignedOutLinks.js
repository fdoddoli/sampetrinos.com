import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return(
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/signup' className='blue-color-accent'>Sign Up</NavLink></li>
            <li><NavLink to='/signin' className='blue-color-accent'>Login</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;