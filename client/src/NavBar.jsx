import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Create from './views/Create'

const NavBar = (props) => {
    return(
        <div className='NavBar'>
        {props.currentUser
            ? (
                <Fragment className='float-right'>
                    <Link to='/'>{props.currentUser.name}'s Data</Link>
                    <Link to='/logout'>Log Out</Link>
                    <button>
                        <Create />
                    </button>
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