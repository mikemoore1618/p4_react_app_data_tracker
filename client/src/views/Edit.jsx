import React, { Component } from 'react'
import axios from 'axios'
import { formattedDate } from '../helpers'
import InputForm from './InputForm'

const apiClient = axios.create()

class Edit extends Component {
    state = {
        sleep:'',
        stress:'',
        energy: '',
        mood: '',
        diet: '',
        createdAt: formattedDate(new Date(), 'YYYY-MM-DD')
    }

    componentDidMount() {
        let { id } = this.props.match.params
        // console.log(id)
        apiClient({ method: 'get', url: `/api/metrics/${id}` })
        .then(response => {
            // console.log(response.data, this)
            let { payload } = response.data
            this.setState({ metric: payload, sleep: payload.sleep, stress: payload.stress, energy: payload.energy, mood: payload.mood, diet: payload.diet, createdAt: payload.createdAt })
        })
        
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let { sleep, stress, energy, mood, diet } = this.state
        let { id } = this.props.match.params
        apiClient({ 
            method: 'patch', 
            url: `/api/metrics/${id}`,
            data: { sleep, stress, energy, mood, diet }
         })
         .then(response => {
            //  console.log(response)
             this.props.history.push(`/metrics/${id}`)
         })
    }

    render() {
    return(
        <div>
        <InputForm />
    </div>
        )
    }
}

export default Edit