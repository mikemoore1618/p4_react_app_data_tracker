import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { formattedDate, inputCheck } from '../helpers'
import Calendar from 'react-calendar/dist/entry.nostyle'
// import Calendar from 'react-calendar';


const apiClient = axios.create()

class Metrics extends React.Component {
    state = {
        metrics:[]
}

componentDidMount() {
    apiClient({ method: 'get', url: '/api/metrics' }).then((apiResponse) => {
      this.setState({ metrics: apiResponse.data.payload })
    })
  }
  

render() {
  const formattedMetrics = this.state.metrics.map((m) => {
    return { ...m, createdAt: formattedDate(m.createdAt) }
  })
    return (
        <div>

            <LineChart width={600} height={300} data={formattedMetrics}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="createdAt"/>
              <YAxis dataKey=''/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="sleep" stroke="#0000ff" dot={null}/>
              <Line type="monotone" dataKey="stress" stroke="#ff0000" dot={null}/>
              <Line type="monotone" dataKey="mood" stroke="#ffff00" dot={null}/>
              <Line type="monotone" dataKey="energy" stroke="#008000" dot={null}/>
              <Line type="monotone" dataKey="diet" stroke="#ffa500" dot={null}/>
            </LineChart>

            
            <input type="checkbox" id="sleep" value="sleep" onClick={this.inputCheck}/>
            <input type="checkbox" id="stress" value="stress" onClick={this.inputCheck}/>
            <input type="checkbox" id="mood" value="mood" onClick={this.inputCheck}/>
            <input type="checkbox" id="energy" value="energy" onClick={this.inputCheck}/>
            <input type="checkbox" id="diet" value="diet" onClick={this.inputCheck}/>


            <ul>
            {formattedMetrics.map((m) => {
            return (
            <li key={m._id}>
                    <Link to={`/metrics/${m._id}`}>
                    {m.createdAt}</Link>
            </li>
            )
            })}
            </ul>
            <Calendar/>
            
            </div>
        )
    }
}

export default Metrics
