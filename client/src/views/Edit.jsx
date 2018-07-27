// import React, { Component } from 'react'
// import axios from 'axios'
// import { formattedDate } from '../helpers'
// import InputForm from './InputForm'
// import { Modal } from 'semantic-ui-react'

// const apiClient = axios.create()

// class Edit extends Component {
//     state = {
//         metric: null
//         // sleep:'',
//         // stress:'',
//         // energy: '',
//         // mood: '',
//         // diet: '',
//         // createdAt: formattedDate(new Date(), 'YYYY-MM-DD')
//     }

//     componentDidMount() {
//         let { id } = this.props.match.params
//         // console.log(id)
//         apiClient({ method: 'get', url: `/api/metrics/${id}` })
//         .then(response => {
//             // console.log(response.data, this)
//             let { payload } = response.data
//             this.setState({
//                 metric: {
//                     sleep: payload.sleep,
//                     stress: payload.stress,
//                     energy: payload.energy,
//                     mood: payload.mood,
//                     diet: payload.diet,
//                     createdAt: formattedDate(payload.createdAt, 'YYYY-MM-DD')
//                 }
//             })
//         })
        
//     }

//     handleChange = (event) => {
//         event.preventDefault()
//         this.setState({ metric: { ...this.state.metric, [event.target.name]: event.target.value } })
//     }

//     handleSubmit = (event) => {
//         event.preventDefault()
//         // let { sleep, stress, energy, mood, diet } = this.state.metric
//         let { id } = this.props.match.params
//         apiClient({ 
//             method: 'patch', 
//             url: `/api/metrics/${id}`,
//             data: this.state.metric
//          })
//          .then(response => {
//             //  console.log(response)
//              this.props.history.push(`/metrics/${id}`)
//          })
//     }

//     render() {
//         const { metric } = this.state
//         if(!metric) return <h1>Loading...</h1>
//         return(
//             <div>
//                 <Modal trigger={<a>Edit</a>}>
//                     <Modal.Header>Edit {metric.createdAt}</Modal.Header>
//                         <Modal.Content>
//                             <Modal.Description>
//                                     <InputForm
//                                         metric={metric}
//                                         onInputChange={this.handleChange}
//                                         onFormSubmit={this.handleSubmit}
//                                     />
//                             </Modal.Description>
//                         </Modal.Content>
//                 </Modal>
//             </div>
//         )
//     }
// }

// export default Edit