import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { formattedDate } from '../helpers'



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
            <h1>{ formattedDate(metric.createdAt) }</h1>
            {/* <ul>
                <li>Sleep: { metric.sleep }</li>
                <li>Stress: { metric.stress }</li>
                <li>Mood: { metric.mood }</li>
                <li>Energy: { metric.energy }</li>
                <li>Diet { metric.diet }</li>
            </ul> */}
            
            <BarChart width={600} height={300} data={[metric]}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="sleep" fill="#0000ff" />
                <Bar dataKey="stress" fill="#ff0000" />
                <Bar dataKey="mood" fill="#ffff00" />
                <Bar dataKey="energy" fill="#008000" />
                <Bar dataKey="diet" fill="#ffa500" />
            </BarChart>

            <a href='#' onClick={this.deleteMetric}>Delete</a>
            <Link to={`/metrics/${metric._id}/edit`}>Edit</Link>

        </div>
    )
  }
}

export default Metric



