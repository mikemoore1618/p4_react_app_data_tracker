import React, { Fragment } from 'react';
import { Modal } from 'semantic-ui-react'
import { formattedDate } from '../helpers'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
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
                    <Modal.Description>
                        {metrics.map((m) => {
                            return (
                                <Fragment key={m._id}>
                                    <BarChart width={600} height={300} data={[m]}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend />
                                        <Bar dataKey="sleep" fill="#4198f4" legendType="circle"/>
                                        <Bar dataKey="stress" fill="#f44242" legendType="circle"/>
                                        <Bar dataKey="mood" fill="#f4dc41" legendType="circle"/>
                                        <Bar dataKey="energy" fill="#41f47c" legendType="circle"/>
                                        <Bar dataKey="diet" fill="#f49741" legendType="circle"/>
                                    </BarChart>

                                    <button onClick={() => { handleDelete(m._id) }}>Delete</button>

                                    <Modal size="mini" trigger={
                                        <button onClick={() => handleEditClick(m._id)}>Edit</button>
                                    }>
                                        <Modal.Header>Edit { formattedDate(m.createdAt) }</Modal.Header>
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
                                </Fragment>
                            )
                        })}
              

                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>

                    </Modal>

                    
            }
        </div>
    )
};

export default MetricModal