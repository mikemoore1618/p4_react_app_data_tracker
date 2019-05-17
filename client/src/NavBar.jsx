import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

const NavBar = (props) => {
    return (
        <div className='NavBar'>
            {props.currentUser
                ? (
                    <Fragment>
                        <Link to='/'><h2>{props.currentUser.name}</h2></Link>
                        <Link to="/metrics/new">
                            <a>Create</a>
                            <Icon id='add-btn' name='plus' size='large' />
                        </Link>
                        <Link className='float-right' to='/logout'>
                            <a>Logout</a>
                            <Icon id='logout-btn' name='log out' size='large' />
                        </Link>
                    </Fragment>
                )
                : (
                    <Fragment>
                        <Link to='/login'>
                            <Button>Log In</Button>
                        </Link>
                        <Link to='/signup'>
                            <Button>Sign Up</Button>
                        </Link>
                    </Fragment>
                )
            }
        </div>
    )
}

export default NavBar