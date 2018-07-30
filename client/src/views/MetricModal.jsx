import React, { Fragment } from 'react';
import { Modal, Icon } from 'semantic-ui-react'
import { formattedDate } from '../helpers'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import InputForm from './InputForm'
import Legend from './Metrics/Legend'
import { Link } from 'react-router-dom'


const MetricModal = (props) => {
    let {
        filter,
        open,
        colorMappings,
        onClose,
        metrics,
        handleEditClick,
        handleChange,
        handleSubmit,
        handleDelete,
        selectedDate,
        metricBeingEdited
    } = props;
    return (
        <div>
            {!!metrics &&
                <Modal size="small" open={open} onClose={onClose} >
                    <Modal.Header>{selectedDate}</Modal.Header>
                    <Modal.Content>
                        {metrics[0] === undefined &&
                            <div>
                                <h2>No Data</h2>
                                <Link to="/metrics/new">
                                    <Icon id='add-btn' name='plus' size='big' />
                                </Link>
                            </div>
                        }


                        {metrics.map((m) => {
                            return (
                                <Fragment key={m._id}>
                                    <BarChart classname='center' width={600} height={300} data={[m]}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />

                                        {Object.keys(filter).map(f => {
                                            return (
                                                <Bar key={f} dataKey={f} fill={colorMappings[f]} legendType="circle" />
                                            )
                                        })}
                                    </BarChart>

                                    <div id='metric-legend' className='center legend'>
                                        <Legend filter={filter} colorMappings={colorMappings} />
                                    </div>

                                    <Modal size="mini" trigger={
                                        <Icon name='edit' size='big' color='grey' onClick={() => handleEditClick(m._id)} />
                                    }>
                                        <Modal.Header>Edit {formattedDate(m.createdAt)}</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <InputForm
                                                    metric={metricBeingEdited}
                                                    handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                />
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                    <Icon name='trash alternate outline' color='grey' size='big' onClick={() => { handleDelete(m._id) }} />
                                </Fragment>
                            )
                        })}
                    </Modal.Content>
                </Modal>

            }

        </div>
    )
};

export default MetricModal