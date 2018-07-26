import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const NavBar = (props) => {
    return(
        <div className='NavBar'>
        {props.currentUser
            ? (
                <Fragment>
                    <Link to='/'>{props.currentUser.name}'s Data</Link>
                    <Link to='/create'>Add</Link>
                    <Link to='/logout'>Log Out</Link>
                    
                    
                </Fragment>
            )
            : (
                <Fragment>
                    <Link to='/login'>Log In</Link>
                    <Link to='/signup'>Sign Up</Link>
                </Fragment>
            )
        }
        </div>
    )
}

export default NavBar