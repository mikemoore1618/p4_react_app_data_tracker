import React from 'react'
import { Modal } from 'semantic-ui-react'
import Create from './Create';

const FormModal = () => (
  <Modal trigger={<a>Modal Add</a>}>
    <Modal.Header>Data</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Create />
        
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default FormModal