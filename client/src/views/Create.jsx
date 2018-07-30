import React, { Component } from 'react';
import httpClient from '../httpClient'
import { formattedDate } from '../helpers'
import InputForm from './InputForm'
import { Modal } from 'semantic-ui-react'

class Create extends Component {
    state = {
        metric: {
            sleep: '',
            stress: '',
            mood: '',
            meditation: '',
            energy: '',
            diet: '',
            exercise: '',
            createdAt: formattedDate(new Date(), 'YYYY-MM-DD'),
        },
        open: false
    }

    openModal = () => this.setState({ open: true });
    closeModal = () => this.setState({ open: false });

    handleChange = (event) => {
        event.preventDefault()
        // console.log(event.target.name, event.target.value)
        this.setState({ metric: { ...this.state.metric, [event.target.name]: event.target.value } })
    }

    handleSubmit = (event) => {
        const { metric } = this.state
        // event.preventDefault()
        httpClient({
            method: 'post',
            url: '/api/metrics',
            data: { ...metric, createdAt: (new Date(metric.createdAt)) }  // .toGMTString()?
        }).then(apiResponse => {
            // console.log("Metric created???")
            // this.closeModal()
            this.props.history.push('/')
        })
        //add to list without refreshing page (this.state.metrics array?)

    }

    render() {
        return (
            <div>
                <Modal size='mini' open onClose={this.props.history.goBack}>
                    <Modal.Header>Add Data</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <InputForm
                                open={this.state.open}
                                metric={this.state.metric}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                closeModal={this.closeModal}
                            />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>

        )
    }
};

export default Create