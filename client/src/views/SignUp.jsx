import React from 'react'
import httpClient from '../httpClient'
import { Button } from 'semantic-ui-react'

class SignUp extends React.Component {

  state = {
    fields: { name: '', email: '', password: '' }
  }

  onInputChange(evt) {
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault()
    // console.log('signing up')
    httpClient.signUp(this.state.fields).then((user) => {
        this.setState({ fields: { name: '', email: '', password:'' } })
        if(user) {
            this.props.onSignUpSuccess()
            this.props.history.push('/')
        }
    })
  }

  render() {
    const { name, email, password } = this.state.fields
    return (
      <div>
            <h1>Sign Up</h1>
            <form
              onChange={this.onInputChange.bind(this)}
              onSubmit={this.onFormSubmit.bind(this)}
            >
              <input type="text" placeholder="Name" name="name" autoComplete="off" value={name}/>
              <br/>
              <br/>
              <input type="text" placeholder="Email" name="email" autoComplete="off" value={email}/>
              <br/>
              <br/>
              <input type="password" placeholder="Password" name="password" autoComplete="off" value={password}/>
              <br/>
              <br/>
              <Button>Submit</Button>
            </form>
          </div>
    )
  }
}

export default SignUp