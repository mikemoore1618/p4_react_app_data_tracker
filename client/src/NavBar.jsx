import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Create from './views/Create'


// float-right
const NavBar = (props) => {
    return(
        <div className='NavBar'>
        {props.currentUser
            ? (
                <Fragment>
                    <Link to='/'>{props.currentUser.name}'s Data</Link>
                    
                    <button>
                        <Create />
                    </button>

                    <Link to='/logout'>
                        <button className='float-right'>Log Out</button>
                    </Link>
                    
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