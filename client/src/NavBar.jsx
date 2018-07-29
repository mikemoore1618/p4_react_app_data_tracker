import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Create from './views/Create'
import { Button } from 'semantic-ui-react'


// float-right
const NavBar = (props) => {
    return (
        <div className='NavBar'>
            {props.currentUser
                ? (
                    <Fragment>
                        <Link to='/'><h3>{props.currentUser.name}'s Data</h3></Link>

                        <Button id='add-btn'>
                            <Create />
                            </Button>

                        <Link to='/logout'>
                            <Button id='logout-btn'className='float-right'>Log Out</Button>
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