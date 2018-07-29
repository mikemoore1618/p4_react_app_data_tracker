import React, { Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react'
import { formattedDate } from '../helpers'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import InputForm from './InputForm'


const MetricModal = (props) => {
    let {
        open,
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
                            {metrics.map((m) => {
                                return (
                                    <Fragment key={m._id}>
                                        <BarChart classname='center' width={600} height={300} data={[m]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="sleep" fill="#4198f4" legendType="circle" />
                                            <Bar dataKey="stress" fill="#f44242" legendType="circle" />
                                            <Bar dataKey="mood" fill="#f4dc41" legendType="circle" />
                                            <Bar dataKey="meditation" fill="#774df5" legendType="circle" />
                                            <Bar dataKey="energy" fill="#41f47c" legendType="circle" />
                                            <Bar dataKey="diet" fill="#f49741" legendType="circle" />
                                            <Bar dataKey="exersize" fill="#f552f5" legendType="circle" />
                                        </BarChart>
                                        <div id='metric-legend' className='center legend'>
                                            <div className="circle" id='sleep'></div> <a>Sleep</a>
                                            <div className="circle" id='stress'></div>  <a>Stress</a>
                                            <div className="circle" id='mood'></div>  <a>Mood</a>
                                            <div className="circle" id='meditation'></div>  <a>Meditation</a>
                                            <div className="circle" id='energy'></div>  <a>Energy</a>
                                            <div className="circle" id='diet'></div>  <a>Diet</a>
                                            <div className="circle" id='exersize'></div>  <a>Exersize</a>
                                        </div>

                                        <Modal size="mini" trigger={
                                            <Button onClick={() => handleEditClick(m._id)}>Edit</Button>
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
                                        <Button onClick={() => { handleDelete(m._id) }}>Delete</Button>
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