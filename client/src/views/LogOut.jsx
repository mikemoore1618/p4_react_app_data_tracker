import React from 'react'
import { Redirect } from 'react-router-dom'
import httpClient from '../httpClient'

class LogOut extends React.Component {

    componentDidMount() {
        httpClient.logOut()
        this.props.onLogOutSuccess()
        // console.log('logging out')
    }
    render() {
        return <Redirect to='/login'/>
    }
}

export default LogOut