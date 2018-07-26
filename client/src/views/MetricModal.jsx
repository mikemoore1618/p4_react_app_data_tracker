import React from 'react';
import { Modal, Button } from 'semantic-ui-react'
import { formattedDate } from '../helpers'

const MetricModal = (props) => {
    let { open, onClose, metric } = props;
    console.log(metric)
    console.log(props)
    return (
        <div>
          <Modal size="large" open={open} onClose={onClose} >
            <Modal.Header></Modal.Header>
            <Modal.Content>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
          </Modal>
        </div>
    )
};

export default MetricModal