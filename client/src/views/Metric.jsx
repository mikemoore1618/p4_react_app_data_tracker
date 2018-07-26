import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { formattedDate } from '../helpers'
import { Modal } from 'semantic-ui-react'


const apiClient = axios.create()

class Metric extends React.Component {
    state = { 
        metric: []
    }

    componentDidMount() {
        const id = this.props.match.params.id

        apiClient({ method: 'get', url: `/api/metrics/${id}`}).then((apiResponse) => {
            // console.log(apiResponse.data.payload)
            this.setState({ metric: apiResponse.data.payload })
        })
      }

      deleteMetric = (event) => {
          event.preventDefault()
        //   console.log('clicked')
        let { id } = this.props.match.params
        apiClient({
            method: 'delete',
            url: `/api/metrics/${id}`
        })
        .then(response => {
            this.props.history.push('/')
        })
      }

     
  render() {
      const { metric } = this.state
      if(!metric) return <h1>Loading...</h1>
    return (
        <div>
            <Modal trigger={<a>Metric Modal</a>}>
            <Modal.Header>{ formattedDate(metric.createdAt) }</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <BarChart width={600} height={300} data={[metric]}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="sleep" fill="#4198f4" />
                            <Bar dataKey="stress" fill="#f44242" />
                            <Bar dataKey="mood" fill="#f4dc41" />
                            <Bar dataKey="energy" fill="#41f47c" />
                            <Bar dataKey="diet" fill="#f49741" />
                        </BarChart>

                        <a href='#' onClick={this.deleteMetric}>Delete</a>
                        <Link to={`/metrics/${metric._id}/edit`}>Edit</Link>

                    </Modal.Description>
                </Modal.Content>
             </Modal>
            
        </div>
    )
  }
}

export default Metric



