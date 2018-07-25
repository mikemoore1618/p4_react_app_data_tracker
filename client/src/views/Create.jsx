import React, { Component } from 'react';
import axios from 'axios'
import { formattedDate } from '../helpers'
import InputForm from './InputForm'

const apiClient = axios.create()

class Create extends Component {
    state = {
        sleep:'',
        stress:'',
        energy: '',
        mood: '',
        diet: '',
        createdAt: formattedDate(new Date(), 'YYYY-MM-DD')
    }

    handleChange = (event) => {
        event.preventDefault()

        // console.log(event.target.name, event.target.value)
        this.setState({ [event.target.name]:event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event.target)
        // console.log(this.state)
        // let { sleep, stress, energy, mood, diet } = this.state
        apiClient({ 
            method: 'post', 
            url: '/api/metrics',
            data: { ...this.state, createdAt: (new Date(this.state.createdAt)).toGMTString() }
        })
            .then(response => {
                // console.log(response)
                this.props.history.push('/metrics')
            })
    }

    render() {
        return (
            <div>
            <InputForm />
 
            </div>

        )
    }
};

export default Create