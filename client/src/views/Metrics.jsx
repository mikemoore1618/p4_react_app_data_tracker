import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Brush, ReferenceDot } from 'recharts'
import { formattedDate } from '../helpers'
// import Calendar from 'react-calendar/dist/entry.nostyle'
import Calendar from 'react-calendar';


const apiClient = axios.create()

class Metrics extends React.Component {
  state = {
    calendarDate: null,
    metrics: [],
    filter: {
      sleep: true,
      stress: true,
      mood: true,
      energy: true,
      diet: true
    }
  }

componentDidMount() {
    apiClient({ method: 'get', url: '/api/metrics' }).then((apiResponse) => {
      this.setState({ metrics: apiResponse.data.payload })
    })
  }

  handleInputCheck = (event) => {
    this.setState({
      filter: {...this.state.filter, [event.target.name]: event.target.checked }
    })
  }

  handleDateClick = () => {
    console.log("clicked")
    console.log(this.datetime)
  }

render() {
  const formattedMetrics = this.state.metrics.map((m) => {
    return { ...m, createdAt: formattedDate(m.createdAt) }
  })
  const { filter } = this.state
    return (
        <div>
            
            <LineChart animationEasing="ease-out" width={600} height={300} data={formattedMetrics}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Legend />
              <XAxis dataKey="createdAt"/>
              <YAxis />
              <Tooltip/>
              {/* add content={()=>{}} to render custom content for legend... */}
              
              
              {filter.sleep && <Line animationEasing="ease-in-out" legendType="circle" type="monotone" dataKey="sleep" stroke="#4198f4" dot={false}/>}
              {filter.stress && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="stress" stroke="#f44242" dot={false}/>}
              {filter.mood && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="mood" stroke="#f4dc41" dot={false}/>}
              {filter.energy && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="energy" stroke="#41f47c" dot={false}/>}
              {filter.diet && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="diet" stroke="#f49741" dot={false}/>}

              <Brush dataKey="createdAt"/>
            </LineChart>

            
            <input type="checkbox" name="sleep" checked={filter.sleep} onChange={this.handleInputCheck}/>
            <input type="checkbox" name="stress" checked={filter.stress} onChange={this.handleInputCheck}/>
            <input type="checkbox" name="mood" checked={filter.mood} onChange={this.handleInputCheck}/>
            <input type="checkbox" name="energy" checked={filter.energy} onChange={this.handleInputCheck}/>
            <input type="checkbox" name="diet" checked={filter.diet} onChange={this.handleInputCheck}/>


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

            <Calendar onClickDay={this.handleDateClick}/>
            
            </div>
        )
    }
}

export default Metrics
