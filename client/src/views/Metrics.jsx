import React from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush } from 'recharts'
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
    // evt.preventDefault();
    // let id = this.state.metric._id;
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

  //change evt to id?????
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      metricBeingEdited: {
        ...this.state.metricBeingEdited,
        [e.target.name]: e.target.value
      }
    })
    // let { id } = e.target.dataset;
    // console.log(id)
    // const index = this.state.metrics.findIndex(m => m._id === id);
    // let updatedMetric = Object.assign({}, this.state.metrics[index], { [e.target.name]: e.target.value });
    // let metrics = Array.from(this.state.metrics);
    // metrics.splice(index, 1, updatedMetric);
    // this.setState({ metrics });
  }

  // EDIT FORM SUBMIT

  //change evt to id?
  handleSubmit = (id) => {
    // evt.preventDefault()
    // console.log(this.state.metric)
    // let { _id } = this.state.metric
    apiClient({
      method: 'patch',
      url: `/api/metrics/${id}`,
      data: this.state.metricBeingEdited
    })
      .then(apiResponse => {
        console.log(apiResponse)
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
    const metricsOnThisDay = this.state.metrics.filter((m) => {
      return formattedDate(m.createdAt) === dateClicked
    })

    this.setState({
      selectedDate: dateClicked,
      open: true
    })
  }

  render() {
    // console.log(this.state.metrics)

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

          {filter.sleep && <Line animationEasing="ease-in-out" legendType="circle" type="monotone" dataKey="sleep" stroke="#4198f4" dot={false} strokeWidth={2} />}
          {filter.stress && <Line animationEasing="ease-in-out" legendType='circle' type="monotone" dataKey="stress" stroke="#f44242" dot={false} strokeWidth={2} />}
          {filter.mood && <Line animationEasing="ease-in-out" legendType='circle' type="monotone" dataKey="mood" stroke="#f4dc41" dot={false} strokeWidth={2} />}
          {filter.energy && <Line animationEasing="ease-in-out" legendType='circle' type="monotone" dataKey="energy" stroke="#41f47c" dot={false} strokeWidth={2} />}
          {filter.diet && <Line animationEasing="ease-in-out" legendType='circle' type="monotone" dataKey="diet" stroke="#f49741" dot={false} strokeWidth={2} />}

          <Brush dataKey="createdAt" />
        </LineChart>
        </div>
        <div id='legend'>
          <div className="circle" id='sleep'></div> <a>Sleep</a>
          <div className="circle" id='stress'></div>  <a>Stress</a>
          <div className="circle" id='mood'></div>  <a>Mood</a>
          <div className="circle" id='energy'></div>  <a>Energy</a>
          <div className="circle" id='diet'></div>  <a>Diet</a>

          <br />
          <input className='check left-check' type="checkbox" name="sleep" checked={filter.sleep} onChange={this.handleInputCheck} />
          <input className='check' type="checkbox" name="stress" checked={filter.stress} onChange={this.handleInputCheck} />
          <input className='check' type="checkbox" name="mood" checked={filter.mood} onChange={this.handleInputCheck} />
          <input className='check' type="checkbox" name="energy" checked={filter.energy} onChange={this.handleInputCheck} />
          <input type="checkbox" name="diet" checked={filter.diet} onChange={this.handleInputCheck} />
        </div>


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
          open={open}
          onClose={this.closeModal}
          handleEditClick={this.onEditMetric}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          selectedDate={selectedDate}
          metricBeingEdited={this.state.metricBeingEdited}
          metrics={metrics.filter((m) => formattedDate(m.createdAt) === selectedDate)} />

        <Calendar onClickDay={this.handleDateClick} />

      </div>

    )
  }
}

export default Metrics
