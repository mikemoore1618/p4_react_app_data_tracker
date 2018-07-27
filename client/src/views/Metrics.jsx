import React from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Brush } from 'recharts'
import { formattedDate } from '../helpers'
import Calendar from 'react-calendar'
import MetricModal from './MetricModal'


const apiClient = axios.create()

class Metrics extends React.Component {
  state = {
    metrics: [],
    filter: {
      sleep: true,
      stress: true,
      mood: true,
      energy: true,
      diet: true
    },
    selectedDate: null,
    open: false,
    metric: undefined,
    calendarDate: null
  }

// MODAL ACTIONS
loadMetric(id) {
  apiClient({ method: 'get', url: `/api/metrics/${id}`}).then((apiResponse) => {
    this.setState({ metric: apiResponse.data.payload })
  })
}

showModal = (evt) => { 
  this.loadMetric(evt.target.dataset.id)
  this.setState({ open: true })
}

closeModal = () => this.setState({ open: false, metric: undefined });

// COMPONENT DID MOUNT
componentDidMount() {
    apiClient({ method: 'get', url: '/api/metrics' }).then((apiResponse) => {
      this.setState({ metrics: apiResponse.data.payload })
    })
  }

// DELETE
  handleDelete = (id) => {
    // evt.preventDefault();
    // let id = this.state.metric._id;
    apiClient({ method: 'delete', url: `/api/metrics/${id}` })
    .then(response => {
      apiClient({ method: 'get', url: '/api/metrics' }).then((apiResponse) => {
        this.setState({ metrics: apiResponse.data.payload, open: false });
      })
    })
  }

// FORM CHANGE

//change evt to id?
  handleChange = (evt) => {
    evt.preventDefault();
    let metric = Object.assign({}, this.state.metric, { [evt.target.name]: evt.target.value });
    this.setState({ metric });
  }

// EDIT FORM SUBMIT

//change evt to id?
  handleSubmit = (evt) => {
    evt.preventDefault()
    // console.log(this.state.metric)
    let { _id } = this.state.metric
        apiClient({ 
            method: 'patch', 
            url: `/api/metrics/${_id}`,
            data: this.state.metric
         })
         .then(apiResponse => {
          console.log(apiResponse)
          const updatedMetric = apiResponse.data.payload
          const updatedMetricIndex = this.state.metrics.findIndex((m) => m._id === updatedMetric._id)
          this.setState({
            metrics: [
              ...this.state.metrics.slice(0, updatedMetricIndex),
              updatedMetric,
              ...this.state.metrics.slice(updatedMetricIndex + 1)
            ]
          })
          this.closeModal()
      })
  }

// CHECKBOX
  handleInputCheck = (event) => {
    this.setState({
      filter: {...this.state.filter, [event.target.name]: event.target.checked }
    })
  }

// CALENDAR CLICK
  handleDateClick = (date) => {
    const dateClicked = formattedDate(date)
    const metricsOnThisDay = this.state.metrics.filter((m) => {
      return formattedDate(m.createdAt) === dateClicked
    })

    this.setState({
      selectedDate: dateClicked,
      open: true
    })

    console.log(metricsOnThisDay)

    // let calendarDate = document.getElementsByClassName(react-calendar__tile--active)
    
      // // if (calendarDate === createdAt) {
      //   this.setState({ calendarDate: { ...this.state, [event.target.name]} })
      
      // // calendarDate: { ...this.state, [event.target.name]}
    
  }

render() {
  const formattedMetrics = this.state.metrics.map((m) => {
    return { ...m, createdAt: formattedDate(m.createdAt) }
  })

  const { filter, open, metrics, selectedDate } = this.state
  
    return (
        <div>
            
            <LineChart className='center' animationEasing="ease-out" width={600} height={300} data={formattedMetrics}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <Legend />
              <XAxis dataKey="createdAt"/>
              <YAxis />
              <Tooltip/>
              {/* add content={()=>{}} to render custom content for legend... */}
              
              
              {filter.sleep && <Line animationEasing="ease-in-out" legendType="circle" type="monotone" dataKey="sleep" stroke="#4198f4" dot={false} strokeWidth={3}/>}
              {filter.stress && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="stress" stroke="#f44242" dot={false} strokeWidth={3}/>}
              {filter.mood && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="mood" stroke="#f4dc41" dot={false} strokeWidth={3}/>}
              {filter.energy && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="energy" stroke="#41f47c" dot={false} strokeWidth={3}/>}
              {filter.diet && <Line animationEasing="ease-in-out"legendType='circle' type="monotone" dataKey="diet" stroke="#f49741" dot={false} strokeWidth={3}/>}

              <Brush dataKey="createdAt"/>
            </LineChart>

            <div className='center'>
              <input className='check' type="checkbox" name="sleep" checked={filter.sleep} onChange={this.handleInputCheck}/>
              <input className='check' type="checkbox" name="stress" checked={filter.stress} onChange={this.handleInputCheck}/>
              <input className='check' type="checkbox" name="mood" checked={filter.mood} onChange={this.handleInputCheck}/>
              <input className='check' type="checkbox" name="energy" checked={filter.energy} onChange={this.handleInputCheck}/>
              <input className='check' type="checkbox" name="diet" checked={filter.diet} onChange={this.handleInputCheck}/>
            </div>

            {/* <ul>
            {formattedMetrics.map((m) => {
            return (
              <li key={m._id}>
                <button data-id={m._id} onClick={this.showModal}>{m.createdAt}</button>
              </li>
            )
            })}
            </ul> */}

            <MetricModal 
              open={open} 
              onClose={this.closeModal} 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
              handleDelete={this.handleDelete}
              selectedDate={selectedDate}
              metrics={metrics.filter((m) => formattedDate(m.createdAt) === selectedDate)} />

            <Calendar onClickDay={this.handleDateClick}/>
            
            </div>
        )
    }
}

export default Metrics
