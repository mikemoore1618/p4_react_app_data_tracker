import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { formattedDate } from '../helpers'
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

  handleInputCheck = () => {
    // Get the checkbox
    // If the checkbox is checked
    this.setState({ showResults: true });
    //show line of data
    console.log("checked")
  
    //hide line of data
    this.setState({ showResults: false });
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

            
            <input type="checkbox" name="sleep" value="sleep" onClick={this.handleInputCheck}/>
            <input type="checkbox" name="stress" value="stress" onClick={this.handleInputCheck}/>
            <input type="checkbox" name="mood" value="mood" onClick={this.handleInputCheck}/>
            <input type="checkbox" name="energy" value="energy" onClick={this.handleInputCheck}/>
            <input type="checkbox" name="diet" value="diet" onClick={this.handleInputCheck}/>


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
