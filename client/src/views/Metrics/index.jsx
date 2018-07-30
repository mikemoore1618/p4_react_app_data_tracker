import React from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush } from 'recharts'
import { formattedDate } from '../../helpers'
import Legend from './Legend'
import Toggles from './Toggles'
import Calendar from 'react-calendar'
import MetricModal from '../MetricModal'
import { Icon } from 'semantic-ui-react'

const colorMappings = {
  sleep: "#4198f4",
  stress: "#f44242",
  mood: "#f4dc41",
  meditation: "#774df5",
  energy: "#41f47c",
  diet: "#f49741",
  exercise: "#dd65ed"
}

const apiClient = axios.create()

class Metrics extends React.Component {
  state = {
    metrics: [],
    filter: {
      sleep: true,
      stress: true,
      mood: true,
      meditation: true,
      energy: true,
      diet: true,
      exercise: true
    },
    selectedDate: null,
    open: false,
    calendarDate: null,
    // used for editing:
    metricBeingEdited: null
  }

  // MODAL ACTIONS
  loadMetric(id) {
    apiClient({ method: 'get', url: `/api/metrics/${id}` }).then((apiResponse) => {
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
    apiClient({ method: 'delete', url: `/api/metrics/${id}` })
      .then(response => {
        apiClient({ method: 'get', url: '/api/metrics' }).then((apiResponse) => {
          this.setState({ metrics: apiResponse.data.payload, open: false });
        })
      })
  }

  onEditMetric = (id) => {
    // whenever edit button is clicked, we copy the metric we're trying to edit
    // from metrics list into "metricBeingEdited" to help the form inputs
    const metricToEdit = this.state.metrics.find(m => m._id === id)
    this.setState({
      metricBeingEdited: { ...metricToEdit, createdAt: formattedDate(metricToEdit.createdAt, 'YYYY-MM-DD') }
    })
  }

  // FORM CHANGE
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      metricBeingEdited: {
        ...this.state.metricBeingEdited,
        [e.target.name]: e.target.value
      }
    })
  }

  // EDIT FORM SUBMIT
  handleSubmit = (id) => {

    apiClient({
      method: 'patch',
      url: `/api/metrics/${id}`,
      data: this.state.metricBeingEdited
    })
      .then(apiResponse => {
        // console.log(apiResponse)
        const metrics = apiResponse.data.payload

        this.setState({ metrics });
      })
    this.closeModal()
  }

  // CHECKBOX
  handleInputCheck = (event) => {
    this.setState({
      filter: { ...this.state.filter, [event.target.name]: event.target.checked }
    })
  }

  // CALENDAR CLICK
  handleDateClick = (date) => {
    const dateClicked = formattedDate(date)
    this.state.metrics.filter((m) => {
      return formattedDate(m.createdAt) === dateClicked
    })

    this.setState({
      selectedDate: dateClicked,
      open: true
    })
  }


  //ATTEMPT TO GET DATES WITH NO DATA ENTRY TO GREY OUT
  // CHECK REACT-CALENDAR DOCUMENTATION
  // checkDate(date) {
  //   // const dateClicked = formattedDate(date);
  //   // dateClicked[3] == 2;
  //   // let find = this.state.metrics.find(m => formattedDate(m.createdAt) === dateClicked);
  //   // let bool = (!!find) ? true : false;
  //   // return bool;
  //   date.getMonth() === 5
  // }

  // checkDisabled = ({ date }) => this.state.metrics.find(m => formattedDate(m.createdAt) === formattedDate(date));
  //   // const dateClicked = formattedDate(date);
  //   // debugger
  //   // dateClicked[3] == 2;
  //   // let find = this.state.metrics.find(m => formattedDate(m.createdAt) === dateClicked);
  //   // let bool = (!!find) ? true : false;
  //   // debugger
  //   // return bool;
  

  render() {
    const formattedMetrics = this.state.metrics.map((m) => {
      return { ...m, createdAt: formattedDate(m.createdAt) }
    })

    const { filter, open, metrics, selectedDate } = this.state
    return (
      <div className="center">
        <div id='line-graph-margin-left'>

          <LineChart animationEasing="ease-out" width={600} height={300} data={formattedMetrics}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />

            {Object.keys(filter).map(f => {
              return filter[f] && (
                <Line
                  key={f}
                  animationEasing="ease-in-out"
                  legendType="circle"
                  type="monotone"
                  dataKey={f}
                  stroke={colorMappings[f]}
                  dot={false}
                  strokeWidth={2}
                />
              )
            })}
            <Brush dataKey="createdAt" />
          </LineChart>
        </div>

        <div id="legend-margin" className='legend'>

          <Legend filter={filter} colorMappings={colorMappings} />

          <br />

          <div className="filter-toggles">
            <Toggles handleInputCheck={this.handleInputCheck} filter={filter} />
          </div>
        </div>

        {/* LIST OF ALL METRICS */}
        {/* <ul>
            {formattedMetrics.map((m) => {
            return (
              <li key={m._id}>
                <button>{m.createdAt}</button>
              </li>
            )
            })}
            </ul> */}

        <MetricModal
          filter={filter}
          colorMappings={colorMappings}
          open={open}
          onClose={this.closeModal}
          handleEditClick={this.onEditMetric}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          selectedDate={selectedDate}
          metricBeingEdited={this.state.metricBeingEdited}
          metrics={metrics.filter((m) => formattedDate(m.createdAt) === selectedDate)} 
          />
        
        {metrics[0] !== undefined && 
          <Calendar onClickDay={this.handleDateClick} 
          // tileDisabled={this.checkDisabled}/> 
          />
        }
        <h5 className='legend'>Mike Moore 2018 <Icon id='peace'name='peace hand outline' size='large' /> </h5>

      </div>

    )
  }
}

export default Metrics
